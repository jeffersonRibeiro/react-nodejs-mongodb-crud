const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


const config = require('./config');

const users = require('./routes/users');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(config.server.cors.whiteListDomains));

const db = config.mongoURI;

/* Connect to MongoDB */
mongoose
  .connect(db)
  .then(() => console.log('Connected to Database'))
  .catch(err => {
    throw Error(err)
  })

app.get('/', (req, res) => res.send('Hello!'));

app.use('/api/users', users);

app.listen(config.server.port, () => console.log(`Server running on port ${config.server.port}`));