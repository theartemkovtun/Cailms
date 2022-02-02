CREATE PROCEDURE [main].[procGetUserPeriodStatistics]
    @email NVARCHAR(128),
    @month INT,
    @year INT
AS
BEGIN

    if (@month is not null)
    begin
        select cast(m.number as nvarchar(2)) label, iif(ds.outcome is null, 0, ds.outcome) outcome, iif(ds.income is null, 0, ds.income) income from main.MonthDay m left join (
            select d.day day, round(sum(outcome),2) outcome, round(sum(income),2) income from (
                select day, iif(type = 1 ,value, 0) outcome, iif(type = 2 ,value, 0) income from [main].[Transfer] where month = @month and year = @year and email = @email
            ) d group by d.day
        ) ds on m.number = ds.day for json path;
    end
    else
    begin
        select m.name label, iif(ds.outcome is null, 0, ds.outcome) outcome, iif(ds.income is null, 0, ds.income) income from main.Month m left join (
            select d.month month, round(sum(outcome),2) outcome, round(sum(income),2) income from (
                select month, iif(type = 1 ,value, 0) outcome, iif(type = 2 ,value, 0) income from [main].[Transfer] where year = @year and email = @email
            ) d group by d.month
        ) ds on m.number = ds.month for json path;
    end


END;