CREATE TABLE [main].[Job] (
    [id]          UNIQUEIDENTIFIER DEFAULT (newid()) NOT NULL,
    [jobName]     NVARCHAR (128)   NOT NULL,
    [name]        NVARCHAR (256)   NOT NULL,
    [email]       NVARCHAR (128)   NOT NULL,
    [value]       FLOAT (53)       NOT NULL,
    [description] NVARCHAR (MAX)   NULL,
    [category]    NVARCHAR (256)   NULL,
    [tags]        NVARCHAR (MAX)   NULL,
    [createdOn]   DATETIME         DEFAULT (getdate()) NULL,
    [type]        INT              NOT NULL,
    [isActive]    BIT              DEFAULT ((1)) NOT NULL,
    CONSTRAINT [Job_pk] PRIMARY KEY NONCLUSTERED ([id] ASC)
);



