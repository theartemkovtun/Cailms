using System.Threading.Tasks;
using Cailms.Application.Models.Users;
using Cailms.Application.Requests.Users.Commands.LoginUser;
using Cailms.Application.Requests.Users.Commands.SignupUser;
using Cailms.Attributes;
using Cailms.Common.Constants;
using Cailms.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/v1/users")]
    public class UserController : MediatorController
    {
        [AllowAnonymous]
        [HttpPost("signup")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> SignupUser([FromBody] SignupUserCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        [Produces(MimeTypes.ApplicationJson)]
        [Consumes(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TokenDto))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<TokenDto> LoginUser([FromBody] LoginUserCommand command)
        {
            return Mediator.Send(command);
        }
    }
}