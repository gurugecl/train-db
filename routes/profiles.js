const { Router } = require('express');
const PgConnection = require('postgresql-easy');
const dbConnectionInfo = require('../secrets/db_configuration');
const pg = new PgConnection(dbConnectionInfo);
const router = Router();
const cors = require('cors');

router.use(cors());

router.get('/', async (request, response, next) => {
  try {
    const result = await pg.getAll('profiles');
    response.json(result);
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//not used
router.get('/:id', async (request, response, next) => {
  const { id } = request.params;
  try {
    const result = await pg.getById('profiles', id);
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
    await pg.insert('profiles', { name, environment });
    response.send();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

//not used
router.put('/:id', async (request, response, next) => {
  const { id } = request.params;
  const keys = ['name', 'environment'];
  const fields = [];

  keys.forEach(key => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach(async (field, index) => {
    try {
      await pg.updateById('profiles', id, {
        name: keys.name,
        environment: keys.environment,
      });
      if (index === fields.length - 1) response.send();
    } catch (e) {
      console.error(e);
      next(e);
    }
  });
});

router.delete('/:id', async (request, response, next) => {
  const { id } = request.params;
    console.log("deleteById delete id", id);
  try {
    await pg.deleteById('profiles', id);
      response.send();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

router.delete('/', async (request, response, next) => {
  try {
    // const sql = 'TRUNCATE profiles RESTART IDENTITY';
    await pg.deleteAll('profiles');
    // await pg.query(sql);
    console.log("deleteAll");
      response.send();
  } catch (e) {
    console.error(e);
    next(e);
  }
});

module.exports = router;
