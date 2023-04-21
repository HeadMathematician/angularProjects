'use strict';

const employeeData = require('../data/employees');
const { prettyTable } = require('../data/utils');
const { createEmployee } = require('../data/employees');


const getEmployees = async (req, res, next) => {
    try {
        const employees = await employeeData.getEmployees();
        console.log(prettyTable(employees));
        res.send(employees);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const addEmployee = async (req,res,next) => {
    try{
        const data = req.body;
        const created = await createEmployee(data);
        res.send(created);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const deleteEmployee = async (req, res, next) => {
    try{
        const employeeNo = req.params.no;
        const deletedEmployee = await employeeData.deleteEmployee(employeeNo);
        res.send(deletedEmployee);
    }catch(error){
        return error.message;
    }
}


const updateEmployee = async(req, res, next) => {
    try {
        const employeeNo = req.params.no;
        const data = req.body;
        const updated = await employeeData.updateEmployee(employeeNo, data);
        res.send(updated);

    } catch(error){
        res.status(400).send(error.message);
    }
}


module.exports = {
    getEmployees,
    addEmployee,
    deleteEmployee,
    updateEmployee,
}