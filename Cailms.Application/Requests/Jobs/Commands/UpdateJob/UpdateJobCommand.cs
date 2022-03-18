using System;
using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Enums;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.UpdateJob
{
    public class UpdateJobCommand : UserRequest, IRequest
    {
        public UpdateJobCommand(string email) : base(email) { }
        
        public Guid Id { get; set; }
        public string JobName { get; set; }
        public string Name { get; set; }
        public double Value { get; set; }
        public string Description { get; set; }
        public TransferType Type { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
        public IEnumerable<int> Days { get; set; }
    }
}