using AutoMapper;
using Cailms.Application.Requests.Transfers.Commands.AddSavedTransferFilter;
using Cailms.Application.Requests.Transfers.Commands.AddTransfer;
using Cailms.Application.Requests.Transfers.Commands.AddTransferTemplate;
using Cailms.Application.Requests.Transfers.Commands.RenameSavedTransferFilter;
using Cailms.Application.Requests.Transfers.Commands.RenameTransferTemplate;
using Cailms.Application.Requests.Transfers.Commands.UpdateTransfer;
using Cailms.Application.Requests.Transfers.Queries.GetUserTransfers;
using Cailms.Models.Transfers;

namespace Cailms.Mappings.Profiles
{
    public class TransferProfile : Profile
    {
        public TransferProfile()
        {
            CreateMap<AddTransferInputModel, AddTransferCommand>();
            CreateMap<UpdateTransferInputModel, UpdateTransferCommand>();
            CreateMap<GetUserTransfersInputModel, GetUserTransfersQuery>();
            CreateMap<AddSavedTransferFilterInputModel, AddSavedTransferFilterCommand>();
            CreateMap<RenameTemplateInputModel, RenameSavedTransferFilterCommand>();
            CreateMap<AddTransferTemplateInputModel, AddTransferTemplateCommand>();
            CreateMap<RenameTemplateInputModel, RenameTransferTemplateCommand>();
        }
    }
}