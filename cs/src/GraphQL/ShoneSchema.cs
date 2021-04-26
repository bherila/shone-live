using System;
using GraphQL.Types;
using Microsoft.Extensions.DependencyInjection;

namespace Shone.GraphQL {
  public class ShoneSchema : Schema {
    private readonly ILog _log;

    public ShoneSchema(IServiceProvider provider)
      : base(provider) {
      Query = provider.GetRequiredService<RootQuery>();
      Mutation = provider.GetRequiredService<RootMutation>();
      Initialize();
      _log = provider.GetRequiredService<ILog>();
    }
  }
}
