const express = require('express');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const User = require('../models/Users');


const router = express.Router();

/* 
  @route  /api/users/register
  @desc   Register users
  @access public
*/
router.use('/register', (req, res) => {
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

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
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
        });

      } else {
        return res.status(409).json({
          status: false,
          message: 'Email already exists',
        });        
      }
    });
});

module.exports = router;