using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetTransferTemplates
{
    public class GetTransferTemplatesQueryHandler : IRequestHandler<GetTransferTemplatesQuery, IEnumerable<TransferTemplate>>
    {
        private readonly ITransferRepository _transferRepository;

        public GetTransferTemplatesQueryHandler(ITransferRepository transferRepository)
        {
            _transferRepository = transferRepository;
        }

        public Task<IEnumerable<TransferTemplate>> Handle(GetTransferTemplatesQuery request, CancellationToken cancellationToken)
        {
            return _transferRepository.GetUserTransferTemplatesAsync(request.Email);
        }
    }
}