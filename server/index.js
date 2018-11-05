require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const usersAPI = require('./components/users/usersAPI');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(process.env.CORS_WHITELIST_DOMAINS.split(',')));

const db = process.env.DATABASE;

mongoose.connect(db)
  .then(() => console.log('Connected to Database'))
  .catch(err => {
    throw new Error(err)
  });

app.use(passport.initialize());

require('./components/users/usersPassport')(passport);

app.use('/api/users', usersAPI);

app.listen(process.env.API_PORT, () => {
  console.log(`Server running on port ${process.env.API_PORT}`);
});