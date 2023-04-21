'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getEmployees = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const list = await pool.request().query(sqlQueries.employeeList);
        return list.recordset;
    } catch (error){
        return error.message;
    }
}


const createEmployee = async (employeeData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const insertEmployee = await pool.request().input('employeeNo', sql.Int, employeeData.employeeNo)
                                                   .input('employeeName', sql.NVarChar(20), employeeData.employeeName)
                                                   .input('salary', sql.Int, employeeData.salary)
                                                   .input('departmentNo', sql.Int, employeeData.departmentNo)
                                                   .query(sqlQueries.createEmployee);
        return insertEmployee.recordset;
    } catch(error){
        return error.message;
    }
}

const deleteEmployee = async(employeeNo) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const deleted = await pool.request().input('employeeNo', sql.Int, employeeNo).query(sqlQueries.deleteEmployee);
        return deleted.recordset;
    }catch (error){
        return error.message;
    }
}


const updateEmployee = async(employeeNo, employeeData) =>{
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('employees');
        const update = await pool.request()
                            .input('employeeNo_Id', sql.Int, employeeNo)
                            .input('employeeNo', sql.Int, employeeData.employeeNo)
                            .input('employeeName', sql.NVarChar(20), employeeData.employeeName)
                            .input('salary', sql.Int, employeeData.salary)
                            .input('departmentNo', sql.Int, employeeData.departmentNo)
                            .query(sqlQueries.updateEmployee);
        return update.recordset;
    } catch(error){
        return error.message;
    }
}


module.exports = {
    getEmployees,
    createEmployee,
    deleteEmployee,
    updateEmployee,
}