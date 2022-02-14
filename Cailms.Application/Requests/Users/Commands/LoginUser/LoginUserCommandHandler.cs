using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Application.Models.Users;
using Cailms.Application.Options;
using Cailms.Common.Utilities;
using Cailms.Domain.Repositories.Contracts;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace Cailms.Application.Requests.Users.Commands.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommand, TokenDto>
    {
        private readonly IUserRepository _userRepository;
        private readonly AuthorizationOptions _authorizationOptions;
        private readonly IValidator<LoginUserCommand> _validator;

        public LoginUserCommandHandler(IUserRepository userRepository, IOptions<AuthorizationOptions> authorizationOptions,  IValidator<LoginUserCommand> validator)
        {
            _userRepository = userRepository;
            _authorizationOptions = authorizationOptions.Value;
            _validator = validator;
        }

        public async Task<TokenDto> Handle(LoginUserCommand request, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(request, null, cancellationToken);
            
            var tokenOptions = new JwtSecurityToken(
                _authorizationOptions.Issuer,
                _authorizationOptions.Audience,
                new List<Claim>
                {
                    new Claim("email", request.Email)
                },
                expires: DateTime.Now.AddMinutes(_authorizationOptions.Lifetime),
                signingCredentials: new SigningCredentials(_authorizationOptions.SymmetricSecurityKey, SecurityAlgorithms.HmacSha256)
            );
            
            var token = new TokenDto
            {
                Token = new JwtSecurityTokenHandler().WriteToken(tokenOptions),
                ExpirationDate = tokenOptions.ValidTo
            };
            
            var refreshToken = StringUtilities.GetRandomStringKey();
            await _userRepository.AddRefreshTokenAsync(request.Email, refreshToken, cancellationToken);
            token.RefreshToken = refreshToken;

            return token;
        }
    }
}