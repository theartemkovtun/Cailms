CREATE PROCEDURE [user].[procGetUser]
    @email  NVARCHAR(128),
    @passwordHash NVARCHAR(256)
AS
BEGIN
	SELECT TOP 1 email FROM [user].[User] where email = @email and passwordHash = @passwordHash for json path, without_array_wrapper;
END;