UPDATE [dbo].[Department]
SET [departmentNo]=@departmentNo
    ,[departmentName]=@departmentName
    ,[departmentLocation]=@departmentLocation

WHERE [departmentNo]=@departmentNo_Id

SELECT [departmentNo]
      ,[departmentName]
      ,[departmentLocation]
FROM [dbo].[Department]
WHERE [departmentNo]=@departmentNo

