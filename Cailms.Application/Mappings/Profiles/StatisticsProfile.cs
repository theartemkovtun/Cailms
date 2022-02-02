using AutoMapper;
using Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics;
using Cailms.Application.Requests.Statistics.Queries.GetUserStatistics;
using Cailms.Domain.Models.Statistics;

namespace Cailms.Application.Mappings.Profiles
{
    public class StatisticsProfile : Profile
    {
        public StatisticsProfile()
        {
            CreateMap<GetUserStatisticsQuery, GetUserStatisticsDomainModel>();
            CreateMap<GetUserPeriodStatisticsQuery, GetUserPeriodStatisticsDomainModel>();
        }
    }
}