'use strict';
const Express = require('express');
const Logger = require('morgan');
const Fs = require('fs');
const Path = require('path');
const BodyParser = require('body-parser');
const Axios = require('axios');

//Config
const PORT = process.env.PORT || 4000;
const LOG_FILE = 'logs/access.log';
const API = process.env.API;

const app = Express();
const accessLogStream = Fs.createWriteStream(Path.join(__dirname, LOG_FILE), {flags: 'a'})

// Logger
app.use(Logger('dev', { stream: accessLogStream }));

app.use('/dist', Express.static(Path.join(__dirname, '../dist')));

// Authenticate user
app.post('/auth', BodyParser.json(), (req, res) => {
  Axios.post(`${API}/auth`, {
    username: req.body.username,
    password: req.body.password
  })
  .then(function (response) {
    return res.json({ code: 'ok', body: response.data.data });
  })
  .catch(function (error) {
      return res.json({ code: 'error', error: error.toString() });
  });
});

app.use('/', (req, res) => {
  return res.sendFile(Path.join(__dirname,'../public/index.html'));
});

app.listen(PORT, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Server, listening on port: ${PORT}`);
})

