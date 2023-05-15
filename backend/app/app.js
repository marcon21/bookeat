var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mountRoutes = require("./routes");

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

mountRoutes(app);

// const swaggerJsdoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

// const options = {
//   definition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Hello World',
//       version: '1.0.0',
//     },
//   },
//   apis: ['./routes/*.js'], // files containing annotations as above
// };

// const openapiSpecification = swaggerJsdoc(options);
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
