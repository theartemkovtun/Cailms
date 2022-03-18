using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Jobs;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Jobs.Queries.GetUserJobs
{
    public class GetUserJobsQueryHandler : IRequestHandler<GetUserJobsQuery, IEnumerable<Job>>
    {
        private readonly IJobRepository _jobRepository;
        private readonly IMapper _mapper;

        public GetUserJobsQueryHandler(IJobRepository jobRepository, IMapper mapper)
        {
            _jobRepository = jobRepository;
            _mapper = mapper;
        }

        public Task<IEnumerable<Job>> Handle(GetUserJobsQuery request, CancellationToken cancellationToken)
        {
            var domainModel = _mapper.Map<GetUserJobsDomainModel>(request);
            
            return _jobRepository.GetUserJobsAsync(domainModel);
        }
    }
}