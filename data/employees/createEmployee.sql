INSERT INTO [dbo].[EMPLOYEE]
    (
        [employeeNo],
        [employeeName],
        [salary],
        [departmentNo]
    )
VALUES (
    @employeeNo,
    @employeeName,
    @salary,
    @departmentNo
)