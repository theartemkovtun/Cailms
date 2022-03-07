using System.Threading.Tasks;
using Cailms.CurrencyExchange.Models;

namespace Cailms.CurrencyExchange.Contracts
{
    public interface ICurrencyExchangeClient
    {
        Task<CurrencyExchangeResponse> Exchange(CurrencyExchangeRequest request);
    }
}