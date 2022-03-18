using AutoMapper;
using Cailms.Application.Requests.Jobs.Commands.AddJob;
using Cailms.Application.Requests.Jobs.Commands.UpdateJob;
using Cailms.Application.Requests.Jobs.Queries.GetUserJobs;
using Cailms.Models.Jobs;

namespace Cailms.Mappings.Profiles
{
    public class JobProfile : Profile
    {
        public JobProfile()
        {
            CreateMap<AddJobInputModel, AddJobCommand>();
            CreateMap<UpdateJobInputModel, UpdateJobCommand>();
            CreateMap<GetUserJobsInputModel, GetUserJobsQuery>();
        }
    }
}