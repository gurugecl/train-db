'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('express'),
    Router = _require.Router;

var PgConnection = require('postgresql-easy');
var dbConnectionInfo = require('../secrets/db_configuration');
var pg = new PgConnection(dbConnectionInfo);
var router = Router();

router.get('/', function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(request, response, next) {
        var result;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return pg.getAll('light');

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

router.get('/:id', function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(request, response, next) {
        var id, result;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        id = request.params.id;
                        _context2.prev = 1;
                        _context2.next = 4;
                        return pg.getById('light', id);

                    case 4:
                        result = _context2.sent;

                        response.json(result);
                        _context2.next = 12;
                        break;

                    case 8:
                        _context2.prev = 8;
                        _context2.t0 = _context2['catch'](1);

                        console.error(_context2.t0);
                        next(_context2.t0);

                    case 12:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined, [[1, 8]]);
    }));

    return function (_x4, _x5, _x6) {
        return _ref2.apply(this, arguments);
    };
}());

module.exports = router;
//# sourceMappingURL=light.js.map