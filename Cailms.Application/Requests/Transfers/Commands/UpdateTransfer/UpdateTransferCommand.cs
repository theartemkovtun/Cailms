using System;
using System.Collections.Generic;
using Cailms.Domain.Enums;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.UpdateTransfer
{
    public class UpdateTransferCommand : IRequest
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public float Value { get; set; }
        public TransferType Type { get; set; }
        public DateTime Date { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}