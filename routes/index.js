/**
 * Module to display the index page.
 */

function get_index(env, after) {
	env.$template('index');
	env.$output({
		title: 'hardolaf.com',
	});
	after();
}

// Set up routes
module.exports.init_routes = function(server) {
	server.add_route('/', {fn : get_index});
}
