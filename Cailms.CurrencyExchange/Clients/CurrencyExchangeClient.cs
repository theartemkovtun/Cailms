using System;
using System.Threading.Tasks;
using Cailms.CurrencyExchange.Contracts;
using Cailms.CurrencyExchange.Models;
using Cailms.Http.Contracts;
using Cailms.Http.Models;
using Microsoft.Extensions.Options;

namespace Cailms.CurrencyExchange.Clients
{
    public class CurrencyExchangeClient : ICurrencyExchangeClient
    {
        private readonly IHttpClient _httpClient;
        private readonly CurrencyExchangeConfiguration _configuration;

        public CurrencyExchangeClient(IHttpClient httpClient, IOptions<CurrencyExchangeConfiguration> configurationOptions)
        {
            _httpClient = httpClient;
            _configuration = configurationOptions.Value;
        }

        public async Task<CurrencyExchangeResponse> Exchange(CurrencyExchangeRequest request)
        {
            var requestUrl = GetRequestUrl(request);
            
            var rapidApiResponse = await _httpClient.GetAsync<CurrencyRatesResponse>(requestUrl, 
                new [ ] 
                {
                    new HttpRequestParameter("from", request.From),
                    new HttpRequestParameter("to", request.To),
                    new HttpRequestParameter("amount", request.Amount.ToString()), 
                }, _configuration.AuthHeaders);

            var toRates = rapidApiResponse.Rates[request.To.ToUpper()];

            if (toRates == null)
            {
                throw new Exception($"Currency exchange failure: No such rate - {request.To}");
            }
            
            return new CurrencyExchangeResponse
            {
                Rate = toRates.RateFloat,
                RateForAmount = toRates.RateForAmountFloat
            };
        }

        private string GetRequestUrl(CurrencyExchangeRequest request)
        {
            return string.Format(_configuration.Url, request.Date.ToString("yyyy-MM-dd"));
        }
    }
}