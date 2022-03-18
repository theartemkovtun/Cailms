using Cailms.Domain.Enums;

namespace Cailms.Domain.Models.Jobs
{
    public class GetUserJobsDomainModel
    {
        public string Email { get; set; }
        public JobsSortColumn SortColumn { get; set; }
        public Order Order { get; set; }
    }
}