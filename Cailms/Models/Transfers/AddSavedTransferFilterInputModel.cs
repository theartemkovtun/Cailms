using System;
using System.Collections.Generic;

namespace Cailms.Models.Transfers
{
    public class AddSavedTransferFilterInputModel
    {
        public string Name { get; set; }
        public int? Type { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}