using GraphQL.Types;
using Shone.EntSchema;

namespace Shone.GraphQL {
  public class UserGraphType : ObjectGraphType<EntUser> {
    public UserGraphType() {
      Field<StringGraphType>().Name("user_id").Resolve(x => x.Source.UserId);
      Field<StringGraphType>().Name("user_phone").Resolve(x => x.Source.Phone);
      Field<StringGraphType>().Name("alias").Resolve(x => x.Source.Username);
    }
  }
}
