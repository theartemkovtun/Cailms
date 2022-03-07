using System;
using Cailms.Application.Models;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.RenameSavedTransferFilter
{
    public class RenameSavedTransferFilterCommand : UserRequest, IRequest
    {
        public RenameSavedTransferFilterCommand(string email) : base(email)
        {
        }
        
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}