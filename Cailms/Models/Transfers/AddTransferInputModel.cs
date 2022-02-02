using System;
using System.Collections.Generic;
using Cailms.Domain.Enums;

namespace Cailms.Models.Transfers
{
    public class AddTransferInputModel
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public float Value { get; set; }
        public TransferType Type { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}