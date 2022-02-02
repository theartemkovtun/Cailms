CREATE PROCEDURE [main].[procUpdateTransfer]
    @id uniqueidentifier,
    @name  NVARCHAR(256),
    @description NVARCHAR(MAX),
    @value FLOAT,
    @category NVARCHAR(256),
    @day INT,
    @month INT,
    @year INT,
    @type INT,
    @tags NVARCHAR(MAX)
AS
BEGIN
    DELETE FROM [main].[TransferTag] WHERE transferId = @Id;

    UPDATE [main].[Transfer]
    SET
        [name] = @name,
        [description] = @description,
        [value] = @value,
        [day] = @day,
        [month] = @month,
        [year] = @year,
        [type] = @type,
        [category] = @category
    WHERE [id] = @id;

    IF (@tags != '')
        BEGIN
            INSERT INTO [main].[TransferTag] (transferId, tag)
	        SELECT @id, value FROM STRING_SPLIT(@tags, ',');
        END

    SELECT @id;

END;