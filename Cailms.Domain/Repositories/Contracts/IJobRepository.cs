using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Domain.Models.Jobs;

namespace Cailms.Domain.Repositories.Contracts
{
    public interface IJobRepository
    {
        Task AddJobAsync(AddJobDomainModel model);
        Task RunTodayJobsAsync();
        Task<IEnumerable<Job>> GetUserJobsAsync(GetUserJobsDomainModel model);
        Task UpdateJobAsync(UpdateJobDomainModel model);
        Task DeleteJobAsync(Guid id);
        Task<Job> GetJobAsync(Guid id);
        Task ToggleJobStatusAsync(Guid id);
    }
}