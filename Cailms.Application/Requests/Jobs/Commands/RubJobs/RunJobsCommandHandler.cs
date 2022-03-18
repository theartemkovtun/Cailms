using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.RubJobs
{
    public class RunJobsCommandHandler : IRequestHandler<RunJobsCommand>
    {
        private readonly IJobRepository _jobRepository;

        public RunJobsCommandHandler(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<Unit> Handle(RunJobsCommand request, CancellationToken cancellationToken)
        {
            await _jobRepository.RunTodayJobsAsync();
            
            return Unit.Value;
        }
    }
}