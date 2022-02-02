using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Models.Statistics;
using MediatR;

namespace Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics
{
    public class GetUserPeriodStatisticsQuery : UserRequest, IRequest<IEnumerable<UserPeriodIncomeOutcome>>
    {
        public GetUserPeriodStatisticsQuery(string email) : base(email)
        {
        }
        
        public int? Month { get; set; }
        public int Year { get; set; }
    }
}