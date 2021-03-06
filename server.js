	/**
 * Main server entry point, this configures express and attaches the relevant pathes,
 * most of which are defined in other files.
 */
// Configuration options
var mod_name = 'hardolaf.com server';
var mod_version = '0.0.1';

// Server config
var port = 8124;
var env = 'development';

// node.js and other libraries
var express = require('express');
var db = require('db-filters');
var fl = require('flux-link');

// Private libraries
var logger = require('./logger');
var mysql = require('./mysql');
var common = require('./common.js');
//var admin = require('./admin');

/**
 * Gets a connection from the mysql pool and clones instances
 * of database filter objects for our use. This is generally
 * the first step in handling any request.
 */
function init_db(env, after) {
	env.filters = db.clone_filters(db.filters);

	mysql.getValidConnection(env, function() {
		db.set_conn_all(env.conn, env.filters);
		after();
	});
}

/**
 * Cleans up the database connection
 */
function cleanup_db(env, after) {
	if (env.conn)
		env.conn.end();
	after();
}

var base_url = 'http://node.thelonepole.com';

// Set up custom dust functions
//var dh = require('./dust_functions');
var dust_filters = {};
var dust_helpers = {};

// Initialize mysql
db.init(process.cwd() + '/filters', function(file) {
	logger.info('Adding database definition ' + file.blue.bold + '...', 'db-filters');
}, db.l_info);

db.set_log(function(msg) {
	logger.info(msg, 'db-filters');
});

// Initialize the common server
var server = express();
var ci = new common.init(server, {
	port		: port,
	set			: {env : env},
	shutdown	: [/*{fn : mysql.deinit, ctx : mysql}*/],
	base_url	: base_url
});

// Add helpers and hooks
ci.add_dust_helpers(dust_helpers);
ci.add_dust_filters(dust_filters);

// Default helpers, used by most routes
//ci.add_pre_hook(fl.mkfn(init_db, 0));
//ci.add_post_hook(fl.mkfn(cleanup_db, 0));

// Admin-only page helpers
//ci.add_pre_hook(admin.initAdmin, 'admin');

// Finally!
logger.module_init(mod_name, mod_version, 'hardolaf.com server online');
