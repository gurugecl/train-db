const { Router } = require('express');
const PgConnection = require('postgresql-easy');
const dbConnectionInfo = require('../secrets/db_configuration');
const pg = new PgConnection(dbConnectionInfo);
const router = Router();

router.get('/', async (request, response, next) => {
    try {
        const result = await pg.getAll('profiles');
        response.json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.get('/:id', async (request, response, next) => {
    const { id } = request.params;
    try {
        const result = await pg.getById('profiles', id);
        console.log(result.rows);
        response.json(result);
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.post('/', async (request, response, next) => {
    const { name, environment } = request.body;
    console.log("request.body", request.body);
    try {
        await pg.insert('profiles', {name , environment});
        response.redirect('/profiles');
        // console.log(result.rows[0]);
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
    try {
        const result = pg.updateById(
            'profiles', id, {name: keys.name, environment: keys.environment});
            if (index === fields.length - 1) response.redirect('/profiles');
            console.log(result.rows[0]);
    } catch (e) {
        console.error(e);
        next(e);
    }
})
});

router.delete('/:id', async (request, response, next) => {
    const { id } = request.params;
    try {
        await pg.deleteById('profiles', id);
        response.redirect('/profiles');
    } catch (e) {
        console.error(e);
        next(e);
    }
});

router.delete('/', async (request, response, next) => {
    try {
        await pg.deleteAll('profiles');
        response.redirect('/profiles');
    } catch (e) {
        console.error(e);
        next(e);
    }
});


module.exports = router;