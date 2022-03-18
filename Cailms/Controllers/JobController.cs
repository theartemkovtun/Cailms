using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Application.Requests.Jobs.Commands.AddJob;
using Cailms.Application.Requests.Jobs.Commands.DeleteJob;
using Cailms.Application.Requests.Jobs.Commands.RubJobs;
using Cailms.Application.Requests.Jobs.Commands.ToggleJobStatus;
using Cailms.Application.Requests.Jobs.Commands.UpdateJob;
using Cailms.Application.Requests.Jobs.Queries.GetJob;
using Cailms.Application.Requests.Jobs.Queries.GetUserJobs;
using Cailms.Attributes;
using Cailms.Common.Constants;
using Cailms.Domain.Models.Jobs;
using Cailms.Models;
using Cailms.Models.Jobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/v1/jobs")]
    public class JobController : MediatorController
    {
        [HttpPost]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> AddJob([FromBody] AddJobInputModel input)
        {
            var request = Mapper.Map(input, new AddJobCommand(Email));
            return Ok(await Mediator.Send(request));
        }
        
        [HttpPost("run")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> RunJob()
        {
            return Ok(await Mediator.Send(new RunJobsCommand()));
        }
        
        [HttpGet]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Job>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<IEnumerable<Job>> GetJobs([FromQuery] GetUserJobsInputModel input)
        {
            var query = Mapper.Map(input, new GetUserJobsQuery(Email));
            return Mediator.Send(query);
        }
        
        [HttpGet("{id}")]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(Job))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<Job> GetJob([FromRoute] Guid id)
        {
            return Mediator.Send(new GetJobQuery(Email, id));
        }
        
        [HttpPut]
        [Consumes(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> UpdateJob([FromBody] UpdateJobInputModel input)
        {
            var request = Mapper.Map(input, new UpdateJobCommand(Email));
            return Ok(await Mediator.Send(request));
        }
        
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> DeleteJob([FromRoute] Guid id)
        {
            return Ok(await Mediator.Send(new DeleteJobCommand(Email, id)));
        }
        
        [HttpPost("{id}/status")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public async Task<IActionResult> ToggleJobStatus([FromRoute] Guid id)
        {
            return Ok(await Mediator.Send(new ToggleJobStatusCommand(Email, id)));
        }
    }
}