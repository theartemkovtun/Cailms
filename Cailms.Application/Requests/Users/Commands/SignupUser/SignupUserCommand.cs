using MediatR;

namespace Cailms.Application.Requests.Users.Commands.SignupUser
{
    public class SignupUserCommand : IRequest<Unit>
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string PasswordRepeat { get; set; }
    }
}