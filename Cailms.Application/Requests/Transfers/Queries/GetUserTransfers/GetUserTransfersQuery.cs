using System;
using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Models.Transfers;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetUserTransfers
{
    public class GetUserTransfersQuery : UserRequest, IRequest<TransfersList>
    {
        public GetUserTransfersQuery(string email) : base(email) { }
        
        public int? Page { get; set; }
        public int? Take { get; set; }        
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}