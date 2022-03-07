CREATE PROCEDURE [main].[procRenameSavedTransferFilter]
    @id UNIQUEIDENTIFIER,
    @name  NVARCHAR(256)
AS
BEGIN

	UPDATE [main].[SavedTransfersFilters]
    SET [name] = @name
    WHERE [id] = @id

END;