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
            public const string AddSavedTransferFilter = "main.procAddSavedTransferFilter";
            public const string RenameSavedTransferFilter = "main.procRenameSavedTransferFilter";
            public const string GetUserSavedTransferFilters = "main.procGetUserSavedTransferFilters";
            public const string DeleteSavedTransferFilter = "main.procDeleteSavedTransferFilter";
            public const string RenameSavedTransferTemplate = "main.procRenameSavedTransferTemplate";
            public const string AddSavedTransferTemplate = "main.procAddSavedTransferTemplate";
            public const string AddJob = "main.procAddJob";
            public const string RunTodayJobs = "main.procRunTodayJobs";
            public const string GetUserJobs = "main.procGetUserJobs";
            public const string GetJob = "main.procGetJob";
            public const string DeleteJob = "main.procDeleteJob";
            public const string UpdateJob = "main.procUpdateJob";
            public const string ToggleJobStatus = "main.procToggleJobStatus";
            
            public const string GetUserSavedTransferTemplates = "main.procGetUserSavedTransferTemplates";
            public const string DeleteSavedTransferTemplate = "main.procDeleteSavedTransferTemplate";
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