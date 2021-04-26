using System.Threading.Tasks;
using FunctionApp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Shone.GraphQL.Infra;

namespace Shone {
  public class Startup {
    static async Task Main(string[] args) {
      var host = CreateHostBuilder(args).Build();
      await host.RunAsync();
    }

    private static IHostBuilder CreateHostBuilder(string[] args) {
      return new HostBuilder()
        .ConfigureAppConfiguration(configurationBuilder => {
          configurationBuilder.AddCommandLine(args);
          configurationBuilder.AddEnvironmentVariables();
        })
        .ConfigureFunctionsWorkerDefaults()
        .ConfigureServices(Configure);
    }

    static void Configure(HostBuilderContext builder, IServiceCollection services) {
      // services.AddSingleton<IHttpResponderService, DefaultHttpResponderService>();
      var logger = new ConsoleLog();
      var appSettings = new AppSettings(builder.Configuration, logger);
      
      services.AddSingleton<IAppSettings>(appSettings);
      services.AddSingleton<ILog>(logger);
      services.AddSingleton<Function4>();
      // services.AddEntityFrameworkNpgsql()
      //   .AddDbContext<Repository>(optionsBuilder => {
      //     optionsBuilder.UseNpgsql(appSettings.ConnectionString);
      //   });
      services.AddTransient<Repository>();
      services.ConfigureGraphQL();
    }
  }
}
