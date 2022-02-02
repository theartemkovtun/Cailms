CREATE TABLE [main].[Category] (
    [name]  NVARCHAR (256) NOT NULL,
    [color] NVARCHAR (7)   NOT NULL,
    CONSTRAINT [Category_pk] PRIMARY KEY NONCLUSTERED ([name] ASC)
);

