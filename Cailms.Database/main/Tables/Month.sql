CREATE TABLE [main].[Month] (
    [number] INT           NOT NULL,
    [name]   NVARCHAR (64) NOT NULL,
    CONSTRAINT [Month_pk] PRIMARY KEY NONCLUSTERED ([number] ASC)
);

