using System.Collections.Generic;
using Cailms.Http.Models;

namespace Cailms.CurrencyExchange.Models
{
    public class CurrencyExchangeConfiguration
    {
        public string Url { get; set; }
        public IEnumerable<HttpRequestParameter> AuthHeaders { get; set; }
    }
}