SET NOCOUNT ON

SET IDENTITY_INSERT [main].[Category] ON

MERGE [project].[Category] AS target
USING ( VALUES
        ('Housing', '#42A5F5'),
        ('Transportation', '#66BB6A'),
        ('Food', '#FFA726'),
        ('Utilities', '#8142F5'),
        ('Health', '#F54242'),
        ('Savings', '#585858'),
        ('Personal', '#4842F5'),
        ('Education', '#A1A1A1'),
        ('Entertainment', '#42A5F5'),
        ('Tech', '#42A5F5'),
        ('Other', '#CFD602')
      ) AS source ( Name, Color)
ON (target.[Name] = source.[Name])
WHEN NOT MATCHED BY TARGET THEN
    INSERT
        ( [Name], [Color] )
    VALUES
        ( source.Name, source.Color);

SET IDENTITY_INSERT [main].[Category] OFF

SET NOCOUNT OFF
GO
