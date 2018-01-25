'use strict';

var _require = require('express'),
    Router = _require.Router;

var pool = require('../db');

var router = Router();

router.get('/', function (request, response, next) {
  pool.query('SELECT * FROM voltage ORDER BY id ASC', function (err, res) {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post('/', function (request, response, next) {
  var _request$body = request.body,
      level = _request$body.level,
      amount = _request$body.amount;


  pool.query('INSERT INTO voltage(level, amount) VALUES($1, $2)', [level, amount], function (err, res) {
    if (err) return next(err);

    response.redirect('/voltage');
  });
});

module.exports = router;
//# sourceMappingURL=voltage.js.map