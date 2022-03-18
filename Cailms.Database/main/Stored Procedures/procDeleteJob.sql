CREATE PROCEDURE [main].[procDeleteJob]
    @id uniqueidentifier
AS
BEGIN

    DELETE FROM [main].[Job] WHERE [Id] = @id;

END;