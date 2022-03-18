CREATE PROCEDURE [main].[procToggleJobStatus]
    @id UNIQUEIDENTIFIER
AS
BEGIN

    UPDATE [main].[Job]
    SET [isActive] = IIF([isActive] = 1, 0, 1)
    WHERE [id] = @Id;

END;