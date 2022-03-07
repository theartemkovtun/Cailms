CREATE TABLE [main].[SavedTransfersFilters] (
    [id]         UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [name]       NVARCHAR (128)   NOT NULL,
    [email]      NVARCHAR (128)   NOT NULL,
    [type]       INT              NULL,
    [startDate]  DATETIME         NULL,
    [endDate]    DATETIME         NULL,
    [categories] NVARCHAR (MAX)   NULL,
    [tags]       NVARCHAR (MAX)   NULL,
    [createdOn]  DATETIME         DEFAULT (getdate()) NOT NULL,
    CONSTRAINT [SavedTransfersFilters_pk] PRIMARY KEY NONCLUSTERED ([id] ASC)
);

