namespace Cailms.Domain.Models.Statistics
{
    public class GetUserPeriodStatisticsDomainModel
    {
        public string Email { get; set; }
        public int? Month { get; set; }
        public int Year { get; set; }
    }
}