const { Router } = require('express');
const pool = require('../db/index');

const router = Router();

router.get('/', async (request, response, next) => {
    const sql = `
		SELECT *
		FROM light
		ORDER BY id ASC`;
    try {
        const {rowCount, rows} = await pool.query(sql);
        response.json(rowCount ? rows : []);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('light/:id', async (request, response, next) => {
    const { id } = request.params;
    const sql = `
		SELECT *
		FROM light
		WHERE id = $1`;
    try {
        const {rowCount, rows} = await pool.query(sql, id);
        response.json(rowCount ? rows :[]);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;