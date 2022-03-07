using System;
using Cailms.Application.Models;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.RenameTransferTemplate
{
    public class RenameTransferTemplateCommand : UserRequest, IRequest
    {
        public RenameTransferTemplateCommand(string email) : base(email)
        {
        }
        
        public Guid Id { get; set; }
        public string Name { get; set; }
    }
}