CREATE PROCEDURE [main].[procAddTransfer]
    @name  NVARCHAR(256),
    @description NVARCHAR(MAX),
    @email NVARCHAR(128),
    @value FLOAT,
    @category NVARCHAR(256),
    @day INT,
    @month INT,
    @year INT,
    @type INT,
    @tags NVARCHAR(MAX)
AS
BEGIN
    DECLARE @TransferId TABLE (Id UNIQUEIDENTIFIER)

	INSERT INTO [main].[Transfer] (name, [description], [email], value, [day], [month], [year], [type], [category])
	OUTPUT INSERTED.Id INTO @TransferId
	VALUES (@name, @description, @email, @value, @day, @month, @year, @type, @category)

    IF (@tags != '')
        BEGIN
            INSERT INTO [main].[TransferTag] (transferId, tag)
	        SELECT Id, value FROM @TransferId CROSS JOIN STRING_SPLIT(@tags, ',');
        END

    SELECT Id from @TransferId;

END;