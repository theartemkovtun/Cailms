using System;
using Newtonsoft.Json;

namespace Cailms.CurrencyExchange.Models
{
    public class CurrencyRate
    {
        [JsonProperty("currency_name")]
        public string CurrencyName { get; set; }

        [JsonProperty("rate")]
        public string Rate { get; set; }
        
        [JsonProperty("rate_for_amount")]
        public string RateForAmount { get; set; }

        public float RateFloat
        {
            get
            {
                var success = float.TryParse(Rate, out var rateConverted);

                if (success)
                {
                    return rateConverted;
                }

                throw new Exception($"Failed to convert Rate of {CurrencyName}");
            }
        }
        
        public float RateForAmountFloat
        {
            get
            {
                var success = float.TryParse(RateForAmount, out var rateForAmountConverted);

                if (success)
                {
                    return rateForAmountConverted;
                }

                throw new Exception($"Failed to convert RateForAmount of {CurrencyName}");
            }
        }
    }
}