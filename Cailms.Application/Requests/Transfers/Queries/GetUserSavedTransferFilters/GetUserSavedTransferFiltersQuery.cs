using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Models.Transfers;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserSavedTransferFilters
{
    public class GetUserSavedTransferFiltersQuery : UserRequest, IRequest<IEnumerable<SavedTransferFilter>>
    {
        public GetUserSavedTransferFiltersQuery(string email) : base(email)
        {
        }
    }
}