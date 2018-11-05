const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.jwtSign = (payload) => {
  const {
    SESSION_EXPIRES_IN,
    AUTH_SECRET_OR_KEY
  } = process.env;

  return new Promise((resolve, reject) => {
    jwt.sign(payload, AUTH_SECRET_OR_KEY, { expiresIn: SESSION_EXPIRES_IN }, (err, token) => {
      if(err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  })
}

exports.bcryptHash = (str) => {
  const salt = 10;

  return new Promise((resolve, reject) => {
    bcrypt.hash(str, salt, (err, hash) => {
      if(err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}