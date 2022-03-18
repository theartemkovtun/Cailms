using System;
using Cailms.Application.Models;
using Cailms.Domain.Models.Jobs;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Queries.GetJob
{
    public class GetJobQuery : UserRequest, IRequest<Job>
    {
        public Guid Id { get; set; }
        
        public GetJobQuery(string email, Guid id) : base(email)
        {
            Id = id;
        }
    }
}