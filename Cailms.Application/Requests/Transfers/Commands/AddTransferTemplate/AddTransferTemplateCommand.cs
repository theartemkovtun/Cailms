using System.Collections.Generic;
using Cailms.Application.Models;
using MediatR;

namespace Cailms.Application.Requests.Transfers.Commands.AddTransferTemplate
{
    public class AddTransferTemplateCommand : UserRequest, IRequest
    {
        public AddTransferTemplateCommand(string email) : base(email) { }
        
        public string TemplateName { get; set; }
        public string Name { get; set; }
        public double? Value { get; set; }
        public string Description { get; set; }
        public int Type { get; set; }
        public string Category { get; set; }
        public IEnumerable<string> Tags { get; set; }
    }
}