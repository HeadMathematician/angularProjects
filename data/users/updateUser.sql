UPDATE [dbo].[loginData]
SET [loginNo]=@loginNo
    ,[loginUserName]=@loginUserName
    ,[authMethod]=@authMethod
WHERE [loginNo]=@loginNo_Id

SELECT *
FROM [dbo].[loginData]
WHERE [loginNo]=@loginNo

