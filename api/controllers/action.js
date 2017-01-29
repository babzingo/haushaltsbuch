'use strict';
// Include our "db"
var db = require('../../config/db')();
var dbneu = require('../../config/dbneu');
// Exports all the functions to perform on the db
module.exports = { getAll, save, getOne, update, deleteById };

//GET /action operationId
function getAll(req, res, next) {
    var options = {
        sql: 'select action.id, action.value, action.date, action.interval, ' +
        'category.id, category.value, ' +
        'userPayed.id, userPayed.name, ' +
        'userBought.id, userBought.name ' +
        'from action ' +
        'left join category on category.id = action.category ' +
        'left join user userPayed on userPayed.id = action.userPayed ' +
        'left join user userBought on userBought.id = action.userBought', nestTables: true
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        }
        // console.log(rows)
        var actions = [];
        rows.forEach(function (row, index, arr) {
            row.action.category = row.category
            row.action.userPayed = row.userPayed
            row.action.userBought = row.userBought
            actions.push(row.action);
        })
        console.log(actions)
        //  console.log(actions)
        //result = 
        res.json({ actions });
    })
}

//GET /action/year/{year}
function getByYear(req, res, next) {
    var params = [req.swagger.params.year.value]
    var options = {
        sql: 'select action.id, action.value, action.date, action.interval, ' +
        'category.id, category.value, ' +
        'userPayed.id, userPayed.name, ' +
        'userBought.id, userBought.name ' +
        'from action ' +
        'left join category on category.id = action.category ' +
        'left join user userPayed on userPayed.id = action.userPayed ' +
        'left join user userBought on userBought.id = action.userBought ' +
        'where year(action.date) = ?', params, nestTables: true
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        }
        // console.log(rows)
        var actions = [];
        rows.forEach(function (row, index, arr) {
            row.action.category = row.category
            row.action.userPayed = row.userPayed
            row.action.userBought = row.userBought
            actions.push(row.action);
        })
        console.log(actions)
        //  console.log(actions)
        //result = 
        res.json({ actions });
    })
}

//GET /action/month/{year}/{month}
function getByMonth(req, res, next) {
    var params = [req.swagger.params.year.value,
    req.swagger.params.month.value]
    var options = {
        sql: 'select action.id, action.value, action.date, action.interval, ' +
        'category.id, category.value, ' +
        'userPayed.id, userPayed.name, ' +
        'userBought.id, userBought.name ' +
        'from action ' +
        'left join category on category.id = action.category ' +
        'left join user userPayed on userPayed.id = action.userPayed ' +
        'left join user userBought on userBought.id = action.userBought ' +
        'where year(action.date) = ? ' +
        'and month(action.date) = ?', params, nestTables: true
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        }
        // console.log(rows)
        var actions = [];
        rows.forEach(function (row, index, arr) {
            row.action.category = row.category
            row.action.userPayed = row.userPayed
            row.action.userBought = row.userBought
            actions.push(row.action);
        })
        console.log(actions)
        //  console.log(actions)
        //result = 
        res.json({ actions });
    })
}

//GET /action/day/{year}/{month}/{day}
function getByDay(req, res, next) {
    var params = [req.swagger.params.year.value,
    req.swagger.params.month.value,
    req.swagger.params.day.value]
    var options = {
        sql: 'select action.id, action.value, action.date, action.interval, ' +
        'category.id, category.value, ' +
        'userPayed.id, userPayed.name, ' +
        'userBought.id, userBought.name ' +
        'from action ' +
        'left join category on category.id = action.category ' +
        'left join user userPayed on userPayed.id = action.userPayed ' +
        'left join user userBought on userBought.id = action.userBought ' +
        'where year(action.date) = ? ' +
        'and month(action.date) = ? ' +
        'and day(action.date) = ?', params, nestTables: true
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        }
        // console.log(rows)
        var actions = [];
        rows.forEach(function (row, index, arr) {
            row.action.category = row.category
            row.action.userPayed = row.userPayed
            row.action.userBought = row.userBought
            actions.push(row.action);
        })
        console.log(actions)
        //  console.log(actions)
        //result = 
        res.json({ actions });
    })
}

//POST /action operationId
function save(req, res, next) {
    console.log('wuhu')
    var params = [req.swagger.params.value.value,
    req.swagger.params.date.value,
    req.swagger.params.interval.value,
    req.swagger.params.category.id.value,
    req.swagger.params.userBought.id.value,
    req.swagger.params.userPayed.id.value]
    console.log(params)
    var options = {
        sql: 'insert into action ' +
        '(value, `date`, `interval`, category, userPayed, userBought) ' +
        'values (?, ?, ?, ?, ?, ?)', params
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        }
        next();
    })
}
//GET /action/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var options = {
        sql: 'select action.id, action.value, action.date, action.interval, ' +
        'category.id, category.value, ' +
        'userPayed.id, userPayed.name, ' +
        'userBought.id, userBought.name ' +
        'from action ' +
        'left join category on category.id = action.category ' +
        'left join user userPayed on userPayed.id = action.userPayed ' +
        'left join user userBought on userBought.id = action.userBought ' +
        'where action.id = ?',
        values: [id],
        nestTables: true
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        } else if (rows.length > 1) {
            return next("Es wurde mehr als ein Ergebnis gefunden.")
        } else if (rows.length > 1) {
            return next("Es wurde kein Ergebnis gefunden.")
        }
        // console.log(rows)
        var row = rows[0];
        row.action.category = row.category
        row.action.userPayed = row.userPayed
        row.action.userBought = row.userBought
        var action = row.action;
        console.log(action)
        //  console.log(actions)
        //result = 
        res.json({ action });
    })
}
//PUT /action/{id} operationId
function update(req, res, next) {
    var params = [req.swagger.params.value.value,
    req.swagger.params.date.value,
    req.swagger.params.interval.value,
    req.swagger.params.category.id.value,
    req.swagger.params.userBought.id.value,
    req.swagger.params.userPayed.id.value,
    req.swagger.params.id.value]
    var options = {
        sql: 'update action ' +
        'set value = ?, ' +
        'date = ?, ' +
        'interval = ?, ' +
        'category = ?, ' +
        'userPayed = ?, ' +
        'userBought = ?, ' +
        'from action ' +
        'where id = ?',
        values: params
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        }
        next();
    })
}

//DELETE /action/{id} operationId
function deleteById(req, res, next) {
    var id = req.swagger.params.id.value
    var options = {
        sql: 'delete from action ' +
        'where id = ?',
        values: [id]
    };
    dbneu.get().query(options, function (err, rows) {
        if (err) {
            return next(err)
        }
        next();
    })
}

