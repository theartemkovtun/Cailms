CREATE PROCEDURE [user].[procAddUser]
    @email  NVARCHAR(128),
    @passwordHash NVARCHAR(256)
AS
BEGIN
	INSERT INTO [user].[User] (email, passwordHash) VALUES (@email, @passwordHash)
END;