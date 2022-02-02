CREATE PROCEDURE [main].[procDeleteTransfer]
    @id uniqueidentifier
AS
BEGIN

    DELETE FROM [main].[Transfer] WHERE [Id] = @id;

END;