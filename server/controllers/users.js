const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const moment = require('moment');


const config = require('../config');
const User = require('../models/Users');

function register(req, res) {
  User.findOne({ email: req.body.email })
    .then(user => {
      if(user) {
        return res.json({
          status: 'EMAIL_ALREADY_EXISTS',
          message: 'Email já existe',
        });
      }
      
      const profile = gravatar.url(req.body.email, {
        s: 200, // size
        r: 'pg', // ratings
        d: 'mm', // default
      })

      const newUser = User({
        name: req.body.name,
        email: req.body.email,
        birthDate: moment(req.body.birthDate, 'DD/MM/YYYY'),
        password: req.body.password,
        profile,
      });

      bcrypt.hash(newUser.password, 10, (err, hash) => {
        if(err) throw new Error(err);

        newUser.password = hash;
        newUser.save()
          .then(user => res.json({
            status: true,
            message: 'Usuário criado com sucesso!',
          }))
          .catch(err => {
            throw new Error(err)
          });
      });
    });
}

function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({email})
    .then(user => {
      /* Email not found */
      if(!user) {
        return res.json({
          status: 'USER_NOT_FOUND',
          message: 'Usuário não encontrado',
        });
      }

      /* Check if password is correct */
      bcrypt.compare(password, user.password).then(isMatch => {
        if(!isMatch) {
          return res.json({
            status: 'PASSWORD_INCORRECT',
            message: 'Senha incorreta',
          });
        }

        const payload = {
          id: user.id,
          name: user.name,
          email: user.email,
          profile: user.profile,
          birthDate: user.birthDate,
          createdDate: user.createdDate,
          updatedDate: user.updatedDate,
        }

        jwt.sign(payload, config.auth.secretOrKey, { expiresIn: '1h' }, (err, token) => {
          if(err) throw new Error(err);
          
          res.json({
            status: true,
            message: 'Login efeito com sucesso!',
            ...payload,
            token: `Bearer ${token}`,
          });
        });
      });
    });
}

function update(req, res) {
  const { email } = req.user;
  const { authorization } = req.headers;
  const formData = {
    name: req.body.name,
    birthDate: moment(req.body.birthDate, 'DD/MM/YYYY'),
    updatedDate: req.body.updatedDate,
  }

  const opts = {
    new: true,
  }

  User.findOneAndUpdate({ email }, { $set: formData }, opts)
    .then(user => {
      const { name, email, profile, birthDate, createdDate, updatedDate } = user;
      const payload = {
        name,
        email,
        profile,
        birthDate,
        createdDate,
        updatedDate,
      }

      res.json({
        ...payload,
        token: authorization,
      });
    });
}

function userDelete(req, res) {
  const { email } = req.user;

  User.findOneAndRemove({ email })
    .then(() => {
      res.json({
        status: 'ACCOUNT_DELETED',
        message: 'Conta deletada com sucesso!',
      })
    });
}

const getUserList = (req, res) => {
  User.find({}, (err, users) => {
    res.send(users);  
  });
}

module.exports = {
  register,
  login,
  update,
  userDelete,
  getUserList
}