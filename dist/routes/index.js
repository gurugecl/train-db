'use strict';

var _require = require('express'),
    Router = _require.Router;

var profiles = require('./profiles');
var light = require('./light');
var voltage = require('./voltage');

var router = Router();

router.use('/profiles', profiles);
router.use('/light', light);
router.use('/voltage', voltage);

module.exports = router;
//# sourceMappingURL=index.js.map