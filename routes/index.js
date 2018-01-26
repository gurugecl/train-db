const { Router } = require('express');
const profiles = require('./profiles');
const light = require('./light');
const voltage = require('./voltage');

const router = Router();

router.use('/profiles', profiles);
router.use('/light', light);
router.use('/voltage', voltage);

module.exports = router;

