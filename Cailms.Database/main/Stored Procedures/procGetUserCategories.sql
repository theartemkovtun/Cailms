CREATE PROCEDURE [main].[procGetUserCategories]
    @email NVARCHAR(128)
AS
BEGIN

    select name value from main.Category for json path;

END;