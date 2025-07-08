const http = require('http');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const rateLimit = require('express-rate-limit');
const compress = require('compression');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');

const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const error = require('../api/middlewares/error');

// Express instance
const app = express();
const server = http.createServer(app);

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attach to req.body
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS
app.use(cors());


// mount API routes
app.use('/v1', routes);

// handle errors
app.use(error.converter);
app.use(error.notFound);
app.use(error.handler);

module.exports = server;
