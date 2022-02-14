using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.Domain.Models.Users;
using Cailms.Domain.Repositories.Contracts;
using FluentValidation;
using MediatR;

namespace Cailms.Application.Requests.Users.Commands.SignupUser
{
    public class SignupUserCommandHandler : IRequestHandler<SignupUserCommand>
    {
        private readonly IUserRepository _userRepository;
        private readonly IValidator<SignupUserCommand> _validator;
        private readonly IMapper _mapper;

        public SignupUserCommandHandler(IUserRepository userRepository, IValidator<SignupUserCommand> validator, IMapper mapper)
        {
            _userRepository = userRepository;
            _validator = validator;
            _mapper = mapper;
        }

        public async Task<Unit> Handle(SignupUserCommand request, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(request, null, cancellationToken);

            var domainModel = _mapper.Map<AddUserDomainModel>(request);

            await _userRepository.AddAsync(domainModel, cancellationToken);
            
            return Unit.Value;
        }
    }
}