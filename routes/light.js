const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (request, response, next) => {
  console.log('inside get');
  pool.query('SELECT * FROM light ORDER BY id ASC', (err, res) => {
    console.log(err);
    if (err) return next(err);

    console.log(res.rows);
    response.json(res.rows);
  });
});

router.post('/', (request, response, next) => {
  const { level, amount } = request.body;

  pool.query(
    'INSERT INTO light(level, amount) VALUES($1, $2)',
    [level, amount],
    (err, res) => {
      if (err) return next(err);

      response.redirect('/light');
    },
  );
});

module.exports = router;
