'use strict';
var db = require('../../config/dbneu');
// Exports all the functions to perform on the db
module.exports = { check };

// Checks credentials
function check(name, pass, next) {
    console.log('checking...')
    db.get().query('select * from user '+
    'where name = ? and password = ?', 
    [name, pass], function (err, rows) {
        console.log(rows)
        if (err || rows.length === 0){
            return next('Bad credentials')  
        }
        console.log(rows)
        return next()
    })
}


