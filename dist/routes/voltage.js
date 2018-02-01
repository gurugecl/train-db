'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('express'),
    Router = _require.Router;

var PgConnection = require('postgresql-easy');
var dbConnectionInfo = require('../secrets/db_configuration');
var pg = new PgConnection(dbConnectionInfo);
var router = Router();
var cors = require('cors');

router.use(cors());

router.get('/', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request, response, next) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return pg.getAll('voltage');

                    case 3:
                        result = _context.sent;

                        response.json(result);
                        _context.next = 11;
                        break;

                    case 7:
                        _context.prev = 7;
                        _context.t0 = _context['catch'](0);

                        console.error(_context.t0);
                        next(_context.t0);

                    case 11:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined, [[0, 7]]);
    }));

    return function (_x, _x2, _x3) {
        return _ref.apply(this, arguments);
    };
}());

//not added yet
router.post('/', function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(request, response, next) {
        var _request$body, level, amount;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _request$body = request.body, level = _request$body.level, amount = _request$body.amount;

                        console.log("request.body", request.body);
                        _context2.prev = 2;
                        _context2.next = 5;
                        return pg.insert('voltage', { level: level, amount: amount });

                    case 5:
                        response.send();
                        _context2.next = 12;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](2);

                        console.error(_context2.t0);
                        next(_context2.t0);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[2, 8]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

router.delete('/:id', function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(request, response, next) {
        var id;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        id = request.params.id;
                        _context3.prev = 1;
                        _context3.next = 4;
                        return pg.deleteById('voltage', id);

                    case 4:
                        response.send();
                        _context3.next = 11;
                        break;

                    case 7:
                        _context3.prev = 7;
                        _context3.t0 = _context3['catch'](1);

                        console.error(_context3.t0);
                        next(_context3.t0);

                    case 11:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined, [[1, 7]]);
    }));

    return function (_x7, _x8, _x9) {
        return _ref3.apply(this, arguments);
    };
}());

router.delete('/', function () {
    var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(request, response, next) {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return pg.deleteAll('voltage');

                    case 3:
                        response.send();
                        _context4.next = 10;
                        break;

                    case 6:
                        _context4.prev = 6;
                        _context4.t0 = _context4['catch'](0);

                        console.error(_context4.t0);
                        next(_context4.t0);

                    case 10:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined, [[0, 6]]);
    }));

    return function (_x10, _x11, _x12) {
        return _ref4.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=voltage.js.map