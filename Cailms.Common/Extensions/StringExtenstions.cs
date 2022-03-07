using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace Cailms.Common.Extensions
{
    public static class StringExtensions
    {
        public static string ToSqlEnumerableParameter(this IEnumerable<string> values)
        {
            if (values == null || !values.Any())
            {
                return null;
            }
            
            return string.Join(',', values);
        }

        public static string Sha256(this string source)
        {
            using var sha256Hash = SHA256.Create();
            var bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(source));

            var builder = new StringBuilder();
            foreach (var b in bytes)
            {
                builder.Append(b.ToString("x2"));
            }
            return builder.ToString();
        }
    }
}