using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Common.Extensions;
using Cailms.Domain.Configurations;
using Cailms.Domain.Constants;
using Cailms.Domain.Models.Shared;
using Cailms.Domain.Models.Transfers;
using Cailms.Domain.Repositories.Contracts;
using Microsoft.Extensions.Options;

namespace Cailms.Domain.Repositories
{
    public class TransferRepository : Repository, ITransferRepository
    {
        public TransferRepository(IOptions<DatabaseConfiguration> databaseConfiguration) : base(databaseConfiguration) { }

        public Task<Guid> AddTransferAsync(AddTransferDomainModel model)
        {
            return ExecuteScalarProcedure<Guid>(StoredProcedures.Main.AddTransfer, new
            {
                model.Name,
                model.Description,
                model.Email,
                model.Value,
                model.Category,
                model.Day,
                model.Month,
                model.Year,
                type = (int)model.Type,
                tags = model.Tags.ToSqlEnumerableParameter()
            });
        }

        public Task<Guid> UpdateTransferAsync(UpdateTransferDomainModel model)
        {
            return ExecuteScalarProcedure<Guid>(StoredProcedures.Main.UpdateTransfer, new
            {
                model.Id,
                model.Name,
                model.Description,
                model.Value,
                model.Category,
                model.Day,
                model.Month,
                model.Year,
                type = (int)model.Type,
                tags = model.Tags.ToSqlEnumerableParameter()
            });
        }

        public Task DeleteTransferAsync(Guid id)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.Main.DeleteTransfer, new {id});
        }

        public Task<TransfersList> GetUserTransfersAsync(GetUserTransfersDomainModel model)
        {
            return ExecuteJsonResultProcedureAsync<TransfersList>(StoredProcedures.Main.GetUserTransfers,
                new
                {
                    model.Email,
                    model.Page,
                    model.Take,
                    model.StartDate,
                    model.EndDate,
                    model.Type,
                    categories = model.Categories.ToSqlEnumerableParameter(),
                    tags = model.Tags.ToSqlEnumerableParameter()
                });
        }

        public Task<Transfer> GetTransferAsync(Guid id)
        {
            return ExecuteJsonResultProcedureAsync<Transfer>(StoredProcedures.Main.GetTransfer,
                new
                {
                    id
                });
        }

        public Task<IEnumerable<SingleValue<string>>> GetUserCategoriesAsync(string email)
        {
            return ExecuteJsonResultProcedureAsync<IEnumerable<SingleValue<string>>>(StoredProcedures.Main.GetUserCategories,
                new
                {
                    email
                });
        }

        public Task<IEnumerable<SingleValue<string>>> GetUserTagsAsync(string email)
        {
            return ExecuteJsonResultProcedureAsync<IEnumerable<SingleValue<string>>>(StoredProcedures.Main.GetUserTags,
                new
                {
                    email
                });
        }
    }
}