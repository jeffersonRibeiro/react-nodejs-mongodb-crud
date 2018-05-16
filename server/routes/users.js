const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../models/Users');


const router = express.Router();

/* 
  @route  /api/users/test
  @desc   Tests users api
  @access public
*/
router.use('/test', (req, res) => {
  res.json({
    msg: 'User API working',
  });
});

/* 
  @route  /api/users/register
  @desc   Register users
  @access public
*/
router.use('/register', (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(!!user) {
        return res.status(400).json({email: 'Email already exists'});
      } else {
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

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;

            newUser.password = hash;
            newUser.save()
              .then(user => res.json(user))
              .catch(err => {
                throw err
              });
          });
        });
      }
    });
});

module.exports = router;