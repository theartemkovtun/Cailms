using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Models.Jobs;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Queries.GetJob
{
    public class GetJobQueryHandler : IRequestHandler<GetJobQuery, Job>
    {
        private readonly IJobRepository _jobRepository;

        public GetJobQueryHandler(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public Task<Job> Handle(GetJobQuery request, CancellationToken cancellationToken)
        {
            return _jobRepository.GetJobAsync(request.Id);
        }
    }
}