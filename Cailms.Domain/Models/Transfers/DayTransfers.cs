using System.Collections.Generic;

namespace Cailms.Domain.Models.Transfers
{
    public class DayTransfers
    {
        public string Date { get; set; }
        public IEnumerable<Transfer> Transfers { get; set; }
    }
}