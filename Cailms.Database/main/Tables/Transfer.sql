CREATE TABLE [main].[Transfer] (
    [id]          UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [email]       NVARCHAR (128)   NOT NULL,
    [name]        NVARCHAR (256)   NOT NULL,
    [description] NVARCHAR (MAX)   NULL,
    [value]       FLOAT (53)       NOT NULL,
    [day]         INT              NOT NULL,
    [month]       INT              NOT NULL,
    [year]        INT              NOT NULL,
    [type]        INT              DEFAULT ((1)) NOT NULL,
    [category]    NVARCHAR (256)   NULL,
    [createdOn]   DATETIME         DEFAULT (getutcdate()) NOT NULL,
    CONSTRAINT [Transfer_pk] PRIMARY KEY NONCLUSTERED ([id] ASC),
    CONSTRAINT [Transfer_Category_name_fk] FOREIGN KEY ([category]) REFERENCES [main].[Category] ([name]) ON DELETE SET NULL
);



