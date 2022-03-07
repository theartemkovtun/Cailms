using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Models.Transfers;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Queries.GetTransferTemplates
{
    public class GetTransferTemplatesQuery : UserRequest, IRequest<IEnumerable<TransferTemplate>>
    {
        public GetTransferTemplatesQuery(string email) : base(email) { }
    }
}