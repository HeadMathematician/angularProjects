'use strict';

const { createUser } = require('../data/users');
const userData = require('../data/users');
const express = require('express');
const { userAuth } = require('../data/users')
const jwt = require('jsonwebtoken');
const passport = require('passport');
const axios = require('axios');

const router = express.Router();


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

const facebookAuthHandler = async (req, res) => {
    try {
      
      const { data } = await axios.get('https://graph.facebook.com/v11.0/oauth/access_token', {
        params: {
          client_id: process.env.FACEBOOK_APP_ID,
          client_secret: process.env.FACEBOOK_APP_SECRET,
          redirect_uri: process.env.FACEBOOK_CALLBACK_URL,
          code: req.query.code,
        },
      });
  
      const profileResponse = await axios.get('https://graph.facebook.com/v11.0/me', {
        params: {
          fields: 'id,email',
          accessToken: data.access_token,
        },
      });
      const profile = profileResponse.data;
  
      const pool = await sql.connect(config.sql);
      const sqlQueries = await utils.loadSqlQueries('users');
      const result = await pool.request().input('loginUserName', sql.NVarChar(20), profile.email).query(sqlQueries.getUserByUsername);
      let user = null;
      if (result.recordset.length > 0) {
        user = result.recordset[0];
      }
  
      if (!user) {
        const createUserResult = await pool.request()
          .input('loginNo', sql.NVarChar(20), profile.id)
          .input('loginUserName', sql.NVarChar(20), profile.email)
          .input('loginPassword', sql.NVarChar(255), null)
          .input('authMethod', sql.NVarChar(20), 'facebook')
          .query(sqlQueries.createUser);
        user = createUserResult.recordset[0];
      }
  
      const accessToken = jwt.sign({ userId: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
      const refreshToken = jwt.sign({ userId: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
  
      res.json({ accessToken, refreshToken, user });
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: 'Facebook authentication failed' });
    }
  };
  

  router.get('/', passport.authenticate('facebook', { scope: 'email' }));

    router.get(
    '/callback',
    passport.authenticate('facebook', {
        failureRedirect: '/auth/facebook/error',
    }),
    function (req, res) {
        
        res.redirect('/auth/facebook/success');
    }
    );

    router.get('/success', async (req, res) => {
    const userInfo = {
        id: req.session.passport.user.id,
        displayName: req.session.passport.user.displayName,
        provider: req.session.passport.user.provider,
    };
    res.render('fb-github-success', { user: userInfo });
    });

    router.get('/error', (req, res) => res.send('Error logging in via Facebook..'));

    router.get('/signout', (req, res) => {
    try {
        req.session.destroy(function (err) {
        console.log('session destroyed.');
        });
        res.render('auth');
    } catch (err) {
        res.status(400).send({ message: 'Failed to sign out fb user' });
    }
    });

module.exports = router;


module.exports = {
    getUsers,
    addUser,
    deleteUser,
    userAuthentication,
    updateUser,
    facebookAuthHandler,
}