using System;
using System.Collections.Generic;

namespace Cailms.Domain.Models.Transfers
{
    public class TransferTemplate
    {
        public Guid Id { get; set; }
        public string TemplateName { get; set; }
        public string Name { get; set; }
        public float Value { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}