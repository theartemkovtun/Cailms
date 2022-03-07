using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserSavedTransferFilters
{
    public class GetUserSavedTransferFiltersQueryHandler : IRequestHandler<GetUserSavedTransferFiltersQuery, IEnumerable<SavedTransferFilter>>
    {
        private readonly ITransferRepository _repository;

        public GetUserSavedTransferFiltersQueryHandler(ITransferRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<SavedTransferFilter>> Handle(GetUserSavedTransferFiltersQuery request, CancellationToken cancellationToken)
        {
            return _repository.GetUserSavedTransferFiltersAsync(request.Email);
        }
    }
}