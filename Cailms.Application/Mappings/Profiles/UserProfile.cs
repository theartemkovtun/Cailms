using AutoMapper;
using Cailms.Application.Requests.Users.Commands.SignupUser;
using Cailms.Common.Extensions;
using Cailms.Domain.Models.Users;

namespace Cailms.Application.Mappings.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<SignupUserCommand, AddUserDomainModel>()
                .ForMember(dest => dest.PasswordHash, options => options.MapFrom(src => src.Password.Sha256()));
        }
    }
}