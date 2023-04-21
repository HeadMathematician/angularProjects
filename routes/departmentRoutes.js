'use strict';

const express = require('express');
const departmentController = require('../controllers/departmentController');
const router = express.Router();

const {getDepartments, addDepartment, deleteDepartment, updateDepartment} = departmentController;


router.get('/departments', getDepartments);
router.post('/department', addDepartment);
router.delete('/department/:no', deleteDepartment);
router.put('/department/:no', updateDepartment)

module.exports = {
    routes: router
}