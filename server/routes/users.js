const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

const User = require('../models/Users');
const config = require('../config');


const router = express.Router();

/* 
  @route  /api/users/register
  @desc   Register users
  @access public
*/
router.post('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!user) {
        const profile = gravatar.url(req.body.email, {
          s: 200, // size
          r: 'pg', // ratings
          d: 'mm', // default
        })

        const newUser = User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
          profile,
        });

        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if(err) throw new Error(err);

          newUser.password = hash;
          newUser.save()
            .then(user => res.json({
              status: true,
              message: 'User created succesfully',
            }))
            .catch(err => {
              throw new Error(err)
            });
        });

      } else {
        return res.json({
          status: false,
          message: 'Email already exists',
        });        
      }
    });
});

/* 
  @route  /api/users/login
  @desc   Login users
  @access public
*/

router.post('/login', (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {

      /* Email not found */
      if(!user) {
        return res.json({
          status: false,
          message: 'User not found',
        });
      }

      /* Check if password is correct */
      bcrypt.compare(password, user.password).then(isMatch => {
        if(!isMatch) {
          return res.json({
            status: false,
            message: 'Password is incorrect',
          });
        }

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
        }

        jwt.sign(payload, config.auth.secretOrKey, { expiresIn: 3600 }, (err, token) => {
          if(err) throw new Error(err);
          
          res.json({
            status: true,
            ...payload,
            token: `Bearer ${token}`, 
          });
        });
        
      });
    });
});

/* 
  @route  /api/users/current
  @desc   Return current User
  @access private
*/
router.use('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});




module.exports = router;