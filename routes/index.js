/**
 * Module to display the index page.
 */

function get_index(env, after) {
	env.$template('index');
	after();
}

// Set up routes
module.exports.init_routes = function(server) {
	server.add_route('/', {fn : get_index});
}
