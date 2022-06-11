const path = require('path');
const express = require('express');
const cors = require('cors')
const app = express();

const apiRouter = require('./routes/api');

const PORT = 3000;

/**
 * handle parsing request body
 */
 app.use(cors());
 app.use(express.json());
 app.use(express.urlencoded({ extended: true }));

/**
 * define route handlers
 */
app.use('/api', apiRouter);

app.use('*', (req, res) => res.status(404).send('Woops! Page not found!'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

/**
 * start server
 */
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}...`);
});

module.exports = app;