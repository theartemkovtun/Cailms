using AutoMapper;
using Cailms.Application.Requests.Jobs.Commands.AddJob;
using Cailms.Application.Requests.Jobs.Commands.UpdateJob;
using Cailms.Application.Requests.Jobs.Queries.GetUserJobs;
using Cailms.Domain.Models.Jobs;

namespace Cailms.Application.Mappings.Profiles
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            CreateMap<AddJobCommand, AddJobDomainModel>();
            CreateMap<UpdateJobCommand, UpdateJobDomainModel>();
            CreateMap<GetUserJobsQuery, GetUserJobsDomainModel>();
        }
    }
}