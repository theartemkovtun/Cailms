using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.ToggleJobStatus
{
    public class ToggleJobStatusCommandHandler : IRequestHandler<ToggleJobStatusCommand>
    {
        private readonly IJobRepository _jobRepository;

        public ToggleJobStatusCommandHandler(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<Unit> Handle(ToggleJobStatusCommand request, CancellationToken cancellationToken)
        {
            await _jobRepository.ToggleJobStatusAsync(request.Id);
            
            return Unit.Value;
        }
    }
}