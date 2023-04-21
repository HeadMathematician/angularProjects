'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');


const getDepartments = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const list = await pool.request().query(sqlQueries.departmentList);
        return list.recordset;
    } catch (error){
        return error.message;
    }
}

const createDepartment = async (departmentData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const insertDepartment = await pool.request().input('departmentNo', sql.Int, departmentData.departmentNo)
                                                   .input('departmentName', sql.NVarChar(20), departmentData.departmentName)
                                                   .input('departmentLocation', sql.NVarChar(20), departmentData.departmentLocation)
                                                   .query(sqlQueries.createDepartment);
        return insertDepartment.recordset;
    } catch(error){
        return error.message;
    }
}

const deleteDepartment = async(departmentNo) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const deleted = await pool.request().input('departmentNo', sql.Int, departmentNo).query(sqlQueries.deleteDepartment);
        return deleted.recordset;
    }catch (error){
        return error.message;
    }
}


const updateDepartment = async(departmentNo, departmentData) =>{
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('departments');
        const update = await pool.request()
                            .input('departmentNo_Id', sql.Int, departmentNo)
                            .input('departmentNo', sql.Int, departmentData.departmentNo)
                            .input('departmentName', sql.NVarChar(20), departmentData.departmentName)
                            .input('departmentLocation', sql.NVarChar(20), departmentData.departmentLocation)
                            .query(sqlQueries.updateDepartment);
        return update.recordset;
    } catch(error){
        return error.message;
    }
}


module.exports = {
    getDepartments,
    createDepartment,
    deleteDepartment,
    updateDepartment,
}