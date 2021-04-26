using System;

namespace Shone.GraphQL.Infra {
  internal class GraphQLBadRequestException : Exception {
    public GraphQLBadRequestException(string message)
      : base(message) { }
  }
}
