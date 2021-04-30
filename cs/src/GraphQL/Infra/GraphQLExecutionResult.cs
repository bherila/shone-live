using System;
using System.IO;
using System.Threading.Tasks;
using GraphQL;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.DependencyInjection;

namespace Shone.GraphQL.Infra {
  // ReSharper disable once InconsistentNaming
  internal class GraphQLExecutionResult : ActionResult {
    private const string ContentType = "application/json";
    private readonly ExecutionResult _executionResult;

    public GraphQLExecutionResult(ExecutionResult executionResult) {
      _executionResult = executionResult ??
                         throw new ArgumentNullException(nameof(executionResult));
    }

    public override async Task ExecuteResultAsync(ActionContext context) {
      if (context == null) throw new ArgumentNullException(nameof(context));

      var documentWriter = context.HttpContext.RequestServices
        .GetRequiredService<IDocumentWriter>();

      var response = context.HttpContext.Response;
      response.ContentType = ContentType;
      response.StatusCode = StatusCodes.Status200OK;

      // Azure functions 3 disallowing async IO and newtonsoft json is not able to
      // make real async IO, we need copy to a MemoryStream.
      // After graphql has switch to System.Text.Json this can be written directly to response.Body
      await using var stream = new MemoryStream();
      await documentWriter.WriteAsync(stream, _executionResult);
      stream.Position = 0;
      await stream.CopyToAsync(response.Body);
    }
  }
}
