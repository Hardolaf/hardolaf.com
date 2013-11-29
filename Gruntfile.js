module.exports = function(grunt) {
	grunt.initConfig({
		sass: {
			options: {
				includePaths: ['bower_components/foundation/scss']
			},
			dist: {
				files: [{
					expand: true,
					cwd: 'client/scss',
					src: ['*.scss'],
					dest: 'static/css',
					ext: '.css'
				}]
			}
		}
	});

	grunt.loadNpmTasks('grunt-sass');

	grunt.registerTask('default', ['sass']);
};
