'use strict';

var SwaggerExpress = require('swagger-express-mw');
var app = require('express')();
var basicAuth = require('basic-auth');
var db = require('./config/dbneu');

module.exports = app; // for testing

var config = {
  appRoot: __dirname // required config
};

SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

  app.use(function (req, res, next) {
    function unauthorized(res) {
      res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
      return res.sendStatus(401);
    };
    function isValid(user) {

      return user.name === 'foo' && user.pass === 'bar'
    }

    var user = basicAuth(req);

    if (!user || !user.name || !user.pass) {
      return unauthorized(res);
    };

    if (isValid(user)) {
      return next();
    } else {
      return unauthorized(res);
    };
  });

  db.connect(db.MODE_PRODUCTION, function(err) {
    if (err) {
      console.log('Unable to connect to MySQL.')
      process.exit(1)
    } else {
      app.listen(3000, function() {
        console.log('Listening on port 3000...')
      })
    }
  })
  
  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

  if (swaggerExpress.runner.swagger.paths['/hello']) {
    console.log('try this:\ncurl http://127.0.0.1:' + port + '/hello?name=Scott');
  }
});
