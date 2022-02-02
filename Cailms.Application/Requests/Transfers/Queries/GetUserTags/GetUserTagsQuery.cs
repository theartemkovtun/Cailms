using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Models.Shared;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserTags
{
    public class GetUserTagsQuery : UserRequest, IRequest<IEnumerable<SingleValue<string>>>
    {
        public GetUserTagsQuery(string email) : base(email) { }
    }
}