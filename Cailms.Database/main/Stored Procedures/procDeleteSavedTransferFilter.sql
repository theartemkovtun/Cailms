CREATE PROCEDURE [main].[procDeleteSavedTransferFilter]
    @id uniqueidentifier
AS
BEGIN

    DELETE FROM [main].[SavedTransfersFilters] WHERE [Id] = @id;

END;