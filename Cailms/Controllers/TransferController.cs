using System;
using System.Threading.Tasks;
using Cailms.Application.Requests.Transfers.Commands.AddSavedTransferFilter;
using Cailms.Application.Requests.Transfers.Commands.AddTransfer;
using Cailms.Application.Requests.Transfers.Commands.AddTransferTemplate;
using Cailms.Application.Requests.Transfers.Commands.DeleteSavedTransferFilter;
using Cailms.Application.Requests.Transfers.Commands.DeleteTransfer;
using Cailms.Application.Requests.Transfers.Commands.DeleteTransferTemplate;
using Cailms.Application.Requests.Transfers.Commands.RenameSavedTransferFilter;
using Cailms.Application.Requests.Transfers.Commands.RenameTransferTemplate;
using Cailms.Application.Requests.Transfers.Commands.UpdateTransfer;
using Cailms.Application.Requests.Transfers.Queries.GetTransfer;
using Cailms.Application.Requests.Transfers.Queries.GetTransferTemplates;
using Cailms.Application.Requests.Transfers.Queries.GetUserCategories;
using Cailms.Application.Requests.Transfers.Queries.GetUserSavedTransferFilters;
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
        
        [HttpPost("savedFilters")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddSavedTransferFilter([FromBody] AddSavedTransferFilterInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new AddSavedTransferFilterCommand(Email));
            
            return Ok(await Mediator.Send(command));
        }
        
        [HttpPut("savedFilters")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> RenameSavedTransferFilter([FromBody] RenameTemplateInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new RenameSavedTransferFilterCommand(Email));
            
            return Ok(await Mediator.Send(command));
        }
        
        [HttpGet("savedFilters")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetSavedTransferFilter()
        {
            return Ok(await Mediator.Send(new GetUserSavedTransferFiltersQuery(Email)));
        }
        
        [HttpDelete("savedFilters/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteSavedTransferFilter(Guid id)
        {
            return Ok(await Mediator.Send(new DeleteSavedTransferFilterCommand(id)));
        }
        
        [HttpPost("templates")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddTransferTemplate([FromBody] AddTransferTemplateInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new AddTransferTemplateCommand(Email));
            
            return Ok(await Mediator.Send(command));
        }
        
        [HttpPut("templates")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> RenameTransferTemplate([FromBody] RenameTemplateInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new RenameTransferTemplateCommand(Email));
            
            return Ok(await Mediator.Send(command));
        }
        
        [HttpGet("templates")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetTransferTemplates()
        {
            return Ok(await Mediator.Send(new GetTransferTemplatesQuery(Email)));
        }
        
        [HttpDelete("templates/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteTransferTemplate(Guid id)
        {
            return Ok(await Mediator.Send(new DeleteTransferTemplateCommand(id)));
        }
    }
}