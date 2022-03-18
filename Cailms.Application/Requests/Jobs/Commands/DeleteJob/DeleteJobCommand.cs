using System;
using Cailms.Application.Models;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Commands.DeleteJob
{
    public class DeleteJobCommand : UserRequest, IRequest
    {
        public Guid Id { get; set; }
        
        public DeleteJobCommand(string email, Guid id) : base(email)
        {
            Id = id;
        }
    }
}