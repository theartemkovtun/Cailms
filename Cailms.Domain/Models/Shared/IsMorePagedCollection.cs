using System.Collections.Generic;

namespace Cailms.Domain.Models.Shared
{
    public class IsMorePagedCollection<T>
    {
        public bool IsMore { get; set; }
        public IEnumerable<T> Items { get; set; }
    }
}