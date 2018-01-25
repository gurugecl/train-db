const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (request, response, next) => {
  pool.query('SELECT * FROM voltage ORDER BY id ASC', (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post('/', (request, response, next) => {
  const { level, amount } = request.body;

  pool.query(
    'INSERT INTO voltage(level, amount) VALUES($1, $2)',
    [level, amount],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/voltage');
    },
  );
});

module.exports = router;
