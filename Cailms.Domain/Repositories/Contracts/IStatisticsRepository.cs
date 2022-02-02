using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Domain.Models.Statistics;

namespace Cailms.Domain.Repositories.Contracts
{
    public interface IStatisticsRepository
    {
        Task<UserStatistics> GetUserStatisticsAsync(GetUserStatisticsDomainModel model);
        Task<IEnumerable<UserPeriodIncomeOutcome>> GetUserPeriodStatisticsAsync(GetUserPeriodStatisticsDomainModel model);
    }
}