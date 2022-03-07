using System;
using System.Collections.Generic;
using Cailms.Application.Models;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.AddSavedTransferFilter
{
    public class AddSavedTransferFilterCommand : UserRequest, IRequest
    {
        public AddSavedTransferFilterCommand(string email) : base(email)
        {
        }
        
        public string Name { get; set; }
        public int? Type { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}