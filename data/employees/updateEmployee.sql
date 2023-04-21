UPDATE [dbo].[EMPLOYEE]
SET [employeeNo]=@employeeNo
    ,[employeeName]=@employeeName
    ,[salary]=@salary
    ,[departmentNo]=@departmentNo

WHERE [employeeNo]=@employeeNo_Id

SELECT [employeeNo]
      ,[employeeName]
      ,[salary]
      ,[departmentNo]
FROM [dbo].[EMPLOYEE]
WHERE [employeeNo]=@employeeNo

