using System;
using Cailms.CurrencyExchange.Models;
using MediatR;

namespace Cailms.Application.Requests.External.Queries.CurrencyExchange
{
    public class CurrencyExchangeQuery: IRequest<CurrencyExchangeResponse>
    {
        public DateTime Date { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public float Amount { get; set; }
    }
}