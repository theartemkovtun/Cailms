CREATE PROCEDURE [user].[procDeleteRefreshToken] @email NVARCHAR(128), @refreshToken NVARCHAR(128)
AS
BEGIN
    DELETE FROM [user].[RefreshToken] WHERE email = @email AND refreshToken = @refreshToken;
END;