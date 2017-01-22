'use strict';
// Include our "db"
var db= require('../../config/db')();
var dbneu = require('../../config/dbneu');
// Exports all the functions to perform on the db
module.exports = {check};

// Checks credentials
function check(req, res, next, user) {
    dbneu.get().query('select * from user '+
    'where name = ? and password = ?', 
    [user.name, user.pass], function (err, rows) {
        if (err || rows.length === 0){
            console.log(err)
            return next(err)  
        }
        console.log(rows)
      
    })
}


