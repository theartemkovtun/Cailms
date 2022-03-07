using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.AddSavedTransferFilter
{
    public class AddSavedTransferFilterCommandHandler : IRequestHandler<AddSavedTransferFilterCommand>
    {
        private readonly ITransferRepository _transferRepository;
        private readonly IMapper _mapper;

        public AddSavedTransferFilterCommandHandler(ITransferRepository transferRepository, IMapper mapper)
        {
            _transferRepository = transferRepository;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(AddSavedTransferFilterCommand request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<AddSavedTransferFilterDomainModel>(request);

            await _transferRepository.AddSavedTransferFilterAsync(domainModel);
            
            return Unit.Value;
        }
    }
}