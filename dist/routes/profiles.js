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
            return pg.getAll('profiles');

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

//not used
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
            return pg.getById('profiles', id);

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

router.post('/', function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(request, response, next) {
    var _request$body, name, environment;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _request$body = request.body, name = _request$body.name, environment = _request$body.environment;

            console.log("request.body", request.body);
            _context3.prev = 2;
            _context3.next = 5;
            return pg.insert('profiles', { name: name, environment: environment });

          case 5:
            response.send();
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
    return _ref3.apply(this, arguments);
  };
}());

//not used
router.put('/:id', function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(request, response, next) {
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
              var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(field, index) {
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.prev = 0;
                        _context4.next = 3;
                        return pg.updateById('profiles', id, {
                          name: keys.name,
                          environment: keys.environment
                        });

                      case 3:
                        if (index === fields.length - 1) response.send();
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

              return function (_x13, _x14) {
                return _ref5.apply(this, arguments);
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
    return _ref4.apply(this, arguments);
  };
}());

router.delete('/:id', function () {
  var _ref6 = _asyncToGenerator(regeneratorRuntime.mark(function _callee6(request, response, next) {
    var id;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            id = request.params.id;

            console.log("deleteById delete id", id);
            _context6.prev = 2;
            _context6.next = 5;
            return pg.deleteById('profiles', id);

          case 5:
            response.send();
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
    return _ref6.apply(this, arguments);
  };
}());

router.delete('/', function () {
  var _ref7 = _asyncToGenerator(regeneratorRuntime.mark(function _callee7(request, response, next) {
    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return pg.deleteAll('profiles');

          case 3:
            // await pg.query(sql);
            console.log("deleteAll");
            response.send();
            _context7.next = 11;
            break;

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7['catch'](0);

            console.error(_context7.t0);
            next(_context7.t0);

          case 11:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 7]]);
  }));

  return function (_x18, _x19, _x20) {
    return _ref7.apply(this, arguments);
  };
}());

module.exports = router;
//# sourceMappingURL=profiles.js.map