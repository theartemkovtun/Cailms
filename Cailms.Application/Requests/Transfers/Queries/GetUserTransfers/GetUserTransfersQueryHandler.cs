using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Shared;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserTransfers
{
    public class GetUserTransfersQueryHandler : IRequestHandler<GetUserTransfersQuery, TransfersList>
    {
        private readonly ITransferRepository _repository;
        private readonly IMapper _mapper;

        public GetUserTransfersQueryHandler(ITransferRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public Task<TransfersList> Handle(GetUserTransfersQuery request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<GetUserTransfersDomainModel>(request);
            
            return _repository.GetUserTransfersAsync(domainModel);
        }
    }
}