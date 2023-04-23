'use strict';

const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();
const jwt = require('jsonwebtoken');


const {getUsers, addUser, deleteUser, userAuthentication, updateUser, facebookAuthHandler} = userController;



router.get('/users', getUsers);
router.post('/user', addUser);
router.post('/authentication', userAuthentication)
router.delete('/user/:no', deleteUser);
router.put('/user/:no', updateUser),
router.get('/facebook', facebookAuthHandler)
router.get('/auth/facebook', facebookAuthHandler);
router.get('/auth/facebook/callback', facebookAuthHandler);




module.exports = {
    routes: router
}