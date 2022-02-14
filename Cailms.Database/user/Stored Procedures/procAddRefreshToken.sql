CREATE PROCEDURE [user].[procAddRefreshToken] @email NVARCHAR(128),
                                              @refreshToken NVARCHAR(128)
AS
BEGIN
    INSERT INTO [user].[RefreshToken] (email, refreshToken) VALUES (@email, @refreshToken)
END;