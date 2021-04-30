// <copyright file="GraphQLExecuterExtensions.cs">
// MIT License, taken from https://github.com/tpeczek/Demo.Azure.Functions.GraphQL/blob/master/Demo.Azure.Functions.GraphQL/Infrastructure/GraphQLExecuterExtensions.cs
// </copyright>
// <author>https://github.com/tpeczek</author>

using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading;
using System.Threading.Tasks;
using GraphQL;
using GraphQL.Server;
using GraphQL.SystemTextJson;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Primitives;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace Shone.GraphQL.Infra {
  internal static class GraphQlExecuterExtensions {
    private const string OPERATION_NAME_KEY = "operationName";
    private const string QUERY_KEY = "query";
    private const string VARIABLES_KEY = "variables";

    private const string JSON_MEDIA_TYPE = "application/json";
    private const string GRAPHQL_MEDIA_TYPE = "application/graphql";
    private const string FORM_URLENCODED_MEDIA_TYPE = "application/x-www-form-urlencoded";

    public static async Task<ExecutionResult> ExecuteAsync(
      this IGraphQLExecuter graphQLExecuter,
      HttpRequestData request, ILog log, IServiceProvider services) {
      string? operationName = null;
      string query;
      Inputs variables;

      var uri = request.Url;
      var queryParams = QueryHelpers.ParseQuery(uri.Query);
      var contentType = request.Headers.GetValues("Content-Type").FirstOrDefault();

      if (HttpMethods.IsGet(request.Method) ||
          HttpMethods.IsPost(request.Method) && queryParams.ContainsKey(QUERY_KEY)) {
        (operationName, query, variables) =
          ExtractGraphQLAttributesFromQueryString(queryParams);
      }
      else if (HttpMethods.IsPost(request.Method)) {
        if (!MediaTypeHeaderValue.TryParse(contentType, out var mediaTypeHeader))
          throw new GraphQLBadRequestException(
            $"Could not parse 'Content-Type' header value '{contentType}'.");

        switch (mediaTypeHeader.MediaType) {
          case JSON_MEDIA_TYPE:
            (operationName, query, variables) =
              await ExtractGraphQlAttributesFromJsonBodyAsync(request);
            break;
          case GRAPHQL_MEDIA_TYPE:
            query = await ExtractGraphQLQueryFromGraphQLBodyAsync(request.Body);
            variables = Inputs.Empty;
            break;
          // case FORM_URLENCODED_MEDIA_TYPE:
          //   (operationName, query, variables) =
          //     await ExtractGraphQlAttributesFromFormCollectionAsync(request);
          //   break;
          default:
            throw new GraphQLBadRequestException(
              $"Not supported 'Content-Type' header value '{contentType}'.");
        }
      }
      else {
        throw new GraphQLBadRequestException(
          $"Not supported 'HttpMethod' header value '{request.Method}'.");
      }

      if (string.IsNullOrEmpty(query)) return null;
      log.Info($"got graphql query: {operationName}, {query}, {variables}");
      var stopwatch = new Stopwatch();
      stopwatch.Start();
      var executonResult = await graphQLExecuter.ExecuteAsync(operationName, query,
        variables, null, services, CancellationToken.None);
      stopwatch.Stop();
      log.Metric($"graphql.{operationName}", stopwatch.ElapsedMilliseconds);
      return executonResult;
    }

    private static (string operationName, string query, Inputs variables)
      ExtractGraphQLAttributesFromQueryString(
        Dictionary<string, StringValues> query) {
      if (query.Count == 0)
        return (null, string.Empty, Inputs.Empty);
      return (
        query.TryGetValue(OPERATION_NAME_KEY, out var operationNameValues)
          ? operationNameValues[0]
          : null,
        query[QUERY_KEY][0],
        query.TryGetValue(VARIABLES_KEY, out var variablesValues)
          ? variablesValues[0].ToInputs()
          : Inputs.Empty
      );
    }

    private static async Task<(string? operationName, string? query, Inputs variables)>
      ExtractGraphQlAttributesFromJsonBodyAsync(HttpRequestData request) {
      using var bodyReader = new StreamReader(request.Body);
      using var bodyJsonReader = new JsonTextReader(bodyReader);
      var bodyJson = await JObject.LoadAsync(bodyJsonReader);

      var name = bodyJson.Value<string?>(OPERATION_NAME_KEY);
      var value = bodyJson.Value<string?>(QUERY_KEY);
      var inputJson = bodyJson.Value<JObject?>(VARIABLES_KEY);
      var inputs = new Inputs(inputJson?.ToObject<Dictionary<string, object>>() ?? new Dictionary<string, object>());
      return (
        name,
        value,
        inputs
      );
    }

    private static Task<string> ExtractGraphQLQueryFromGraphQLBodyAsync(Stream body) {
      using var bodyReader = new StreamReader(body);
      return bodyReader.ReadToEndAsync();
    }

    private static async Task<(string operationName, string query, Inputs variables)>
      ExtractGraphQlAttributesFromFormCollectionAsync(HttpRequest request) {
      var requestFormCollection = await request.ReadFormAsync();

      return (
        requestFormCollection.TryGetValue(OPERATION_NAME_KEY, out var operationNameValues)
          ? operationNameValues[0]
          : null,
        requestFormCollection[QUERY_KEY][0],
        requestFormCollection[VARIABLES_KEY][0].ToInputs()
      );
    }
  }
}
