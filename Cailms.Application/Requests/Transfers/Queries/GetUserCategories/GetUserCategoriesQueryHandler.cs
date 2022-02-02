using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Models.Shared;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserCategories
{
    public class GetUserCategoriesQueryHandler : IRequestHandler<GetUserCategoriesQuery, IEnumerable<SingleValue<string>>>
    {
        private readonly ITransferRepository _repository;

        public GetUserCategoriesQueryHandler(ITransferRepository repository)
        {
            _repository = repository;
        }

        public Task<IEnumerable<SingleValue<string>>> Handle(GetUserCategoriesQuery request, CancellationToken cancellationToken)
        {
            return _repository.GetUserCategoriesAsync(request.Email);
        }
    }
}