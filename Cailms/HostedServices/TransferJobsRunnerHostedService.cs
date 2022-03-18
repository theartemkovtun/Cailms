using System;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using Microsoft.Extensions.DependencyInjection;

namespace Cailms.HostedServices
{
    public class TransferJobsRunner : CronJobService
    {
        private const string Cron = "0 10 * * *";
        private readonly IServiceProvider _serviceProvider;
        
        public TransferJobsRunner(IServiceProvider serviceProvider) : base(Cron, TimeZoneInfo.Utc)
        {
            _serviceProvider = serviceProvider;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine($"{nameof(TransferJobsRunner)} job has started");
            return base.StartAsync(cancellationToken);
        }

        public override async Task DoWork(CancellationToken cancellationToken)
        {
            using var scope = _serviceProvider.CreateScope();
            var jobRepository = scope.ServiceProvider.GetRequiredService<IJobRepository>();

            await jobRepository.RunTodayJobsAsync();
        }

        public override Task StopAsync(CancellationToken cancellationToken)
        {
            Console.WriteLine($"{nameof(TransferJobsRunner)} job has stopped");
            return base.StopAsync(cancellationToken);
        }
    }
}