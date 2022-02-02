using Cailms.Domain.Models.Shared;
using Cailms.Domain.Models.Statistics;

namespace Cailms.Domain.Models.Transfers
{
    public class TransfersList : IsMorePagedCollection<DayTransfers>
    {
        public TotalIncomeOutcome Total { get; set; }
    }
}