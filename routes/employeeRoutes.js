'use strict';

const express = require('express');
const employeeController = require('../controllers/employee.Controller');
const router = express.Router();

const {getEmployees, addEmployee, deleteEmployee, updateEmployee} = employeeController;


router.get('/employees', getEmployees);
router.post('/employee', addEmployee);
router.delete('/employee/:no', deleteEmployee);
router.put('/employee/:no', updateEmployee)

module.exports = {
    routes: router
}