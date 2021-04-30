using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shone.EntSchema {
  [Table("ent_consumer_lead")]
  public class EntConsumerLead {
    [Key] [Column("email")] public string Email { get; set; }

    [Column("lead_ds")] public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
  }
}
