using System;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.DeleteTransfer
{
    public class DeleteTransferCommand : IRequest
    {
        public DeleteTransferCommand(Guid id)
        {
            Id = id;
        }
        
        public Guid Id { get; set; }
    }
}