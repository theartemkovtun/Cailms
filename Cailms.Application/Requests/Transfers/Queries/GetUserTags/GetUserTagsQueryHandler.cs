using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Models.Shared;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserTags
{
    public class GetUserTagsQueryHandler : IRequestHandler<GetUserTagsQuery, IEnumerable<SingleValue<string>>>
    {
        private readonly ITransferRepository _repository;

        public GetUserTagsQueryHandler(ITransferRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<SingleValue<string>>> Handle(GetUserTagsQuery request, CancellationToken cancellationToken)
        {
            return _repository.GetUserTagsAsync(request.Email);
        }
    }
}