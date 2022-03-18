CREATE PROCEDURE [main].[procUpdateJob]
    @id UNIQUEIDENTIFIER,
    @jobName NVARCHAR(128),
    @name  NVARCHAR(256),
    @description NVARCHAR(MAX),
    @value float,
    @type int,
    @category NVARCHAR(256),
    @tags NVARCHAR(MAX),
    @days NVARCHAR(MAX)
AS
BEGIN

    UPDATE [main].[Job]
    SET
        [jobName] = @jobName,
        [name] = @name,
        [description] = @description,
        [value] = @value,
        [type] = @type,
        [category] = @category,
        [tags] = @tags
    WHERE
        [Id] = @id;

    DELETE FROM [main].[JobDay] WHERE [jobId] = @Id;

    INSERT INTO [main].[JobDay] (jobId, day)
        SELECT @Id, value from string_split(@days, ',');

END;