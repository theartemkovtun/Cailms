using AutoMapper;
using Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics;
using Cailms.Application.Requests.Statistics.Queries.GetUserStatistics;
using Cailms.Models.Statistics;

namespace Cailms.Mappings.Profiles
{
    public class StatisticsProfile : Profile
    {
        public StatisticsProfile()
        {
            CreateMap<GetUserStatisticsInputModel, GetUserStatisticsQuery>();
            CreateMap<GetUserPeriodStatisticsInputModel, GetUserPeriodStatisticsQuery>();
        }
    }
}