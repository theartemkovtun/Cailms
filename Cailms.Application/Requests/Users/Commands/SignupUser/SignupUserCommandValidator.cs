using FluentValidation;

namespace Cailms.Application.Requests.Users.Commands.SignupUser
{
    public class SignupUserCommandValidator : AbstractValidator<SignupUserCommand>
    {
        public SignupUserCommandValidator()
        {
            RuleFor(x => x.Email)
                .NotNull().WithMessage("Email is required")
                .NotEmpty().WithMessage("Email cannot be empty");
            
            RuleFor(x => x.Password)
                .NotNull().WithMessage("Password is required")
                .NotEmpty().WithMessage("Password repeat cannot be empty")
                .Matches("^(?=.*[A-Z])(?=.*[\\W])(?=.*[0-9])(?=.*[a-z]).{8,30}$")
                .WithMessage("Invalid password. Requires 8 to 30 characters with at least one lowercase, one uppercase character and special symbol");

            RuleFor(x => x.PasswordRepeat)
                .NotNull().WithMessage("Password repeat is required")
                .NotEmpty().WithMessage("Password repeat cannot be empty")
                .Must((model, field) => model.Password == field).WithMessage("Passwords do not match");
        }
    }
}