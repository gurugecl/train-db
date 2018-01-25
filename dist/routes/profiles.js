'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('express'),
    Router = _require.Router;

var pool = require('../db');

var router = Router();

router.get('/', function (request, response, next) {
  pool.query('SELECT * FROM profiles ORDER BY id ASC', function (err, res) {
    if (err) return next(err);

    response.json(res.rows);
  });
});

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

router.get('/:id', function (request, response, next) {
  var id = request.params.id;


  pool.query('SELECT * FROM profiles WHERE id = $1', [id], function (err, res) {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.get('/', function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(request, response, next) {
    var sql, _ref4, rowCount, rows;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sql = '\n\t\tSELECT * \n\t\tFROM profiles \n\t\tWHERE id = $1, [id]';
            _context2.prev = 1;
            _context2.next = 4;
            return pool.query(sql);

          case 4:
            _ref4 = _context2.sent;
            rowCount = _ref4.rowCount;
            rows = _ref4.rows;

            response.json(rowCount ? rows : []);
            _context2.next = 14;
            break;

          case 10:
            _context2.prev = 10;
            _context2.t0 = _context2['catch'](1);

            console.error(_context2.t0);
            next(_context2.t0);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 10]]);
  }));

  return function (_x4, _x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}());

router.post('/', function (request, response, next) {
  var _request$body = request.body,
      name = _request$body.name,
      environment = _request$body.environment;


  pool.query('INSERT INTO profiles(name, environment) VALUES($1, $2)', [name, environment], function (err, res) {
    if (err) return next(err);

    response.redirect('/profiles');
  });
});

router.put('/:id', function (request, response, next) {
  var id = request.params.id;

  var keys = ['name', 'environment'];
  var fields = [];

  keys.forEach(function (key) {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach(function (field, index) {
    pool.query('UPDATE profiles SET ' + field + '=($1) WHERE id=($2)', [request.body[field], id], function (err, res) {
      if (err) return next(err);

      if (index === fields.length - 1) response.redirect('/profiles');
    });
  });
});

router.delete('/:id', function (request, response, next) {
  var id = request.params.id;


  pool.query('DELETE FROM profiles WHERE id=($1)', [id], function (err, res) {
    if (err) return next(err);

    response.redirect('/profiles');
  });
});

module.exports = router;
//# sourceMappingURL=profiles.js.map