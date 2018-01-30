'use strict';

var _require = require('pg'),
    Pool = _require.Pool;

var _require2 = require('../secrets/db_configuration'),
    user = _require2.user,
    host = _require2.host,
    database = _require2.database,
    password = _require2.password,
    port = _require2.port;

var pool = new Pool({ user: user, host: host, database: database, password: password, port: port });

module.exports = pool;
//# sourceMappingURL=index.js.map