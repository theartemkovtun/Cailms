using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Statistics;
using Cailms.Domain.Repositories.Contracts;
using FluentValidation;
using MediatR;

namespace Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics
{
    public class GetUserPeriodStatisticsQueryHandler : IRequestHandler<GetUserPeriodStatisticsQuery, IEnumerable<UserPeriodIncomeOutcome>>
    {
        private readonly IStatisticsRepository _repository;
        private readonly IValidator<GetUserPeriodStatisticsQuery> _validator;
        private readonly IMapper _mapper;

        public GetUserPeriodStatisticsQueryHandler(IMapper mapper, IStatisticsRepository repository, IValidator<GetUserPeriodStatisticsQuery> validator)
        {
            _mapper = mapper;
            _repository = repository;
            _validator = validator;
        }

        public async Task<IEnumerable<UserPeriodIncomeOutcome>> Handle(GetUserPeriodStatisticsQuery request, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(request, null, cancellationToken);
            
            var model = _mapper.Map<GetUserPeriodStatisticsDomainModel>(request);

            return await _repository.GetUserPeriodStatisticsAsync(model);
        }
    }
}