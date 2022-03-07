using System.Collections.Generic;
using Cailms.Application.Models.External;
using MediatR;

namespace Cailms.Application.Requests.External.Queries.GetAvailableCurrencies
{
    public class GetAvailableCurrenciesQuery : IRequest<IEnumerable<Currency>> { }
}