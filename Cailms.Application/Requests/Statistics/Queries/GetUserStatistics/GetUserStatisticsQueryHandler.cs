using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Statistics;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Statistics.Queries.GetUserStatistics
{
    public class GetUserStatisticsQueryHandler : IRequestHandler<GetUserStatisticsQuery, UserStatistics>
    {
        private readonly IMapper _mapper;
        private readonly IStatisticsRepository _repository;

        public GetUserStatisticsQueryHandler(IStatisticsRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public Task<UserStatistics> Handle(GetUserStatisticsQuery request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<GetUserStatisticsDomainModel>(request);

            return _repository.GetUserStatisticsAsync(domainModel);
        }
    }
}