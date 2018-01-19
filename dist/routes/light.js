'use strict';

// const { Router } = require('express');
// const pool = require('../db');
//
// const router = Router();
//
// router.get('/', (request, response, next) => {
//     pool.query('SELECT * FROM light ORDER BY id ASC', (err, res) => {
//         if (err) return next(err);
//
//         response.json(res.rows);
//     });
// });
//
// router.get('/:id', (request, response, next) => {
//     const { id } = request.params;
//
//     pool.query('SELECT * FROM light WHERE id = $1', [id], (err, res) => {
//         if (err) return next(err);
//
//         response.json(res.rows);
//     });
// });
//
// router.post('/', (request, response, next) => {
//     const { level, amount } = request.body;
//
//     pool.query(
//         'INSERT INTO light(level, amount) VALUES($1, $2)',
//         [level, amount],
//         (err, res) => {
//             if (err) return next(err);
//
//             response.redirect('/light');
//         }
//     );
// });
//
// router.put('/:id', (request, response, next) => {
//     const { id } = request.params;
//     const keys = ['level', 'amount'];
//     const fields = [];
//
//     keys.forEach(key => {
//         if (request.body[key]) fields.push(key);
//     });
//
//     fields.forEach((field, index) => {
//         pool.query(
//             `UPDATE light SET ${field}=($1) WHERE id=($2)`,
//             [request.body[field], id],
//             (err, res) => {
//                 if (err) return next(err);
//
//                 if (index === fields.length - 1) response.redirect('/light');
//             }
//         )
//     });
// });
//
// router.delete('/:id', (request, response, next) => {
//     const { id } = request.params;
//
//     pool.query('DELETE FROM light WHERE id=($1)', [id], (err, res) => {
//         if (err) return next(err);
//
//         response.redirect('/light');
//     });
// });
//
// module.exports = router;

var _require = require('express'),
    Router = _require.Router;

var pool = require('../db');

var router = Router();

router.get('/', function (request, response, next) {
    pool.query('SELECT * FROM light ORDER BY id ASC', function (err, res) {
        if (err) return next(err);

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