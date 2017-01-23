var mysql = require('mysql')
  , async = require('async')

var PRODUCTION_DB = 'haushaltsbuch'
  , TEST_DB = 'haushaltsbuch'

exports.MODE_TEST = 'mode_test'
exports.MODE_PRODUCTION = 'mode_production'

var state = {
  pool: null,
  mode: null,
}

exports.connect = function(mode, next) {
  state.pool = mysql.createPool({
    host: 'localhost',
    user: 'hhb',
    password: 'binGo501#hb',
    database: mode === exports.MODE_PRODUCTION ? PRODUCTION_DB : TEST_DB
  })

  state.mode = mode
  next()
}

exports.get = function() {
  return state.pool
}

exports.fixtures = function(data) {
  var pool = state.pool
  if (!pool) return next(new Error('Missing database connection.'))

  var names = Object.keys(data.tables)
  async.each(names, function(name, cb) {
    async.each(data.tables[name], function(row, cb) {
      var keys = Object.keys(row)
        , values = keys.map(function(key) { return "'" + row[key] + "'" })

      pool.query('INSERT INTO ' + name + ' (' + keys.join(',') + ') VALUES (' + values.join(',') + ')', cb)
    }, cb)
  }, next)
}

exports.drop = function(tables, next) {
  var pool = state.pool
  if (!pool) return next(new Error('Missing database connection.'))

  async.each(tables, function(name, cb) {
    pool.query('DELETE * FROM ' + name, cb)
  }, next)
}