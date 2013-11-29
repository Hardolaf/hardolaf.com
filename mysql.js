var mysql		= require('mysql');
var config 		= require('./mysql.json');
var connection	= mysql.createConnection(config);

module.exports = connection;
