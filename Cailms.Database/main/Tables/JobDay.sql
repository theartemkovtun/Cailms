CREATE TABLE [main].[JobDay] (
    [jobId] UNIQUEIDENTIFIER NOT NULL,
    [day]   INT              NOT NULL,
    CONSTRAINT [JobDay_pk] PRIMARY KEY NONCLUSTERED ([jobId] ASC, [day] ASC),
    CONSTRAINT [JobDay_Job_id_fk] FOREIGN KEY ([jobId]) REFERENCES [main].[Job] ([id]) ON DELETE CASCADE ON UPDATE CASCADE
);

