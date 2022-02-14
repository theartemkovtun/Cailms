namespace Cailms.Domain.Constants
{
    public static class StoredProcedures
    {
        public static class Main
        {
            public const string AddTransfer = "main.procAddTransfer";
            public const string UpdateTransfer = "main.procUpdateTransfer";
            public const string DeleteTransfer = "main.procDeleteTransfer";
            public const string GetUserStatistics = "main.procGetUserStatistics";
            public const string GetUserPeriodStatistics = "main.procGetUserPeriodStatistics";
            public const string GetUserTransfers = "main.procGetUserTransfers";
            public const string GetUserCategories = "main.procGetUserCategories";
            public const string GetUserTags = "main.procGetUserTags";
            public const string GetTransfer = "main.procGetTransfer";
        }

        public static class User
        {
            public const string AddUser = "user.procAddUser";
            public const string GetUser = "user.procGetUser";
            public const string DeleteRefreshToken = "user.procDeleteRefreshToken";
            public const string AddRefreshToken = "user.procAddRefreshToken";
            public const string ValidateRefreshToken = "user.procValidateRefreshToken";
        }
    }
}