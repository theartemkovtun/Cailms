using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Statistics;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics
{
    public class GetUserPeriodStatisticsQueryHandler : IRequestHandler<GetUserPeriodStatisticsQuery, IEnumerable<UserPeriodIncomeOutcome>>
    {
        private readonly IStatisticsRepository _repository;
        private readonly IMapper _mapper;

        public GetUserPeriodStatisticsQueryHandler(IMapper mapper, IStatisticsRepository repository)
        {
            _mapper = mapper;
            _repository = repository;
        }

        public Task<IEnumerable<UserPeriodIncomeOutcome>> Handle(GetUserPeriodStatisticsQuery request, CancellationToken cancellationToken)
        {
            var model = _mapper.Map<GetUserPeriodStatisticsDomainModel>(request);

            return _repository.GetUserPeriodStatisticsAsync(model);
        }
    }
}