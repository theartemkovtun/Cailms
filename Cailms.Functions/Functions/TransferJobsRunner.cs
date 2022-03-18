using System;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Extensions.Logging;

namespace Cailms.Functions.Functions
{
    public class TransferJobsRunner
    {
        private const string Cron = "0 0 0 * * *";
        private readonly IJobRepository _jobRepository;

        public TransferJobsRunner(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        [Function(nameof(TransferJobsRunner))]
        public async Task Run([TimerTrigger(Cron)] TimerInfo myTimer, FunctionContext context)
        {
            var logger = context.GetLogger(nameof(TransferJobsRunner));
            logger.LogInformation($"{nameof(TransferJobsRunner)} timer trigger started at: {DateTime.Now}");

            await _jobRepository.RunTodayJobsAsync();
            
            logger.LogInformation($"{nameof(TransferJobsRunner)} timer trigger finished at: {DateTime.Now}");
        }
        
        [Function("TransferJobsRunnerHttp")]
        public async Task<HttpResponseData> RunHttp([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req, FunctionContext context)
        {
            var logger = context.GetLogger("TransferJobsRunnerHttp");
            logger.LogInformation($"TransferJobsRunner http trigger started at: {DateTime.Now}");
            
            await _jobRepository.RunTodayJobsAsync();
            
            logger.LogInformation($"TransferJobsRunner http trigger started at: {DateTime.Now}");
            
            var okResponse = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await okResponse.WriteAsJsonAsync(new
            {
                Status = "Ok"
            });
            
            return okResponse;
        }
    }
}
