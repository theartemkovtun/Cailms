using System;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.DeleteTransferTemplate
{
    public class DeleteTransferTemplateCommand : IRequest
    {
        public DeleteTransferTemplateCommand(Guid id)
        {
            Id = id;
        }
        
        public Guid Id { get; set; }
    }
}