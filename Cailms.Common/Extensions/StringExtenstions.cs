using System.Collections.Generic;

namespace Cailms.Common.Extensions
{
    public static class StringExtensions
    {
        public static string ToSqlEnumerableParameter(this IEnumerable<string> values)
        {
            return string.Join(',', values);
        }
    }
}