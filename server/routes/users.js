const express = require('express');
const passport = require('passport');

const usersControllers = require('../controllers/users');

const router = express.Router();

/* 
  @route  /api/users/register
  @desc   Register users
  @access public
*/
router.post('/register', usersControllers.register);

/* 
  @route  /api/users/login
  @desc   Login users
  @access public
*/
router.post('/login', usersControllers.login);

/* 
  @route  /api/users/update
  @desc   Update profile information
  @access private
*/
router.put('/update',
  passport.authenticate('jwt', { session: false }),
  usersControllers.update,
);

/* 
  @route  /api/users/delete
  @desc   Delete account
  @access private
*/
router.delete('/delete',
  passport.authenticate('jwt', { session: false }),
  usersControllers.userDelete,
);

/* 
  @route  /api/users/all
  @desc   Get all users
  @access private
*/
router.get('/all',
  passport.authenticate('jwt', { session: false }),
  usersControllers.getUserList,
);

module.exports = router;