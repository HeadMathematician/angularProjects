'use strict';



const { createDepartment } = require('../data/departments');
const departmentData = require('../data/departments');

const getDepartments = async (req, res, next) => {
    try {
        const departments = await departmentData.getDepartments();
        res.send(departments);
    } catch(error){
        res.status(400).send(error.message);
    }
}


const addDepartment = async (req,res,next) => {
    try{
        const data = req.body;
        const created = await createDepartment(data);
        res.send(created);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const deleteDepartment = async (req, res, next) => {
    try{
        const departmentNo = req.params.no;
        const deletedDepartment = await departmentData.deleteDepartment(departmentNo);
        res.send(deletedDepartment);
    }catch(error){
        return error.message;
    }
}

const updateDepartment = async(req, res, next) => {
    try {
        const departmentNo = req.params.no;
        const data = req.body;
        const updated = await departmentData.updateDepartment(departmentNo, data);
        res.send(updated);

    } catch(error){
        res.status(400).send(error.message);
    }
}

module.exports = {
    getDepartments,
    addDepartment,
    deleteDepartment,
    updateDepartment,
}