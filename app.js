var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var api = require('./server/api');
var expressMetrics = require('express-metrics');

var app = express();
var pool;
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));

var error = function(msg) {
  throw msg;
};

var initDatabaseConnection = function () {
  var host = process.env.DB_HOST || error("Missing configuration: DB_HOST");
  var port = process.env.DB_PORT || error("Missing configuration: DB_PORT");
  var user = process.env.DB_USER || error("Missing configuration: DB_USER");
  var password = process.env.DB_PASSWORD || error("Missing configuration: DB_PASSWORD");
  var database = process.env.DB_NAME || error("Missing configuration: DB_NAME");

  console.log("Connecting to " + user + "@" + host + ":" + port + "/" + database);
  pool = mysql.createPool({
    connectionLimit: 10,
    host: host,
    port: port,
    user: user,
    password: password,
    database: database
  });
};

app.mySqlConnection = function (callback) {
  pool.getConnection(function (err, connection) {
    callback(err, connection);
  });
}

var configureMetrics = function () {
  var metricsPort = process.env.METRICS_PORT || 8091;
  app.use(expressMetrics({
    port: metricsPort
  }));
  console.log('Configured express metrics on port ' + metricsPort);
};

var startServer = function () {
  var serverPort = process.env.SERVER_PORT || 8000;
  app.listen(serverPort, function () {
    console.log('Started server on port ' + serverPort);
  });
};

initDatabaseConnection();
configureMetrics();
api.configure(app);
startServer();


