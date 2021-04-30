using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Shone.EntSchema {
  [Table("ent_users")]
  public class EntUser {
    [Key] [Column("user_id")] public Guid UserId { get; set; }

    [Column("user_phone")] public string Phone { get; set; }

    [Column("user_alias")] public string Username { get; set; }

    [Column("user_verify_code")] public string VerificationCode { get; set; }

    [Column("user_verify_code_ts")] public DateTime VerificationCodeTimeSent { get; set; }

    [Column("user_token")] public string Token { get; set; }

    [Column("user_profile_url")] public string ProfileUrl { get; set; }
  }
}
