using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Cailms.Common.Extensions
{
    public static class StringExtensions
    {
        public static string ToSqlEnumerableParameter(this IEnumerable<string> values)
        {
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