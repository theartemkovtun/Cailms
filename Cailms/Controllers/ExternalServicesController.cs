using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using Cailms.Application.Models.External;
using Cailms.Application.Requests.External.Queries.CurrencyExchange;
using Cailms.Application.Requests.External.Queries.GetAvailableCurrencies;
using Cailms.Attributes;
using Cailms.Common.Constants;
using Cailms.CurrencyExchange.Models;
using Cailms.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Cailms.Controllers
{
    [JwtAuthorize]
    [Route("api/v1/externalServices")]
    public class ExternalServicesController : MediatorController
    {
        [HttpGet("currencyExchange")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(CurrencyExchangeResponse))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<CurrencyExchangeResponse> CurrencyExchange([FromQuery] CurrencyExchangeQuery query)
        {
            return Mediator.Send(query);
        }
        
        [HttpGet("availableCurrencies")]
        [Produces(MimeTypes.ApplicationJson)]
        [ProducesResponseType(StatusCodes.Status200OK, Type = typeof(IEnumerable<Currency>))]
        [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(ErrorViewModel))]
        public Task<IEnumerable<Currency>> GetAvailableCurrencies()
        {
            return Mediator.Send(new GetAvailableCurrenciesQuery());
        }
    }
}