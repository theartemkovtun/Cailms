CREATE PROCEDURE [main].[procGetUserJobs]
    @email NVARCHAR(128),
    @sortColumn NVARCHAR(100) = 'CreatedOn',
    @sortOrder INT = 1
AS
BEGIN

    select
        id,
        jobName,
        name,
        description,
        value,
        type,
        category,
        isActive,
        JSON_QUERY((select CONCAT('[',STRING_AGG(CONCAT('"', value, '"'), ','),']') from STRING_SPLIT(tags, ','))) tags,
        JSON_QUERY((select CONCAT('[',STRING_AGG(jd.day, ','),']') from main.JobDay jd where jd.jobId = [Id])) days
    from [main].[Job]
    where [email] = @email
    ORDER BY
        CASE WHEN @sortOrder = 1 THEN
            CASE @sortColumn
                WHEN 'Name' THEN CAST([jobName] AS NVARCHAR(255)) 
                WHEN 'CreatedOn' THEN CAST([createdOn] AS NVARCHAR(19)) 
            END
        END,
            CASE WHEN @sortOrder = 2 THEN
            CASE @sortColumn
                WHEN 'Name' THEN CAST([jobName] AS NVARCHAR(255)) 
                WHEN 'CreatedOn' THEN CAST([createdOn] AS NVARCHAR(19)) 
            END
        END DESC
    for json path;

END;