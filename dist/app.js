'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use('/', routes);
app.use(cors());
// app.options('*', cors());

// app.use((err, req, res, next) => {
//     res.json(err);
// });

module.exports = app;
//# sourceMappingURL=app.js.map