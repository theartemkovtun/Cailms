using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Repositories.Contracts;
using MediatR;

namespace Cailms.Application.Requests.Users.Commands.LogoutUser
{
    public class LogoutUserCommandHandler : IRequestHandler<LogoutUserCommand>
    {
        private readonly IUserRepository _userRepository;

        public LogoutUserCommandHandler(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }
        
        public async Task<Unit> Handle(LogoutUserCommand request, CancellationToken cancellationToken)
        {
            await _userRepository.DeleteRefreshTokenAsync(request.Email, request.RefreshToken, cancellationToken);
            
            return Unit.Value;
        }
    }
}