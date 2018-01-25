'use strict';

var _require = require('express'),
    Router = _require.Router;

var pool = require('../db');

var router = Router();

router.get('/', function (request, response, next) {
  console.log('inside get');
  pool.query('SELECT * FROM light ORDER BY id ASC', function (err, res) {
    console.log(err);
    if (err) return next(err);

    console.log(res.rows);
    response.json(res.rows);
  });
});

router.post('/', function (request, response, next) {
  var _request$body = request.body,
      level = _request$body.level,
      amount = _request$body.amount;


  pool.query('INSERT INTO light(level, amount) VALUES($1, $2)', [level, amount], function (err, res) {
    if (err) return next(err);

    response.redirect('/light');
  });
});

module.exports = router;
//# sourceMappingURL=light.js.map