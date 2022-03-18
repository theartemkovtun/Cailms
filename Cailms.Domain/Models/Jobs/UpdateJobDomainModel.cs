using System;

namespace Cailms.Domain.Models.Jobs
{
    public class UpdateJobDomainModel : AddJobDomainModel
    {
        public Guid Id { get; set; }
    }
}