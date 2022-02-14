using System.Threading;
using System.Threading.Tasks;
using Cailms.Domain.Configurations;
using Cailms.Domain.Constants;
using Cailms.Domain.Models.Users;
using Cailms.Domain.Repositories.Contracts;
using Microsoft.Extensions.Options;

namespace Cailms.Domain.Repositories
{
    public class UserRepository : Repository, IUserRepository
    {
        public UserRepository(IOptions<DatabaseConfiguration> databaseConfiguration) : base(databaseConfiguration)
        {
        }

        public Task<User> FirstOrDefaultAsync(string email, string passwordHash, CancellationToken cancellationToken = default)
        {
            return ExecuteJsonResultProcedureAsync<User>(StoredProcedures.User.GetUser, new
            {
                email,
                passwordHash
            });
        }

        public Task AddAsync(AddUserDomainModel user, CancellationToken cancellationToken = default)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.User.AddUser, new
            {
                user.Email,
                user.PasswordHash
            });
        }

        public Task<bool> ValidateRefreshTokenAsync(string email, string refreshToken, CancellationToken cancellationToken = default)
        {
            return ExecuteScalarProcedure<bool>(StoredProcedures.User.ValidateRefreshToken, new
            {
                email,
                refreshToken
            });
        }

        public Task AddRefreshTokenAsync(string email, string refreshToken, CancellationToken cancellationToken = default)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.User.AddRefreshToken, new
            {
                email,
                refreshToken
            });
        }

        public Task DeleteRefreshTokenAsync(string email, string refreshToken, CancellationToken cancellationToken = default)
        {
            return ExecuteNonQueryProcedure(StoredProcedures.User.DeleteRefreshToken, new
            {
                email,
                refreshToken
            });
        }
    }
}