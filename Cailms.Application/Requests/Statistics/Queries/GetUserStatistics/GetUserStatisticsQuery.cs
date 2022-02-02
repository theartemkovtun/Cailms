using Cailms.Application.Models;
using Cailms.Domain.Models.Statistics;
using MediatR;

namespace Cailms.Application.Requests.Statistics.Queries.GetUserStatistics
{
    public class GetUserStatisticsQuery : UserRequest, IRequest<UserStatistics>
    {
        public GetUserStatisticsQuery(string email) : base(email) { }
        
        public int? Month { get; set; }
        public int Year { get; set; }
    }
}