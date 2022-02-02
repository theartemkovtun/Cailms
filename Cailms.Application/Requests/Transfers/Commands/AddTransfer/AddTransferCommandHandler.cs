using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.AddTransfer
{
    public class AddTransferCommandHandler : IRequestHandler<AddTransferCommand>
    {
        private readonly ITransferRepository _transferRepository;
        private readonly IMapper _mapper;

        public AddTransferCommandHandler(ITransferRepository transferRepository, IMapper mapper)
        {
            _transferRepository = transferRepository;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(AddTransferCommand request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<AddTransferDomainModel>(request);

            request.Id = await _transferRepository.AddTransferAsync(domainModel);

            return Unit.Value;
        }
    }
}