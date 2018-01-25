'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');

var app = express();

app.use(bodyParser.json());
app.use('/', routes);

app.use(function (err, req, res, next) {
  res.json(err);
});

module.exports = app;
//# sourceMappingURL=app.js.map