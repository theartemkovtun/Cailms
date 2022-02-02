CREATE PROCEDURE [main].[procGetUserStatistics]
    @email NVARCHAR(128),
    @month INT,
    @year INT
AS
BEGIN

    select id, value, category into #outcome from [main].[Transfer]where (@month is null or month = @month)and year = @year and email = @email and type = 1;
    select id, value into #income from [main].[Transfer] where (@month is null or month = @month)  and year = @year and email = @email and type = 2;

    select
        JSON_QUERY((select (select round(sum(value),2) from #outcome) outcome, (select round(sum(value),2) from #income) income for json path, WITHOUT_ARRAY_WRAPPER)) [total],
        (select c.name category, round(sum(o.value),2) spent, c.color from #outcome o join main.Category c on o.category = c.name group by c.name, c.color order by spent desc for json path) [categories]
    for json path, without_array_wrapper;

    drop table #outcome;
    drop table #income;

END;