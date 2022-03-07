using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace Cailms.CurrencyExchange.Models
{
    public class CurrencyRatesResponse
    {
        [JsonProperty("base_currency_code")]
        public string BaseCurrencyCode { get; set; }
        
        [JsonProperty("base_currency_name")]
        public string BaseCurrencyName { get; set; }
        
        [JsonProperty("amount")]
        public string Amount { get; set; }
        
        [JsonProperty("updated_date")]
        public DateTime UpdatedDate { get; set; }
        
        [JsonProperty("status")]
        public ResponseStatus Status { get; set; }
        
        [JsonProperty("rates")]
        public Dictionary<string, CurrencyRate> Rates { get; set; }
    }
}