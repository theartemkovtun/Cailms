using System;
using System.Security.Cryptography;

namespace Cailms.Common.Utilities
{
    public class StringUtilities
    {
        public static string GetRandomStringKey()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }
    }
}