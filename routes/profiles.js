const { Router } = require('express');
const pool = require('../db');

const router = Router();

// router.get('/', (request, response, next) => {
//   pool.query('SELECT * FROM profiles ORDER BY id ASC', (err, res) => {
//     if (err) return next(err);
//
//     response.json(res.rows);
//   });
// });

router.get('/', async (request, response, next) => {
    const sql = `
		SELECT *
		FROM profiles
		ORDER BY id ASC`;
    try {
        const {rowCount, rows} = await pool.query(sql);
        response.json(rowCount ? rows : []);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

// router.get('/:id', (request, response, next) => {
//   const { id } = request.params;
//
//   pool.query('SELECT * FROM profiles WHERE id = $1', [id], (err, res) => {
//     if (err) return next(err);
//
//     response.json(res.rows);
//   });
// });

router.get('/:id', async (request, response, next) => {
    const { id } = request.params;
    const sql = `
		SELECT * 
		FROM profiles 
		WHERE id = $1`, [id];
    try {
        const {rowCount, rows} = await pool.query(sql);
        response.json(rowCount ? rows : []);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

// router.post('/', (request, response, next) => {
//   const { name, environment } = request.body;
//
//   pool.query(
//     'INSERT INTO profiles(name, environment) VALUES($1, $2)',
//     [name, environment],
//     (err, res) => {
//       if (err) return next(err);
//
//       response.redirect('/profiles');
//     },
//   );
// });

router.post('/', async (request, response, next) => {
    const { name, environment } = request.body;
    const sql = `
		INSERT INTO 
		profiles(name, environment) 
		VALUES($1, $2)`, [name, environment];
    try {
        await pool.query(sql);
        response.redirect('/profiles');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

// router.put('/:id', (request, response, next) => {
//   const { id } = request.params;
//   const keys = ['name', 'environment'];
//   const fields = [];
//
//   keys.forEach(key => {
//     if (request.body[key]) fields.push(key);
//   });
//
//   fields.forEach((field, index) => {
//     pool.query(
//       `UPDATE profiles SET ${field}=($1) WHERE id=($2)`,
//       [request.body[field], id],
//       (err, res) => {
//         if (err) return next(err);
//
//         if (index === fields.length - 1) response.redirect('/profiles');
//       },
//     );
//   });
// });

router.put('/:id', async (request, response, next) => {
    const { id } = request.params;
    const keys = ['name', 'environment'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach((field, index) => {
        const sql = `
		UPDATE profiles 
		SET ${field}=($1) 
		WHERE id=($2)`, [request.body[field], id];
        try {
            await pool.query(sql);
            if (index === fields.length - 1) response.redirect('/profiles');
        } catch (e) {
            console.error(e);
            next(e);
        }
    });
});

// router.delete('/:id', (request, response, next) => {
//   const { id } = request.params;
//
//   pool.query('DELETE FROM profiles WHERE id=($1)', [id], (err, res) => {
//     if (err) return next(err);
//
//     response.redirect('/profiles');
//   });
// });

router.delete('/:id', async (request, response, next) => {
    const { id } = request.params;
    const sql = `
		DELETE FROM 
		profiles 
		WHERE id=($1)`, [id];
    try {
        await pool.query(sql);
        response.redirect('/profiles');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;
