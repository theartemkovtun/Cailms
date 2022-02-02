using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Models.Shared;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserCategories
{
    public class GetUserCategoriesQuery : UserRequest, IRequest<IEnumerable<SingleValue<string>>>
    {
        public GetUserCategoriesQuery(string email) : base(email) { }
    }
}