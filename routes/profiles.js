const { Router } = require('express');
const pool = require('../db/index');

const router = Router();

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

router.get('/:id', async (request, response, next) => {
    const { id } = request.params;
    const sql = `
		SELECT *
		FROM profiles
		WHERE id = $1`;
    try {
        const {rowCount, rows} = await pool.query(sql, id);
        response.json(rowCount ? rows :[]);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/', async (request, response, next) => {
    const { name, environment } = request.body;
    const sql =`
		INSERT INTO
		profiles(name, environment)
		VALUES($1, $2)`;
    try {
        await pool.query(sql, name, environment);
        response.redirect('/profiles');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.put('/:id', async (request, response, next) => {
    const { id } = request.params;
    const keys = ['name', 'environment'];
    const fields = [];

    keys.forEach(key => {
        if (request.body[key]) fields.push(key);
    });

    fields.forEach(async(field, index) => {
        const sql = `
		UPDATE profiles
		SET ${field}=($1)
		WHERE id=($2)`;
        try {
            await pool.query(sql, request.body[field], id);
            if (index === fields.length - 1) response.redirect('/profiles');
        } catch (e) {
            console.error(e);
            next(e);
        }
    });
});

router.delete('/:id', async (request, response, next) => {
    const { id } = request.params;
    const sql = `
		DELETE FROM
		profiles
		WHERE id=($1)`;
    try {
        await pool.query(sql, id);
        response.redirect('/profiles');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;