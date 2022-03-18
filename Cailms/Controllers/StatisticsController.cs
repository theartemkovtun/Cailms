using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics;
using Cailms.Application.Requests.Statistics.Queries.GetUserStatistics;
using Cailms.Attributes;
using Cailms.Common.Constants;
using Cailms.Domain.Models.Statistics;
using Cailms.Models;
using Cailms.Models.Statistics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/v1/statistics")]
    public class StatisticsController : MediatorController
    {
        [HttpGet]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(UserStatistics))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<UserStatistics> GetStatistics([FromQuery] GetUserStatisticsInputModel input)
        {
            var request = Mapper.Map(input, new GetUserStatisticsQuery(Email));
            return Mediator.Send(request);
        }
        
        [HttpGet("period")]
        [Consumes(MimeTypes.ApplicationJson)]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<UserPeriodIncomeOutcome>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<IEnumerable<UserPeriodIncomeOutcome>> GetDailyStatistics([FromQuery] GetUserPeriodStatisticsInputModel input)
        {
            var request = Mapper.Map(input, new GetUserPeriodStatisticsQuery(Email));
            return Mediator.Send(request);
        }
    }
}