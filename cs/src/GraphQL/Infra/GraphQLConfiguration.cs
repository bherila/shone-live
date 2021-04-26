using System;
using GraphQL;
using GraphQL.Execution;
using GraphQL.Server;
using GraphQL.SystemTextJson;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Shone.GraphQL.Infra {
  // ReSharper disable once InconsistentNaming
  public static class GraphQLConfiguration {
    // ReSharper disable once InconsistentNaming
    public static void ConfigureGraphQL(this IServiceCollection services) {
      services.AddSingleton<GraphQLFunctions>();
      services.AddSingleton<ISchema, ShoneSchema>();

      // https://github.com/Azure/azure-functions-host/issues/4413
      services.AddSingleton<IDocumentWriter>(sp => new DocumentWriter(opt => {
        opt.IgnoreNullValues = true;
      }));

      // Azure Functions do not use `Microsoft.Extensions.DependencyInjection`, instead they use
      // DryIoc - https://github.com/dadhi/DryIoc. This leads to a different behavior if multiple
      // constructors exists so for DocumentExecuter should be called one which has no arguments.
      // See also https://bitbucket.org/dadhi/dryioc/wiki/SelectConstructorOrFactoryMethod
      services.AddSingleton<IDocumentExecuter>(_ => new DocumentExecuter());

      services.AddGraphQL(options => {
          options.MaxParallelExecutionCount = 5;
          options.UnhandledExceptionDelegate += UnhandledExceptionDelegate;
          options.EnableMetrics = true;
        })
        .AddGraphTypes(ServiceLifetime.Scoped);
    }

    /// <summary>
    ///   Report unhandled GraphQL exception to Sentry.
    /// </summary>
    /// <param name="obj"></param>
    private static void UnhandledExceptionDelegate(UnhandledExceptionContext obj) {
      //TODO: Log to Sentry or Application Insights
      // ReportError(new SentryEvent(obj.OriginalException) {
      //	Message = "GraphQL Exception",
      //	Extra = new {
      //		Query = obj.Context.Document.OriginalQuery,
      //		obj.FieldContext.FieldName,
      //		obj.FieldContext.Arguments
      //	}
      //});
      Console.WriteLine(obj.OriginalException.ToString());
    }
  }
}
