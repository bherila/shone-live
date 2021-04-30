#nullable enable
using System;
using Microsoft.Extensions.Configuration;

namespace Shone {
  public interface IAppSettings {
    string? ConnectionString { get; }
  }

  public record AppSettings : IAppSettings {

    public AppSettings(IConfiguration builderConfiguration, ILog log) {
      ConnectionString = builderConfiguration["PG_CONNECTION_STRING"];
      log.Info("Init app settings " + ConnectionString);
      if (ConnectionString == null) {
        var err = "Missing PG_CONNECTION_STRING in local.settings.json";
        log.Error(err);
        throw new Exception(err);
      }
    }

    public string ConnectionString { get; }
  }
}
