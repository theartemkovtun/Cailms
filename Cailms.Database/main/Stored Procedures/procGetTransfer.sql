CREATE PROCEDURE [main].[procGetTransfer]
    @id uniqueidentifier
AS
BEGIN

    select
        id,
        cast(concat(year, '-', month, '-', day) as datetime) date,
        name,
        description,
        round(value,2) value,
        type,
        category,
        JSON_QUERY((SELECT CONCAT('[',STRING_AGG(CONCAT('"', tt.tag, '"'), ','),']') FROM main.TransferTag tt where tt.transferId = @id)) tags
    from main.Transfer t
    where t.id = @id
    for json path, without_array_wrapper;

END;