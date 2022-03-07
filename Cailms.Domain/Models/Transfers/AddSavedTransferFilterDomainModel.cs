using System;
using System.Collections.Generic;

namespace Cailms.Domain.Models.Transfers
{
    public class AddSavedTransferFilterDomainModel
    {
        public string Name { get; set; }
        public string Email { get; set; }
        public int? Type { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}