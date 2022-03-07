CREATE PROCEDURE [main].[procDeleteSavedTransferTemplate]
    @id uniqueidentifier
AS
BEGIN

    DELETE FROM [main].[SavedTransferTemplate] WHERE [Id] = @id;

END;