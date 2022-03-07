using System;
using System.Collections.Generic;
using System.Linq;
using FluentValidation;

namespace Cailms.Application.Requests.External.Queries.CurrencyExchange
{
    public class CurrencyExchangeQueryValidator : AbstractValidator<CurrencyExchangeQuery>
    {
        private readonly IEnumerable<string> _availableCurrencies = new[] {"USD", "UAH", "EUR", "GPB"};

        public CurrencyExchangeQueryValidator()
        {
            var availableCurrenciesStringJoined = string.Join(',', _availableCurrencies);
            
            RuleFor(x => x.Date)
                .NotNull().WithMessage("'Date' is required")
                .NotEmpty().WithMessage("'Date' cannot be empty")
                .LessThanOrEqualTo(DateTime.Now)
                .WithMessage("'Date' has to be less or equal to current date");

            RuleFor(x => x.From)
                .NotNull().WithMessage("'From' is required")
                .NotEmpty().WithMessage("'From' cannot be empty")
                .Must(from => _availableCurrencies.Contains(from))
                .WithMessage($"Invalid currency provided in 'From'. Available - {availableCurrenciesStringJoined}");
            
            RuleFor(x => x.To)
                .NotNull().WithMessage("'To' is required")
                .NotEmpty().WithMessage("'To' cannot be empty")
                .Must(to => _availableCurrencies.Contains(to))
                .WithMessage($"Invalid currency provided in 'To'. Available - {availableCurrenciesStringJoined}");

            RuleFor(x => x.Amount)
                .NotNull().WithMessage("'Amount' is required")
                .NotEmpty().WithMessage("'Amount' cannot be empty")
                .GreaterThanOrEqualTo(0).WithMessage("'Amount' has to be greater or equal to 0");
        }
        
        
    }
}