/**
 * Module to display the root pages.
 */

/**
 * Specifies information for the index route
 * @param  {object} env
 * @param  {function} after
 */
function get_index(env, after) {
	env.$template('index');
	env.$output({
		title: 'hardolaf.com',
		show_navbar: true,
	});
	after();
}

/**
 * Specifies information for the about route
 * @param  {object} env
 * @param  {function} after
 */
function get_about(env, after) {
	env.$template('about');
	env.$output({
		title: 'hardolaf.com',
		page_title: 'About Hardolaf',
		show_navbar: false,
	})
	after();
}

// Set up routes
module.exports.init_routes = function(server) {
	server.add_route('/', {fn : get_index});
	server.add_route('/about', {fn : get_about});
}
