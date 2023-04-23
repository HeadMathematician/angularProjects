'use strict';

const utils = require('../utils');
const config = require('../../config');
const sql = require('mssql');
const jwt = require('jsonwebtoken');



const getUsers = async () => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const list = await pool.request().query(sqlQueries.usersList);
        return list.recordset;
    } catch (error){
        return error.message;
    }
}

const createUser = async (loginData) => {
    try {
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const insertUser = await pool.request().input('loginNo', sql.Int, loginData.loginNo)
                                               .input('loginUserName', sql.NVarChar(20), loginData.loginUserName)
                                               .input('loginPassword', sql.NVarChar(20), loginData.loginPassword)
                                               .input('authMethod', sql.NVarChar(20), loginData.authMethod)
                                               .query(sqlQueries.createUser);
        return insertUser.recordset;
    } catch(error){
        return error.message;
    }
}

const deleteUser = async(loginNo) => {
    try{
        let pool = await sql.connect(config.sql);
        const sqlQueries = await utils.loadSqlQueries('users');
        const deleted = await pool.request().input('loginNo', sql.Int, loginNo).query(sqlQueries.deleteUser);
        return deleted.recordset;
    }catch (error){
        return error.message;
    }
}


const updateUser = async(loginNo, userData) =>{
  try{
      let pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries('users');
      const update = await pool.request()
                          .input('loginNo_Id', sql.Int, loginNo)
                          .input('loginNo', sql.Int, userData.loginNo)
                          .input('loginUserName', sql.NVarChar(20), userData.loginUserName)
                          .input('authMethod', sql.NVarChar(20), userData.authMethod)
                          .query(sqlQueries.updateUser);
      return update.recordset;
  } catch(error){
      return error.message;
  }
}


const userAuth = async (loginData) => {
  try {
    const { username, password } = loginData;

    let pool = await sql.connect(config.sql);
    const sqlQueries = await utils.loadSqlQueries('users');
    const result = await pool.request().input('loginUserName', sql.NVarChar(20), loginData.loginUserName).query(sqlQueries.usersList);
    let user = null;
    for (let i = 0; i < result.recordset.length; i++) {
      if (result.recordset[i].loginUserName === username) {
        user = result.recordset[i];
        break;
      }
    }
    
    if (!user) {
      throw new Error('User not found');
    }
    if (user.loginPassword !== password) {
      throw new Error('Invalid password');
    }
    
    console.log('User successfully authenticated');

    const accessToken = jwt.sign({ username }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ username }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new Error('Authentication failed');
  }
};


// Facebook authentication handler






  
module.exports = {
    getUsers,
    createUser,
    deleteUser,
    userAuth,
    updateUser,
    
}