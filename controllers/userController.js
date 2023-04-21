'use strict';

const { createUser } = require('../data/users');
const userData = require('../data/users');
const { userAuth } = require('../data/users')

const getUsers = async (req, res, next) => {
    try {
        const users = await userData.getUsers();
        res.send(users);
    } catch(error){
        res.status(400).send(error.message);
    }
}

const addUser = async (req,res,next) => {
    try{
        const data = req.body;
        const created = await createUser(data);
        res.send(created);
    } catch(error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try{
        const loginNo = req.params.no;
        const deletedUser = await userData.deleteUser(loginNo);
        res.send(deletedUser);
    }catch(error){
        return error.message;
    }
}


const userAuthentication = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log('Username:', username, 'Password:', password);
        const result = await userAuth({ username, password });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Authentication failed' });
        
    }
}

const updateUser = async(req, res, next) => {
    try {
        const loginNo = req.params.no;
        const data = req.body;
        const updated = await userData.updateUser(loginNo, data);
        res.send(updated);

    } catch(error){
        res.status(400).send(error.message);
    }
}










module.exports = {
    getUsers,
    addUser,
    deleteUser,
    userAuthentication,
    updateUser,
}