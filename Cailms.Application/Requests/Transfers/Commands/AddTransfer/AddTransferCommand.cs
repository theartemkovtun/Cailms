using System;
using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Enums;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.AddTransfer
{
    public class AddTransferCommand : UserRequest, IRequest
    {
        public AddTransferCommand(string email) : base(email)
        {
        }
        
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