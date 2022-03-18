using Cailms.Domain.Enums;

namespace Cailms.Models.Jobs
{
    public class GetUserJobsInputModel
    {
        public JobsSortColumn SortColumn { get; set; }
        public Order Order { get; set; }
    }
}