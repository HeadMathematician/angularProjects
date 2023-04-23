INSERT INTO [dbo].[loginData]
    (
        [loginNo],
        [loginUserName],
        [loginPassword],
        [authMethod]
    )
VALUES (
    @loginNo,
    @loginUserName,
    @loginPassword,
    @authMethod
)