using Cailms.Common.Extensions;
using Cailms.Domain.Repositories.Contracts;
using FluentValidation;

namespace Cailms.Application.Requests.Users.Commands.LoginUser
{
    public class LoginUserCommandValidator : AbstractValidator<LoginUserCommand>
    {
        public LoginUserCommandValidator(IUserRepository userRepository)
        {
            RuleFor(u => u.Email)
                .NotNull().WithMessage("Email is required")
                .NotEmpty().WithMessage("Email cannot be empty");

            RuleFor(u => u.Password)
                .NotNull().WithMessage("Password is required")
                .NotEmpty().WithMessage("Password cannot be empty");
            
            RuleFor(u => new {u.Email, u.Password})
                .MustAsync(async (model, cancellationToken) => await userRepository.FirstOrDefaultAsync(model.Email, model.Password.Sha256(), cancellationToken) != null)
                .WithMessage("Invalid username or password");
        }
    }
}