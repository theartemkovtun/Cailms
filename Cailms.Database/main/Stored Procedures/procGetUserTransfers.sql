CREATE PROCEDURE [main].[procGetUserTransfers]
    @email NVARCHAR(128),
    @page int = 1,
    @take int = 10,
    @startDate date,
    @endDate date,
    @categories nvarchar(max),
    @tags nvarchar(max),
    @type int
AS
BEGIN

    select
        cast(concat(t.year, '-', t.month, '-', t.day) as datetime) date,
        t.id,
        t.name,
        t.description,
        t.value value,
        t.type,
        t.category,
        t.createdOn,
        tt.tag
    into #transfers
    from main.Transfer t left join main.TransferTag tt on t.id = tt.transferId
    where t.email = @email and
          (@startDate is null or cast(concat(t.year, '-', t.month, '-', t.day) as datetime) >= @startDate) and
          (@endDate is null or cast(concat(t.year, '-', t.month, '-', t.day) as datetime) <= @endDate)  and
          (@categories is null or t.category in (select * from string_split(@categories, ','))) and
          (@tags is null or tt.tag in (select * from string_split(@tags, ','))) and
          (@type is null or t.type = @type)
    order by year desc,month desc,day desc, createdOn desc;

    select distinct id, value, type into #distinctTransfers  from #transfers;

    select
        distinct FORMAT(t1.date, 'dddd, dd MMMM yyyy')  date,
        t1.date unformatedDate,
        (select
                distinct t2.createdOn,
                t2.id,
                t2.name,
                t2.description,
                round(t2.value,2) value,
                t2.type,
                t2.category,
                JSON_QUERY((SELECT CONCAT('[',STRING_AGG(CONCAT('"', tt.tag, '"'), ','),']') FROM [TransferTag] tt where tt.transferId = t2.id and tt.tag is not null)) tags
                    from #transfers t2 where t2.date = t1.date order by t2.createdOn desc for json path) [transfers]
    into #joinedTransfers
    from #transfers t1
    order by t1.date desc
    offset (@page - 1) * @take rows fetch next @take rows only;

    select
    (select iif(count(distinct date) > @page * @take, 1, 0) from #transfers) IsMore,
    JSON_QUERY((select (select round(sum(value),2) from #distinctTransfers where type = 1) outcome, (select round(sum(value),2) from #distinctTransfers where type = 2) income for json path, WITHOUT_ARRAY_WRAPPER)) [total],
    (select date, JSON_QUERY(transfers) transfers from #joinedTransfers for json path) Items
    for json path, without_array_wrapper;

    drop table #transfers;
    drop table #distinctTransfers;
    drop table #joinedTransfers

END;