using System.Threading.Tasks;
using Cailms.Application.Requests.Users.Commands.LoginUser;
using Cailms.Application.Requests.Users.Commands.SignupUser;
using Cailms.Attributes;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/users")]
    public class UserController : MediatorController
    {
        [AllowAnonymous]
        [HttpPost("signup")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> SignupUser([FromBody] SignupUserCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
        
        [AllowAnonymous]
        [HttpPost("login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> LoginUser([FromBody] LoginUserCommand command)
        {
            return Ok(await Mediator.Send(command));
        }
    }
}