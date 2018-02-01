const { Router } = require('express');
const PgConnection = require('postgresql-easy');
const dbConnectionInfo = require('../secrets/db_configuration');
const pg = new PgConnection(dbConnectionInfo);
const router = Router();
const cors = require('cors');

router.use(cors());

router.get('/', async (request, response, next) => {
    try {
        const result = await pg.getAll('light');
        response.json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

//not added yet
router.post('/', async (request, response, next) => {
    const { level, amount } = request.body;
    console.log("request.body", request.body);
    try {
        await pg.insert('light', { level, amount });
        response.send();
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/:id', async (request, response, next) => {
    const { id } = request.params;
    try {
        await pg.deleteById('light', id);
        response.send();
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/', async (request, response, next) => {
    try {
        await pg.deleteAll('light');
        response.send();
    } catch (e) {
        console.error(e);
        next(e);
    }
});

module.exports = router;