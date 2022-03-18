using System;

namespace Cailms.Models.Jobs
{
    public class UpdateJobInputModel : AddJobInputModel
    {
        public Guid Id { get; set; }
    }
}