using Cailms.Application.Models.Users;
using MediatR;

namespace Cailms.Application.Requests.Users.Commands.LoginUser
{
    public class LoginUserCommand: IRequest<TokenDto>
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }
}