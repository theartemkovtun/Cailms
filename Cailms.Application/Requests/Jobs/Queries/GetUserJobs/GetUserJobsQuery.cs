using System.Collections.Generic;
using Cailms.Application.Models;
using Cailms.Domain.Enums;
using Cailms.Domain.Models.Jobs;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Queries.GetUserJobs
{
    public class GetUserJobsQuery : UserRequest, IRequest<IEnumerable<Job>>
    {
        public GetUserJobsQuery(string email) : base(email) { }
        
        public JobsSortColumn SortColumn { get; set; }
        public Order Order { get; set; }
    }
}