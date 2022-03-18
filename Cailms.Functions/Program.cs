using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Threading.Tasks;
using Cailms.Domain.Configurations;
using Cailms.Domain.Repositories;
using Cailms.Domain.Repositories.Contracts;

namespace Cailms.Functions
{
    public class Program
    {
        
        static Task Main(string[] args)
        {
            var host = new HostBuilder()
                .ConfigureAppConfiguration(configurationBuilder =>
                {
                    configurationBuilder.AddEnvironmentVariables();
                })
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices(services =>
                {
                    services.AddLogging();
                    services.AddHttpClient();
                    
                    services.AddOptions<DatabaseConfiguration>().Configure<IConfiguration>((settings, configuration) =>
                    {
                        settings.ConnectionString = configuration.GetValue<string>("DatabaseConnectionString");
                    });

                    services.AddTransient<IJobRepository, JobRepository>();
                    
                    
                })
                .Build();

            return host.RunAsync();
        }
    }
}
