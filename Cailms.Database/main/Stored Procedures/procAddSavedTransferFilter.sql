CREATE PROCEDURE [main].[procAddSavedTransferFilter]
    @name  NVARCHAR(256),
    @email NVARCHAR(128),
    @type int,
    @startDate DATE,
    @endDate DATE,
    @categories NVARCHAR(MAX),
    @tags NVARCHAR(MAX)
AS
BEGIN

	INSERT INTO [main].[SavedTransfersFilters] (name, [email], [type], [startDate], [endDate], [categories], [tags])
	VALUES (@name, @email, @type, @startDate, @endDate, @categories, @tags)

END;