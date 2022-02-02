using System.Collections.Generic;

namespace Cailms.Domain.Models.Statistics
{
    public class UserStatistics
    {
        public TotalIncomeOutcome Total { get; set; }
        public IEnumerable<CategoryOutcome> Categories { get; set; }
    }
}