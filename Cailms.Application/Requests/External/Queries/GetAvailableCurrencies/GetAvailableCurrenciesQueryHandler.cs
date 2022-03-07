using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Cailms.Application.Models.External;
using MediatR;

namespace Cailms.Application.Requests.External.Queries.GetAvailableCurrencies
{
    public class GetAvailableCurrenciesQueryHandler : IRequestHandler<GetAvailableCurrenciesQuery, IEnumerable<Currency>>
    {
        public Task<IEnumerable<Currency>> Handle(GetAvailableCurrenciesQuery request, CancellationToken cancellationToken)
        {
            return Task.FromResult<IEnumerable<Currency>>(new[]
            {
                new Currency
                {
                    Code = "USD"
                },
                new Currency
                {
                    Code = "EUR"
                },
                new Currency
                {
                    Code = "UAH"
                },
                new Currency
                {
                    Code = "GBP"
                }, 
            });
        }
    }
}