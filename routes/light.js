const { Router } = require('express');
const PgConnection = require('postgresql-easy');
const dbConnectionInfo = require('../secrets/db_configuration');
const pg = new PgConnection(dbConnectionInfo);
const router = Router();

router.get('/', async (request, response, next) => {
    try {
        const result = await pg.getAll('light');
        response.json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id', async (request, response, next) => {
    const { id } = request.params;
    try {
        const result = await pg.getById('light', id);
        response.json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;