using System;
using System.Linq;
using GraphQL;
using GraphQL.Types;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Shone.EntSchema;

namespace Shone.GraphQL {
  public sealed class RootQuery : ObjectGraphType {
    public RootQuery(IServiceProvider appServices) {
      Field<IntGraphType>()
        .Name("test")
        .Resolve(context => 3);

      Field<ListGraphType<UserGraphType>>()
        .Name("users")
        .Argument<StringGraphType>("phone", "Find a user by its phone number")
        .Resolve(context => {

          // get our database connection
          var store = appServices.GetRequiredService<Repository>();

          // make db query
          var query = store.Users.AsQueryable();

          // if phone argument not provided, all users will be returned
          if (context.HasArgument("phone")) {
            query = query.Where(row =>
              row.Phone == context.GetArgument("phone", string.Empty));
          }

          return query.ToList();
        });

      Field<ListGraphType<AutoRegisteringObjectGraphType<EntConsumerLead>>>()
        .Name("consumerLeads")
        .Resolve((ctx) => {
          using var store = appServices.GetRequiredService<Repository>();
          return store.ConsumerLeads.ToList();
        });
    }
  }

  public class RootMutation : ObjectGraphType {
    public RootMutation(IServiceProvider appServices) {
      Field<ConsumerLeadGraphType>()
        .Name("addConsumerLead")
        .Argument<NonNullGraphType<AutoRegisteringInputObjectGraphType<EntConsumerLead>>>(
          "consumerLead")
        .Resolve((ctx) => {
          var leadEntity = ctx.GetArgument<EntConsumerLead>("consumerLead");
          using var store = appServices.GetRequiredService<Repository>();
          store.ConsumerLeads.Add(leadEntity);
          store.SaveChanges();
          return leadEntity;
        });
    }
  }
}
