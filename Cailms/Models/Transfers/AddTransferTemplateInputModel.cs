using System.Collections.Generic;

namespace Cailms.Models.Transfers
{
    public class AddTransferTemplateInputModel
    {
        public string Name { get; set; }
        public string TemplateName { get; set; }
        public double? Value { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}