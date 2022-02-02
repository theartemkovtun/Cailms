namespace Cailms.Domain.Models.Statistics
{
    public class GetUserStatisticsDomainModel
    {
        public string Email { get; set; }
        public int? Month { get; set; }
        public int Year { get; set; }
    }
}