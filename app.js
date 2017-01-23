'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var userAuth = require('./api/controllers/user_auth');
var db = require('./config/dbneu');

var auth = require('http-auth');
var basic = auth.basic({
  realm: "Haushaltsbuch"
}, (username, password, next) => {
  // Custom authentication
  // Use callback(error) if you want to throw async error.
  userAuth.check(username, password, function(err) {
    if(err){
      next(false)
    } else {
      next(true)
    }
  })
});


module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function (err, swaggerExpress) {
  if (err) { throw err; }

  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(auth.connect(basic));

  db.connect(db.MODE_PRODUCTION, function (err) {
    if (err) {
      console.log('Unable to connect to MySQL.')
      process.exit(1)
    } else {
      app.listen(3000, function () {
        console.log('Listening on port 3000...')
      })
    }
  })

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/action']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/action');
  }
});
