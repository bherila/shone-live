using System;
using Microsoft.EntityFrameworkCore;
using Shone.EntSchema;

namespace Shone {
  public class Repository : DbContext {
    private readonly IAppSettings _appSettings;

    public Repository(IAppSettings appSettings) {
      _appSettings = appSettings;
    }
    
    public DbSet<EntUser> Users { get; set; }
    public DbSet<EntConsumerLead> ConsumerLeads { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {
      if (_appSettings.ConnectionString == null) {
        throw new Exception("Can't configure db connection - missing connection string");
      }
      optionsBuilder.UseNpgsql(_appSettings.ConnectionString);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
      modelBuilder.Entity<EntUser>();
    }
  }
}
