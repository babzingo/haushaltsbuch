'use strict';
// Include our "db"
var db= require('../../config/db')();
var dbneu = require('../../config/dbneu');
var func = require('node-mysql-nesting');
// Exports all the functions to perform on the db
module.exports = {getAll, save, getOne, update, deleteById};

//GET /action operationId
function getAll(req, res, next) {
    var options = { sql: 'select action.id, action.value, action.date, action.interval, ' + 
                        'category.id, category.value, ' +
                        'userPayed.id, userPayed.name, ' +
                        'userBought.id, userBought.name ' +
                        'from action ' +
                        'left join category on category.id = action.category ' +
                        'left join user userPayed on userPayed.id = action.userPayed '+
                        'left join user userBought on userBought.id = action.userBought', nestTables: true };
    dbneu.get().query(options, function (err, rows) {
        if (err){
            console.log(err)
            return next(err)  
        }
       // console.log(rows)
        var actions = [];
        rows.forEach(function(row, index, arr) {
            row.action.category = row.category
            row.action.userPayed = row.userPayed
            row.action.userBought = row.userBought
            actions.push(row.action);
        })
        console.log(actions)
       //  console.log(actions)
        //result = 
        res.json({actions});
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
    var options = { sql: 'insert into action '+
                        '(value, `date`, `interval`, category, userPayed, userBought) '+
                        'values (?, ?, ?, ?, ?, ?)', params};
    dbneu.get().query(options, function (err, rows) {
        if (err){
            console.log(err)
            return next(err)  
        }
        res.json({actions});
    })
    res.json({success: 1, description: "action added to the list!"});
}
//GET /action/{id} operationId
function getOne(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var action = db.find(id);
    if(action) {
        res.json(action);
    }else {
        res.status(204).send();
    }       
}
//PUT /action/{id} operationId
function update(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    var action = req.body;
    if(db.update(id, action)){
        res.json({success: 1, description: "action updated!"});
    }else{
        res.status(204).send();
    }

}
//DELETE /action/{id} operationId
function deleteById(req, res, next) {
    var id = req.swagger.params.id.value; //req.swagger contains the path parameters
    if(db.remove(id)){
        res.json({success: 1, description: "action deleted!"});
    }else{
        res.status(204).send();
    }

}

