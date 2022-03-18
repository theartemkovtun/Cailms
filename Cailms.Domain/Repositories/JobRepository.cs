using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Cailms.Common.Extensions;
using Cailms.Domain.Configurations;
using Cailms.Domain.Constants;
using Cailms.Domain.Models.Jobs;
using Cailms.Domain.Repositories.Contracts;
using Microsoft.Extensions.Options;

namespace Cailms.Domain.Repositories
{
    public class JobRepository : Repository, IJobRepository
    {
        public JobRepository(IOptions<DatabaseConfiguration> databaseConfiguration) : base(databaseConfiguration)
        {
        }

        public Task AddJobAsync(AddJobDomainModel model)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.Main.AddJob, new
            {
                model.JobName,
                model.Name,
                model.Email,
                model.Description,
                model.Value,
                model.Category,
                type = (int)model.Type,
                tags = model.Tags.ToSqlEnumerableParameter(),
                days = model.Days.Select(d => d.ToString()).ToSqlEnumerableParameter()
            });
        }

        public Task RunTodayJobsAsync()
        {
            return ExecuteNonQueryProcedure(StoredProcedures.Main.RunTodayJobs);
        }

        public Task<IEnumerable<Job>> GetUserJobsAsync(GetUserJobsDomainModel model)
        {
            return ExecuteJsonResultProcedureAsync<IEnumerable<Job>>(StoredProcedures.Main.GetUserJobs, new
            {
                email = model.Email,
                sortColumn = model.SortColumn.ToString(),
                sortOrder = (int)model.Order
            });
        }

        public Task UpdateJobAsync(UpdateJobDomainModel model)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.Main.UpdateJob, new
            {
                model.Id,
                model.JobName,
                model.Name,
                model.Description,
                model.Value,
                model.Category,
                type = (int)model.Type,
                tags = model.Tags.ToSqlEnumerableParameter(),
                days = model.Days.Select(d => d.ToString()).ToSqlEnumerableParameter()
            });
        }

        public Task DeleteJobAsync(Guid id)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.Main.DeleteJob, new {id});
        }

        public Task<Job> GetJobAsync(Guid id)
        {
            return ExecuteJsonResultProcedureAsync<Job>(StoredProcedures.Main.GetJob, new
            {
                id
            });
        }

        public Task ToggleJobStatusAsync(Guid id)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.Main.ToggleJobStatus, new {id});
        }
    }
}