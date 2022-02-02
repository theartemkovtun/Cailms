CREATE PROCEDURE [main].[procGetUserTags]
    @email NVARCHAR(128)
AS
BEGIN

    select distinct tt.tag value from (select id from main.Transfer where @email = @email) t
        join main.TransferTag tt on t.id = tt.transferId for json path;
END;