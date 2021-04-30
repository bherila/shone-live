using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Xml;
using GraphQL;
using GraphQL.Conversion;
using GraphQL.Server;
using GraphQL.Types;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;

namespace Shone.GraphQL.Infra {
  public interface IFieldNameConverter : INameConverter { }

  // ReSharper disable once InconsistentNaming
  internal class GraphQLFunctions {
    private readonly IDocumentExecuter _documentExecuter;

    private readonly ISchema _schema;
    private readonly IServiceProvider _sp;
    private readonly ILog _log;
    private readonly IGraphQLExecuter<ISchema> _graphQlExecuter;
    private readonly IDocumentWriter _documentWriter;
    private string? _html = null;

    public GraphQLFunctions(IDocumentExecuter documentExecuter, ISchema schema,
      IGraphQLExecuter<ISchema> graphQLExecuter, IServiceProvider sp, ILog log, IDocumentWriter documentWriter) {
      _documentExecuter = documentExecuter;
      _schema = schema;
      _graphQlExecuter = graphQLExecuter;
      _sp = sp;
      _log = log;
      log.Info("Created {nameof(GraphQLFunctions)}");
      _documentWriter = documentWriter;
    }

    [Function("graphiql")]
    public async Task<HttpResponseData> ExecuteGraphiQl(
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "graphiql")]
      HttpRequestData req, FunctionContext ctx) {
      using (var client = new HttpClient()) {
        if (string.IsNullOrWhiteSpace(_html)) {
          _log.Info("Downloading GraphiQL UI");
          var html = _html ?? await client.GetStringAsync(
            "https://raw.githubusercontent.com/graphql-dotnet/server/master/src/Ui.GraphiQL/Internal/graphiql.cshtml");
          html = html.Replace("@Model.GraphQLEndPoint", "/api/graphql");
          html = html.Replace("@Model.Headers", "{'Content-Type': 'application/json'}");
          _html = html;
        }
      }

      var res = req.CreateResponse(HttpStatusCode.OK);
      res.Headers.Add("Content-Type", "text/html");
      await res.WriteStringAsync(_html);
      return res;
    }
    
    [Function("graphql")]
    // ReSharper disable once InconsistentNaming
    public async Task<object> ExecuteGraphQL(
      FunctionContext context,
      [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "graphql")]
      HttpRequestData req) {
      _log.Info($"HttpTrigger : {nameof(ExecuteGraphQL)} [{req.Method}]");
      try {
        var executionResult = await _graphQlExecuter.ExecuteAsync(req, _log, _sp);
        if (executionResult.Errors != null)
          _log.Error($"GraphQL execution error(s): {executionResult.Errors}");
    
        //return new GraphQLExecutionResult(executionResult);
        await using var stream = new MemoryStream();
        await _documentWriter.WriteAsync(stream, executionResult);
        stream.Position = 0;
        
        var res = req.CreateResponse(HttpStatusCode.OK);
        await res.WriteBytesAsync(stream.ToArray());
        return res;
      }
      catch (GraphQLBadRequestException ex) {
        return new BadRequestObjectResult(new {message = ex.Message});
      }
      catch (XmlException ex) {
        return new BadRequestObjectResult(new {message = ex.Message});
      }
      catch (IndexOutOfRangeException ex) {
        _log.Warn(ex.ToString());
    
        return new BadRequestObjectResult(new {message = ex.Message});
      }
    }
  }
}
