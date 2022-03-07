CREATE PROCEDURE [main].[procRenameSavedTransferTemplate]
    @id UNIQUEIDENTIFIER,
    @name  NVARCHAR(256)
AS
BEGIN

	UPDATE [main].[SavedTransferTemplate]
    SET [templateName] = @name
    WHERE [id] = @id

END;