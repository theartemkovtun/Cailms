CREATE TABLE [main].[TransferTag] (
    [transferId] UNIQUEIDENTIFIER NOT NULL,
    [tag]        NVARCHAR (128)   NOT NULL,
    CONSTRAINT [TransferTag_pk] PRIMARY KEY NONCLUSTERED ([transferId] ASC, [tag] ASC)
);

