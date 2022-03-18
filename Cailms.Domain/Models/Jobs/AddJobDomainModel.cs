using System.Collections.Generic;
using Cailms.Domain.Enums;

namespace Cailms.Domain.Models.Jobs
{
    public class AddJobDomainModel
    {
        public string JobName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public double Value { get; set; }
        public string Description { get; set; }
        public TransferType Type { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public IEnumerable<int> Days { get; set; }
    }
}