using System;

namespace Cailms.Domain.Helpers.Attributes
{
    [AttributeUsage(AttributeTargets.Property)]
    public class QueryParamIgnoreAttribute : Attribute
    {
    }
}