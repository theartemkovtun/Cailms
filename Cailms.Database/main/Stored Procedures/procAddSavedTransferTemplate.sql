CREATE PROCEDURE [main].[procAddSavedTransferTemplate]
    @templateName NVARCHAR(128),
    @email NVARCHAR(128),
    @name  NVARCHAR(256),
    @description NVARCHAR(MAX),
    @value float,
    @type int,
    @category NVARCHAR(256),
    @tags NVARCHAR(MAX)
AS
BEGIN

	INSERT INTO [main].[SavedTransferTemplate] ([templateName], [email], [name], [description], [value], [type], [category], [tags])
	VALUES (@templateName, @email, @name, @description, @value, @type, @category, @tags)

END;