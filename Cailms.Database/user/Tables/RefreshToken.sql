CREATE TABLE [user].[RefreshToken] (
    [email]        NVARCHAR (128) NOT NULL,
    [refreshToken] NVARCHAR (128) NOT NULL,
    CONSTRAINT [RefreshToken_pk] PRIMARY KEY NONCLUSTERED ([refreshToken] ASC, [email] ASC),
    CONSTRAINT [RefreshToken_User_email_fk] FOREIGN KEY ([email]) REFERENCES [user].[User] ([email]) ON DELETE CASCADE
);

