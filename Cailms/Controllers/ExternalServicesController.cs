using System.Threading.Tasks;
using Cailms.Application.Requests.External.Queries.CurrencyExchange;
using Cailms.Application.Requests.External.Queries.GetAvailableCurrencies;
using Cailms.Attributes;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/externalServices")]
    public class ExternalServicesController : MediatorController
    {
        [HttpGet("currencyExchange")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> CurrencyExchange([FromQuery] CurrencyExchangeQuery query)
        {
            return Ok(await Mediator.Send(query));
        }
        
        [HttpGet("availableCurrencies")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        public async Task<IActionResult> GetAvailableCurrencies()
        {
            return Ok(await Mediator.Send(new GetAvailableCurrenciesQuery()));
        }
    }
}