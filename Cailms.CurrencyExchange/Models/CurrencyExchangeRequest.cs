using System;

namespace Cailms.CurrencyExchange.Models
{
    public class CurrencyExchangeRequest
    {
        public DateTime Date { get; set; }
        public string From { get; set; }
        public string To { get; set; }
        public long Amount { get; set; }
    }
}