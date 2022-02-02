using AutoMapper;
using Cailms.Application.Requests.Transfers.Commands.AddTransfer;
using Cailms.Application.Requests.Transfers.Commands.UpdateTransfer;
using Cailms.Application.Requests.Transfers.Queries.GetUserTransfers;
using Cailms.Domain.Models.Transfers;

namespace Cailms.Application.Mappings.Profiles
{
    public class TransferProfile : Profile
    {
        public TransferProfile()
        {
            CreateMap<AddTransferCommand, AddTransferDomainModel>()
                .ForMember(dest => dest.Day, options => options.MapFrom(src => src.Date.Day))
                .ForMember(dest => dest.Month, options => options.MapFrom(src => src.Date.Month))
                .ForMember(dest => dest.Year, options => options.MapFrom(src => src.Date.Year));

            CreateMap<UpdateTransferCommand, UpdateTransferDomainModel>()
                .ForMember(dest => dest.Day, options => options.MapFrom(src => src.Date.Day))
                .ForMember(dest => dest.Month, options => options.MapFrom(src => src.Date.Month))
                .ForMember(dest => dest.Year, options => options.MapFrom(src => src.Date.Year));

            
            CreateMap<GetUserTransfersQuery, GetUserTransfersDomainModel>()
                .ForMember(dto => dto.Page, opt => opt.NullSubstitute(Constants.Constants.Paging.DefaultPage))
                .ForMember(dto => dto.Take, opt => opt.NullSubstitute(Constants.Constants.Paging.DefaultTake));
        }
    }
}