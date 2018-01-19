'use strict';

var _require = require('express'),
    Router = _require.Router;

var pool = require('../db');

var router = Router();

router.get('/', function (request, response, next) {
    pool.query('SELECT * FROM profiles ORDER BY id ASC', function (err, res) {
        if (err) return next(err);

        response.json(res.rows);
    });
});

router.get('/:id', function (request, response, next) {
    var id = request.params.id;


    pool.query('SELECT * FROM profiles WHERE id = $1', [id], function (err, res) {
        if (err) return next(err);

        response.json(res.rows);
    });
});

router.post('/', function (request, response, next) {
    var _request$body = request.body,
        name = _request$body.name,
        permission = _request$body.permission;


    pool.query('INSERT INTO profiles(name, permission) VALUES($1, $2)', [name, permission], function (err, res) {
        if (err) return next(err);

        response.redirect('/profiles');
    });
});

router.put('/:id', function (request, response, next) {
    var id = request.params.id;

    var keys = ['name', 'permission'];
    var fields = [];

    keys.forEach(function (key) {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach(function (field, index) {
        pool.query('UPDATE profiles SET ' + field + '=($1) WHERE id=($2)', [request.body[field], id], function (err, res) {
            if (err) return next(err);

            if (index === fields.length - 1) response.redirect('/profiles');
        });
    });
});

router.delete('/:id', function (request, response, next) {
    var id = request.params.id;


    pool.query('DELETE FROM profiles WHERE id=($1)', [id], function (err, res) {
        if (err) return next(err);

        response.redirect('/profiles');
    });
});

module.exports = router;
//# sourceMappingURL=profiles.js.map