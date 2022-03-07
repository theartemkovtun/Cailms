using System;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.DeleteSavedTransferFilter
{
    public class DeleteSavedTransferFilterCommand : IRequest
    {
        public DeleteSavedTransferFilterCommand(Guid id)
        {
            Id = id;
        }
        
        public Guid Id { get; set; }
    }
}