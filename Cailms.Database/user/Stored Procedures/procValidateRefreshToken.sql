CREATE PROCEDURE [user].[procValidateRefreshToken] @email NVARCHAR(128),
                                              @refreshToken NVARCHAR(128)
AS
BEGIN
    SELECT IIF(refreshToken is not null, 1, 0) IsExist from [user].[RefreshToken] where email = @email and refreshToken = @refreshToken;
END;