const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');

const config = require('./config');
const users = require('./routes/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(config.server.cors.whiteListDomains));

const db = config.database.mongoURI;

mongoose.connect(db)
  .then(() => console.log('Connected to Database'))
  .catch(err => {
    throw new Error(err)
  });

app.use(passport.initialize());

require('./config/passport')(passport);

app.use('/api/users', users);

app.listen(config.server.port, () => {
  console.log(`Server running on port ${config.server.port}`);
});