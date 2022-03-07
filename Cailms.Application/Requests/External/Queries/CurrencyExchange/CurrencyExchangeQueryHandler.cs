using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Cailms.CurrencyExchange.Contracts;
using Cailms.CurrencyExchange.Models;
using FluentValidation;
using MediatR;

namespace Cailms.Application.Requests.External.Queries.CurrencyExchange
{
    public class CurrencyExchangeQueryHandler : IRequestHandler<CurrencyExchangeQuery, CurrencyExchangeResponse>
    {
        private readonly ICurrencyExchangeClient _currencyExchangeClient;
        private readonly IValidator<CurrencyExchangeQuery> _validator;
        private readonly IMapper _mapper;

        public CurrencyExchangeQueryHandler(ICurrencyExchangeClient currencyExchangeClient, IMapper mapper, IValidator<CurrencyExchangeQuery> validator)
        {
            _currencyExchangeClient = currencyExchangeClient;
            _mapper = mapper;
            _validator = validator;
        }

        public async Task<CurrencyExchangeResponse> Handle(CurrencyExchangeQuery request, CancellationToken cancellationToken)
        {
            await _validator.ValidateAndThrowAsync(request, null, cancellationToken);
            
            var currencyExchangeRequest = _mapper.Map<CurrencyExchangeRequest>(request);

            return await _currencyExchangeClient.Exchange(currencyExchangeRequest);
        }
    }
}