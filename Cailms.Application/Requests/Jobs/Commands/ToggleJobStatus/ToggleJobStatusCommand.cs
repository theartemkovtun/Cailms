using System;
using Cailms.Application.Models;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.ToggleJobStatus
{
    public class ToggleJobStatusCommand : UserRequest, IRequest
    {
        public Guid Id { get; set; }
        
        public ToggleJobStatusCommand(string email, Guid id) : base(email)
        {
            Id = id;
        }
    }
}