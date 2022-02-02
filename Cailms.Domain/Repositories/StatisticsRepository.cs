using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Domain.Configurations;
using Cailms.Domain.Constants;
using Cailms.Domain.Models.Statistics;
using Cailms.Domain.Repositories.Contracts;
using Microsoft.Extensions.Options;

namespace Cailms.Domain.Repositories
{
    public class StatisticsRepository : Repository, IStatisticsRepository
    {
        public StatisticsRepository(IOptions<DatabaseConfiguration> databaseConfiguration) : base(databaseConfiguration) { }

        public Task<UserStatistics> GetUserStatisticsAsync(GetUserStatisticsDomainModel model)
        {
            return ExecuteJsonResultProcedureAsync<UserStatistics>(StoredProcedures.Main.GetUserStatistics, new
            {
                model.Email,
                model.Month,
                model.Year
            });
        }

        public Task<IEnumerable<UserPeriodIncomeOutcome>> GetUserPeriodStatisticsAsync(GetUserPeriodStatisticsDomainModel model)
        {
            return ExecuteJsonResultProcedureAsync<IEnumerable<UserPeriodIncomeOutcome>>(StoredProcedures.Main.GetUserPeriodStatistics, new
            {
                model.Email,
                model.Month,
                model.Year
            });
        }
    }
}