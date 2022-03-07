using System;
using System.Data;
using FluentValidation;

namespace Cailms.Application.Requests.Statistics.Queries.GetUserPeriodStatistics
{
    public class GetUserPeriodStatisticsQueryValidator : AbstractValidator<GetUserPeriodStatisticsQuery>
    {
        public GetUserPeriodStatisticsQueryValidator()
        {
            var currentYear = DateTime.Now.Year;
            
            When(x => x.Month != null, () =>
            {
                RuleFor(x => x.Month)
                    .NotNull().WithMessage("'Month' is required")
                    .NotEmpty().WithMessage("'Month' cannot be empty")
                    .InclusiveBetween(1, 12).WithMessage("'Month' has to be inclusively between 1 and 12");
            });

            RuleFor(x => x.Year)
                .NotNull().WithMessage("'Year' is required")
                .NotEmpty().WithMessage("'Year' cannot be empty")
                .LessThanOrEqualTo(currentYear)
                .WithMessage($"'Year' has to be less or equal to current year ({currentYear})");
        }
    }
}