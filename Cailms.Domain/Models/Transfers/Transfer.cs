﻿using System;
using System.Collections.Generic;
using Cailms.Domain.Enums;

namespace Cailms.Domain.Models.Transfers
{
    public class Transfer
    {
        public Guid Id { get; set; }
        public DateTime Date { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public double Value { get; set; }
        public TransferType Type { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}