using AutoMapper;
using Cailms.Application.Requests.External.Queries.CurrencyExchange;
using Cailms.CurrencyExchange.Models;

namespace Cailms.Application.Mappings.Profiles
{
    public class ExternalServicesProfile : Profile
    {
        public ExternalServicesProfile()
        {
            CreateMap<CurrencyExchangeQuery, CurrencyExchangeRequest>();
        }
    }
}