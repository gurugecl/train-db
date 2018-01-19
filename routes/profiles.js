const { Router } = require('express');
const pool = require('../db');

const router = Router();

router.get('/', (request, response, next) => {
    pool.query('SELECT * FROM profiles ORDER BY id ASC', (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
});

router.get('/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query('SELECT * FROM profiles WHERE id = $1', [id], (err, res) => {
        if (err) return next(err);

        response.json(res.rows);
    });
});

router.post('/', (request, response, next) => {
    const { name, permission } = request.body;

    pool.query(
        'INSERT INTO profiles(name, permission) VALUES($1, $2)',
        [name, permission],
        (err, res) => {
            if (err) return next(err);

            response.redirect('/profiles');
        }
    );
});

router.put('/:id', (request, response, next) => {
    const { id } = request.params;
    const keys = ['name', 'permission'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
        pool.query(
            `UPDATE profiles SET ${field}=($1) WHERE id=($2)`,
            [request.body[field], id],
            (err, res) => {
                if (err) return next(err);

                if (index === fields.length - 1) response.redirect('/profiles');
            }
        )
    });
});

router.delete('/:id', (request, response, next) => {
    const { id } = request.params;

    pool.query('DELETE FROM profiles WHERE id=($1)', [id], (err, res) => {
        if (err) return next(err);

        response.redirect('/profiles');
    });
});

module.exports = router;