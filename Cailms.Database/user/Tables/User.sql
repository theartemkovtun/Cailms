CREATE TABLE [user].[User] (
    [email]        NVARCHAR (128) NOT NULL,
    [passwordHash] NVARCHAR (256) NOT NULL,
    CONSTRAINT [table_name_pk] PRIMARY KEY NONCLUSTERED ([email] ASC)
);

