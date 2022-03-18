CREATE PROCEDURE [main].[procAddJob]
    @jobName NVARCHAR(128),
    @email NVARCHAR(128),
    @name  NVARCHAR(256),
    @description NVARCHAR(MAX),
    @value float,
    @type int,
    @category NVARCHAR(256),
    @tags NVARCHAR(MAX),
    @days NVARCHAR(MAX)
AS
DECLARE @JobIdTable TABLE (Id UNIQUEIDENTIFIER);
DECLARE @JobId UNIQUEIDENTIFIER;
BEGIN

	INSERT INTO [main].[Job] ([jobName], [email], [name], [description], [value], [type], [category], [tags])
	OUTPUT inserted.id INTO @JobIdTable
	VALUES (@jobName, @email, @name, @description, @value, @type, @category, @tags)

    SELECT  @JobId = [Id] FROM @JobIdTable;

    INSERT INTO [main].[JobDay] (jobId, day)
        SELECT @JobId, value from string_split(@days, ',');

END;