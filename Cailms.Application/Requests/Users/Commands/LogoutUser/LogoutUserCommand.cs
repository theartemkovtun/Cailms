using MediatR;

namespace Cailms.Application.Requests.Users.Commands.LogoutUser
{
    public class LogoutUserCommand : IRequest 
    {
        public LogoutUserCommand(string email)
        {
            Email = email;
        }
        
        public string Email { get; set; }
        public string RefreshToken { get; set; }
    }
}