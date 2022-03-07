using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Domain.Models.Shared;
using Cailms.Domain.Models.Transfers;

namespace Cailms.Domain.Repositories.Contracts
{
    public interface ITransferRepository
    {
        Task<Guid> AddTransferAsync(AddTransferDomainModel model);
        Task<Guid> UpdateTransferAsync(UpdateTransferDomainModel model);
        Task DeleteTransferAsync(Guid id);
        Task<TransfersList> GetUserTransfersAsync(GetUserTransfersDomainModel model);
        Task<Transfer> GetTransferAsync(Guid id);
        Task<IEnumerable<SingleValue<string>>> GetUserCategoriesAsync(string email);
        Task<IEnumerable<SingleValue<string>>> GetUserTagsAsync(string email);
        Task AddSavedTransferFilterAsync(AddSavedTransferFilterDomainModel model);
        Task RenameSavedTransferFilterAsync(Guid id, string name);
        Task<IEnumerable<SavedTransferFilter>> GetUserSavedTransferFiltersAsync(string email);
        Task DeleteSavedTransferFilterAsync(Guid id);
        Task AddTransferTemplateAsync(AddTransferTemplateDomainModel model);
        Task RenameTransferTemplateAsync(Guid id, string name);
        Task<IEnumerable<TransferTemplate>> GetUserTransferTemplatesAsync(string email);
        Task DeleteTransferTemplateAsync(Guid id);
    }
}