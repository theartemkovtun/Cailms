using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Jobs;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.UpdateJob
{
    public class UpdateJobCommandHandler : IRequestHandler<UpdateJobCommand>
    {
        private readonly IJobRepository _jobRepository;
        private readonly IMapper _mapper;

        public UpdateJobCommandHandler(IJobRepository jobRepository, IMapper mapper)
        {
            _jobRepository = jobRepository;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(UpdateJobCommand request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<UpdateJobDomainModel>(request);

            await _jobRepository.UpdateJobAsync(domainModel);
            
            return Unit.Value;
        }
    }
}