using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Models.Users;

namespace Cailms.Domain.Repositories.Contracts
{
    public interface IUserRepository
    {
        Task<User> FirstOrDefaultAsync(string email, string passwordHash, CancellationToken cancellationToken = default);
        Task AddAsync(AddUserDomainModel user, CancellationToken cancellationToken = default);
        Task<bool> ValidateRefreshTokenAsync(string email, string refreshToken, CancellationToken cancellationToken = default);
        Task AddRefreshTokenAsync(string email, string refreshToken, CancellationToken cancellationToken = default);
        Task DeleteRefreshTokenAsync(string email, string refreshToken, CancellationToken cancellationToken = default);
    }
}