using System;
using System.Threading.Tasks;
using Cailms.Application.Requests.Transfers.Commands.AddTransfer;
using Cailms.Application.Requests.Transfers.Commands.DeleteTransfer;
using Cailms.Application.Requests.Transfers.Commands.UpdateTransfer;
using Cailms.Application.Requests.Transfers.Queries.GetTransfer;
using Cailms.Application.Requests.Transfers.Queries.GetUserCategories;
using Cailms.Application.Requests.Transfers.Queries.GetUserTags;
using Cailms.Application.Requests.Transfers.Queries.GetUserTransfers;
using Cailms.Attributes;
using Cailms.Models.Transfers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/transfers")]
    public class TransferController : MediatorController
    {
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddTransfer([FromBody] AddTransferInputModel input)
        {
            var request = Mapper.Map(input, new AddTransferCommand(Email));
            await Mediator.Send(request);
            return Ok(new
            {
                id = request.Id
            });
        }
        
        [HttpPut]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> UpdateTransfer([FromBody] UpdateTransferInputModel input)
        {
            var request = Mapper.Map<UpdateTransferCommand>(input);
            await Mediator.Send(request);
            return Ok(new
            {
                id = request.Id
            });
        }
        
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTransfers([FromQuery] GetUserTransfersInputModel input)
        {
            var query = Mapper.Map(input, new GetUserTransfersQuery(Email));
            return Ok(await Mediator.Send(query));
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteTransfers([FromRoute] Guid id)
        {
            return Ok(await Mediator.Send(new DeleteTransferCommand(id)));
        }
        
        [HttpGet("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTransfers([FromRoute] Guid id)
        {
            return Ok(await Mediator.Send(new GetTransferQuery(id)));
        }
        
        [HttpGet("categories")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetCategories()
        {
            return Ok(await Mediator.Send(new GetUserCategoriesQuery(Email)));
        }
        
        [HttpGet("tags")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTags()
        {
            return Ok(await Mediator.Send(new GetUserTagsQuery(Email)));
        }
    }
}