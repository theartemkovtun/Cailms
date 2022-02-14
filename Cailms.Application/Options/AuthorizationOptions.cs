using System.Text;
using Microsoft.IdentityModel.Tokens;

namespace Cailms.Application.Options
{
    public class AuthorizationOptions
    {
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string Key { get; set; }
        public int Lifetime { get; set; }
        public SymmetricSecurityKey SymmetricSecurityKey => new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Key));

    }
}