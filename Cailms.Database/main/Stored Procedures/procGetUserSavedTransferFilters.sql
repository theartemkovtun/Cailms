CREATE PROCEDURE [main].[procGetUserSavedTransferFilters]
    @email NVARCHAR(128)
AS
BEGIN

    select
        id,
        name,
        type,
        startDate,
        endDate,
        JSON_QUERY((select CONCAT('[',STRING_AGG(CONCAT('"', value, '"'), ','),']') from STRING_SPLIT(categories, ','))) categories,
        JSON_QUERY((select CONCAT('[',STRING_AGG(CONCAT('"', value, '"'), ','),']') from STRING_SPLIT(tags, ','))) tags
    from [main].[SavedTransfersFilters] where [email] = @email order by createdOn for json path;

END;