CREATE PROCEDURE [main].[procGetJob]
    @id uniqueidentifier
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
    from [main].[Job] where [id] = @id order by createdOn for json path, without_array_wrapper;

END;