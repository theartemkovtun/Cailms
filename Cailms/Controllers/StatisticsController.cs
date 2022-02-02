using System.Threading.Tasks;
using Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics;
using Cailms.Application.Requests.Statistics.Queries.GetUserStatistics;
using Cailms.Attributes;
using Cailms.Models.Statistics;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/statistics")]
    public class StatisticsController : MediatorController
    {
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetStatistics([FromQuery] GetUserStatisticsInputModel input)
        {
            var request = Mapper.Map(input, new GetUserStatisticsQuery(Email));
            return Ok(await Mediator.Send(request));
        }
        
        [HttpGet("period")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetDailyStatistics([FromQuery] GetUserPeriodStatisticsInputModel input)
        {
            var request = Mapper.Map(input, new GetUserPeriodStatisticsQuery(Email));
            return Ok(await Mediator.Send(request));
        }
    }
}