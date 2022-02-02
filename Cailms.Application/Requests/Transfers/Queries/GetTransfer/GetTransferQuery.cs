using System;
using Cailms.Domain.Models.Transfers;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetTransfer
{
    public class GetTransferQuery : IRequest<Transfer>
    {
        public GetTransferQuery(Guid id)
        {
            Id = id;
        }
        
        public Guid Id { get; set; }
    }
}