using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Jobs;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.AddJob
{
    public class AddJobCommandHandler : IRequestHandler<AddJobCommand>
    {
        private readonly IJobRepository _repository;
        private readonly IMapper _mapper;

        public AddJobCommandHandler(IJobRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(AddJobCommand request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<AddJobDomainModel>(request);

            await _repository.AddJobAsync(domainModel);
            
            return Unit.Value;
        }
    }
}