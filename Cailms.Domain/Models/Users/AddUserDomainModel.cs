namespace Cailms.Domain.Models.Users
{
    public class AddUserDomainModel
    {
        public string Email { get; set; }
        
        public string PasswordHash { get; set; }
    }
}