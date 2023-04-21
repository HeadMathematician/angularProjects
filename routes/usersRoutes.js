'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

const {getUsers, addUser, deleteUser, userAuthentication, updateUser} = userController;


router.get('/users', getUsers);
router.post('/user', addUser);
router.post('/authentication', userAuthentication)
router.delete('/user/:no', deleteUser);
router.put('/user/:no', updateUser)

module.exports = {
    routes: router
}