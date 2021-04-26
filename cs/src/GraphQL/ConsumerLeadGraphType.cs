using GraphQL.Types;
using Shone.EntSchema;

namespace Shone.GraphQL {
  public class ConsumerLeadGraphType : ObjectGraphType<EntConsumerLead> {
    public ConsumerLeadGraphType() {
      Field<StringGraphType>().Name("lead_email").Resolve(x => x.Source.Email);
      Field<DateTimeGraphType>().Name("lead_created").Resolve(x => x.Source.CreatedDate);
    }
  }

  public class ConsumerLeadInputType : InputObjectGraphType<EntConsumerLead> {
    public ConsumerLeadInputType() {
      Field<StringGraphType>().Name("lead_email").Resolve(x => x.Source.Email);
    }
  }
}