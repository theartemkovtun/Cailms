using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Statistics;
using Cailms.Domain.Repositories.Contracts;
using FluentValidation;
using MediatR;

namespace Cailms.Application.Requests.Statistics.Queries.GetUserStatistics
{
    public class GetUserStatisticsQueryHandler : IRequestHandler<GetUserStatisticsQuery, UserStatistics>
    {
        private readonly IMapper _mapper;
        private readonly IValidator<GetUserStatisticsQuery> _validator;
        private readonly IStatisticsRepository _repository;

        public GetUserStatisticsQueryHandler(IStatisticsRepository repository, IMapper mapper, IValidator<GetUserStatisticsQuery> validator)
        {
            _repository = repository;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<UserStatistics> Handle(GetUserStatisticsQuery request, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(request, null, cancellationToken);
            
            var domainModel = _mapper.Map<GetUserStatisticsDomainModel>(request);

            return await _repository.GetUserStatisticsAsync(domainModel);
        }
    }
}