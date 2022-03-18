CREATE PROCEDURE [main].[procRunTodayJobs]
AS
DECLARE @TransfersCursor CURSOR,
    @Today date,
    @TodayDay int,
    @IsTodayEndOfMonth bit,
    @Email nvarchar(256),
    @Name nvarchar(256),
    @Description nvarchar(max),
    @Value float,
    @Type int,
    @Day int,
    @Month int,
    @Year int,
    @Category nvarchar(128),
    @Tags nvarchar(max)
BEGIN

    SET @Today = GetDate()
    SET @TodayDay = DAY(@Today)
    SET @IsTodayEndOfMonth = IIF(@Today = EOMONTH(@Today), 1, 0)

    SELECT distinct [JD].[jobId] [JobId]
    INTO #JobsToRun
    FROM [main].[JobDay] [JD]
    WHERE (@IsTodayEndOfMonth = 1 AND [JD].[day] >= @TodayDay) OR (@IsTodayEndOfMonth = 0 AND [JD].[day] = @TodayDay);


    SET @TransfersCursor = CURSOR FOR
    SELECT
           j.email,
           j.name,
           j.description,
           j.value,
           j.type,
           @TodayDay day,
           MONTH(@Today) month,
           YEAR(@Today) year,
           j.category,
           j.tags tags
    FROM [main].[Job] [J] WHERE [id] IN (SELECT [JobId] FROM #JobsToRun) AND [isActive] = 1;

    OPEN @TransfersCursor
    FETCH NEXT FROM @TransfersCursor INTO @Email, @Name, @Description, @Value, @Type, @Day, @Month, @Year, @Category, @Tags

    WHILE @@FETCH_STATUS = 0
    BEGIN

        EXEC [main].[procAddTransfer] @Name, @Description, @Email, @Value, @Category, @Day, @Month, @Year, @Type, @Tags

        FETCH NEXT FROM @TransfersCursor INTO @Email, @Name, @Description, @Value, @Type, @Day, @Month, @Year, @Category, @Tags
    END;

    CLOSE @TransfersCursor;
    DEALLOCATE @TransfersCursor;

    DROP TABLE #JobsToRun;
END