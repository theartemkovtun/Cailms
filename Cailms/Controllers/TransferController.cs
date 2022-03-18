using System;
using System.Collections;
using System.Collections.Generic;
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
using Cailms.Common.Constants;
using Cailms.Domain.Models.Shared;
using Cailms.Domain.Models.Transfers;
using Cailms.Models;
using Cailms.Models.Transfers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/v1/transfers")]
    public class TransferController : MediatorController
    {
        [HttpPost]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> AddTransfer([FromBody] AddTransferInputModel input)
        {
            var request = Mapper.Map(input, new AddTransferCommand(Email)); 
            await Mediator.Send(request);
            return CreatedAtAction("GetTransfer", new {id = request.Id}, new {id = request.Id});
        }
        
        [HttpPut]
        [Consumes(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> UpdateTransfer([FromBody] UpdateTransferInputModel input)
        {
            var request = Mapper.Map<UpdateTransferCommand>(input);
            return Ok(await Mediator.Send(request));
        }
        
        [HttpGet]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(TransfersList))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<TransfersList> GetTransfers([FromQuery] GetUserTransfersInputModel input)
        {
            var query = Mapper.Map(input, new GetUserTransfersQuery(Email));
            return Mediator.Send(query);
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteTransfers([FromRoute] Guid id)
        {
            return Ok(await Mediator.Send(new DeleteTransferCommand(id)));
        }
        
        [HttpGet("{id}")]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Transfer))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<Transfer> GetTransfer([FromRoute] Guid id)
        {
            return Mediator.Send(new GetTransferQuery(id));
        }
        
        [HttpGet("categories")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<SingleValue<string>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<IEnumerable<SingleValue<string>>> GetCategories()
        {
            return Mediator.Send(new GetUserCategoriesQuery(Email));
        }
        
        [HttpGet("tags")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<SingleValue<string>>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<IEnumerable<SingleValue<string>>> GetTags()
        {
            return Mediator.Send(new GetUserTagsQuery(Email));
        }
        
        [HttpPost("savedFilters")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> AddSavedTransferFilter([FromBody] AddSavedTransferFilterInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new AddSavedTransferFilterCommand(Email));
            return Ok(await Mediator.Send(command));
        }
        
        [HttpPut("savedFilters")]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> RenameSavedTransferFilter([FromBody] RenameTemplateInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new RenameSavedTransferFilterCommand(Email));
            return Ok(await Mediator.Send(command));
        }
        
        [HttpGet("savedFilters")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<SavedTransferFilter>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<IEnumerable<SavedTransferFilter>> GetSavedTransferFilter()
        {
            return Mediator.Send(new GetUserSavedTransferFiltersQuery(Email));
        }
        
        [HttpDelete("savedFilters/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteSavedTransferFilter(Guid id)
        {
            return Ok(await Mediator.Send(new DeleteSavedTransferFilterCommand(id)));
        }
        
        [HttpPost("templates")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> AddTransferTemplate([FromBody] AddTransferTemplateInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new AddTransferTemplateCommand(Email));
            return Ok(await Mediator.Send(command));
        }
        
        [HttpPut("templates")]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> RenameTransferTemplate([FromBody] RenameTemplateInputModel inputModel)
        {
            var command = Mapper.Map(inputModel, new RenameTransferTemplateCommand(Email));
            return Ok(await Mediator.Send(command));
        }
        
        [HttpGet("templates")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<SavedTransferFilter>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
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