CREATE TABLE [main].[SavedTransferTemplate] (
    [id]           UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [name]         NVARCHAR (256)   NULL,
    [description]  NVARCHAR (MAX)   NULL,
    [value]        FLOAT (53)       NULL,
    [type]         INT              NULL,
    [category]     NVARCHAR (256)   NULL,
    [tags]         NVARCHAR (MAX)   NULL,
    [createdOn]    DATETIME         DEFAULT (getdate()) NOT NULL,
    [email]        NVARCHAR (128)   NOT NULL,
    [templateName] NVARCHAR (128)   NOT NULL,
    CONSTRAINT [SavedTransferTemplate_pk] PRIMARY KEY NONCLUSTERED ([id] ASC)
);

