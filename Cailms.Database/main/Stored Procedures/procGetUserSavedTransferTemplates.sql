CREATE PROCEDURE [main].[procGetUserSavedTransferTemplates]
    @email NVARCHAR(128)
AS
BEGIN

    select
        id,
        templateName,
        name,
        description,
        value,
        type,
        category,
        JSON_QUERY((select CONCAT('[',STRING_AGG(CONCAT('"', value, '"'), ','),']') from STRING_SPLIT(tags, ','))) tags
    from [main].[SavedTransferTemplate] where [email] = @email order by createdOn for json path;

END;