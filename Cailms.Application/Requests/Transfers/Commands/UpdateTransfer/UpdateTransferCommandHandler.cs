using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.UpdateTransfer
{
    public class UpdateTransferCommandHandler : IRequestHandler<UpdateTransferCommand>
    {
        private readonly ITransferRepository _repository;
        private readonly IMapper _mapper;

        public UpdateTransferCommandHandler(IMapper mapper, ITransferRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public async Task<Unit> Handle(UpdateTransferCommand request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<UpdateTransferDomainModel>(request);

            await _repository.UpdateTransferAsync(domainModel);
            
            return Unit.Value;
        }
    }
}