'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('express'),
    Router = _require.Router;

var pool = require('../db/index');

var router = Router();

router.get('/', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request, response, next) {
        var sql, _ref2, rowCount, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        sql = '\n\t\tSELECT *\n\t\tFROM profiles\n\t\tORDER BY id ASC';
                        _context.prev = 1;
                        _context.next = 4;
                        return pool.query(sql);

                    case 4:
                        _ref2 = _context.sent;
                        rowCount = _ref2.rowCount;
                        rows = _ref2.rows;

                        response.json(rowCount ? rows : []);
                        _context.next = 14;
                        break;

                    case 10:
                        _context.prev = 10;
                        _context.t0 = _context['catch'](1);

                        console.error(_context.t0);
                        next(_context.t0);

                    case 14:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[1, 10]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

router.get('/:id', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(request, response, next) {
        var id, sql, _ref4, rowCount, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = request.params.id;
                        sql = '\n\t\tSELECT *\n\t\tFROM profiles\n\t\tWHERE id = $1';
                        _context2.prev = 2;
                        _context2.next = 5;
                        return pool.query(sql, id);

                    case 5:
                        _ref4 = _context2.sent;
                        rowCount = _ref4.rowCount;
                        rows = _ref4.rows;

                        response.json(rowCount ? rows : []);
                        _context2.next = 15;
                        break;

                    case 11:
                        _context2.prev = 11;
                        _context2.t0 = _context2['catch'](2);

                        console.error(_context2.t0);
                        next(_context2.t0);

                    case 15:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[2, 11]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());

router.post('/', function () {
    var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(request, response, next) {
        var _request$body, name, environment, sql;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _request$body = request.body, name = _request$body.name, environment = _request$body.environment;
                        sql = '\n\t\tINSERT INTO\n\t\tprofiles(name, environment)\n\t\tVALUES($1, $2)';
                        _context3.prev = 2;
                        _context3.next = 5;
                        return pool.query(sql, name, environment);

                    case 5:
                        response.redirect('/profiles');
                        _context3.next = 12;
                        break;

                    case 8:
                        _context3.prev = 8;
                        _context3.t0 = _context3['catch'](2);

                        console.error(_context3.t0);
                        next(_context3.t0);

                    case 12:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[2, 8]]);
    }));

    return function (_x7, _x8, _x9) {
        return _ref5.apply(this, arguments);
    };
}());

router.put('/:id', function () {
    var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(request, response, next) {
        var id, keys, fields;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        id = request.params.id;
                        keys = ['name', 'environment'];
                        fields = [];


                        keys.forEach(function (key) {
                            if (request.body[key]) fields.push(key);
                        });

                        fields.forEach(function () {
                            var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(field, index) {
                                var sql;
                                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                                    while (1) {
                                        switch (_context4.prev = _context4.next) {
                                            case 0:
                                                sql = '\n\t\tUPDATE profiles\n\t\tSET ' + field + '=($1)\n\t\tWHERE id=($2)';
                                                _context4.prev = 1;
                                                _context4.next = 4;
                                                return pool.query(sql, request.body[field], id);

                                            case 4:
                                                if (index === fields.length - 1) response.redirect('/profiles');
                                                _context4.next = 11;
                                                break;

                                            case 7:
                                                _context4.prev = 7;
                                                _context4.t0 = _context4['catch'](1);

                                                console.error(_context4.t0);
                                                next(_context4.t0);

                                            case 11:
                                            case 'end':
                                                return _context4.stop();
                                        }
                                    }
                                }, _callee4, undefined, [[1, 7]]);
                            }));

                            return function (_x13, _x14) {
                                return _ref7.apply(this, arguments);
                            };
                        }());

                    case 5:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, undefined);
    }));

    return function (_x10, _x11, _x12) {
        return _ref6.apply(this, arguments);
    };
}());

router.delete('/:id', function () {
    var _ref8 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(request, response, next) {
        var id, sql;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
            while (1) {
                switch (_context6.prev = _context6.next) {
                    case 0:
                        id = request.params.id;
                        sql = '\n\t\tDELETE FROM\n\t\tprofiles\n\t\tWHERE id=($1)';
                        _context6.prev = 2;
                        _context6.next = 5;
                        return pool.query(sql, id);

                    case 5:
                        response.redirect('/profiles');
                        _context6.next = 12;
                        break;

                    case 8:
                        _context6.prev = 8;
                        _context6.t0 = _context6['catch'](2);

                        console.error(_context6.t0);
                        next(_context6.t0);

                    case 12:
                    case 'end':
                        return _context6.stop();
                }
            }
        }, _callee6, undefined, [[2, 8]]);
    }));

    return function (_x15, _x16, _x17) {
        return _ref8.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=profiles.js.map