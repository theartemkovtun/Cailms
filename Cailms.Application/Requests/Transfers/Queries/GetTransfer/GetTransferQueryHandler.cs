using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetTransfer
{
    public class GetTransferQueryHandler : IRequestHandler<GetTransferQuery, Transfer>
    {
        private readonly ITransferRepository _repository;

        public GetTransferQueryHandler(ITransferRepository repository)
        {
            _repository = repository;
        }

        public Task<Transfer> Handle(GetTransferQuery request, CancellationToken cancellationToken)
        {
            return _repository.GetTransferAsync(request.Id);
        }
    }
}