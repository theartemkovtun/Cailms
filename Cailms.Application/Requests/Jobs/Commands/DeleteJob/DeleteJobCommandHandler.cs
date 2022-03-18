using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.DeleteJob
{
    public class DeleteJobCommandHandler : IRequestHandler<DeleteJobCommand>
    {
        private readonly IJobRepository _jobRepository;

        public DeleteJobCommandHandler(IJobRepository jobRepository)
        {
            _jobRepository = jobRepository;
        }

        public async Task<Unit> Handle(DeleteJobCommand request, CancellationToken cancellationToken)
        {
            await _jobRepository.DeleteJobAsync(request.Id);
            
            return Unit.Value;
        }
    }
}