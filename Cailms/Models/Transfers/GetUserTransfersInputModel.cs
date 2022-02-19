using System;
using System.Collections.Generic;
using Cailms.Models.Shared;

namespace Cailms.Models.Transfers
{
    public class GetUserTransfersInputModel : PagingViewModel
    {
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int? Type { get; set; }
        public IEnumerable<string> Categories { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}