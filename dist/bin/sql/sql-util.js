'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SqlUtil = function () {
    function SqlUtil(pool, debug) {
        _classCallCheck(this, SqlUtil);

        this.pool = pool;
        this.debug = debug;
    }

    _createClass(SqlUtil, [{
        key: 'log',
        value: function log() {
            for (var _len = arguments.length, msg = Array(_len), _key = 0; _key < _len; _key++) {
                msg[_key] = arguments[_key];
            }

            if (this.debug) console.log('postgresql-easy', msg.join(' '));
        }

        /**
         * Deletes all records from a given table.
         */

    }, {
        key: 'deleteAll',
        value: function deleteAll(tableName) {
            var sql = 'delete from ' + tableName;
            this.log('deleteAll: sql =', sql);
            return sql;
        }

        /**
         * Deletes a record from a given table by id.
         * This requires the table to have a column named "id".
         */

    }, {
        key: 'deleteById',
        value: function deleteById(tableName /*, id*/) {
            var sql = 'delete from ' + tableName + ' where id=$1';
            this.log('deleteById: sql =', sql);
            return sql;
        }

        /**
         * Disconnects from the database.
         */

    }, {
        key: 'disconnect',
        value: function disconnect() {
            this.log('disconnecting');
            if (this.pool) {
                this.pool.end();
                this.pool = null;
            }
        }

        /**
         * Gets all records from a given table.
         */

    }, {
        key: 'getAll',
        value: function getAll(tableName) {
            var sql = 'select * from ' + tableName;
            this.log('getAll: sql =', sql);
            return sql;
        }

        /**
         * Gets a record from a given table by id.
         * This requires the table to have a column named "id".
         */

    }, {
        key: 'getById',
        value: function getById(tableName /*, id*/) {
            var sql = 'select * from ' + tableName + ' where id=$1';
            this.log('getById: sql =', sql);
            return sql;
        }

        /**
         * Inserts a record into a given table.
         * The keys of obj are column names
         * and their values are the values to insert.
         */

    }, {
        key: 'insert',
        value: function insert(tableName, obj) {
            var keys = Object.keys(obj);
            var values = keys.map(function (key) {
                return obj[key];
            });
            var cols = keys.join(', ');
            var placeholders = values.map(function (v, index) {
                return '$' + (index + 1);
            }).join(', ');
            var sql = 'insert into ' + tableName + ' (' + cols + ') values(' + placeholders + ') returning id';
            this.log('insert: sql =', sql);
            return sql;
        }

        /**
         * Updates a record in a given table by id.
         * This requires the table to have a column named "id".
         */

    }, {
        key: 'updateById',
        value: function updateById(tableName, id, obj) {
            var sets = Object.keys(obj).map(function (key) {
                var v = obj[key];
                var value = typeof v === 'string' ? '\'' + v + '\'' : v;
                return key + '=' + value;
            });
            var sql = 'update ' + tableName + ' set ' + sets + ' where id=$1';
            this.log('update: sql =', sql);
            return sql;
        }
    }]);

    return SqlUtil;
}();

module.exports = SqlUtil;
//# sourceMappingURL=sql-util.js.map