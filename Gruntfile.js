module.exports = function(grunt) {

// Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	clean: ["dist"],
	requirejs: {
		compile: {
			options: {

				paths: {
					"underscore": "bower_components/underscore/underscore",
					"backbone": "bower_components/backbone/backbone",
					"paper": "bower_components/paper/dist/paper",
					"paper-full": "bower_components/paper/dist/paper-full",
					"jquery": "bower_components/jquery/dist/jquery.min",
					"d3": "bower_components/d3/d3.min",
					"magnific-popup": "bower_components/magnific-popup/dist/jquery.magnific-popup.min"
				},
				shim: {

					'backbone': {
						deps: ['underscore', 'jquery'],
						exports: 'Backbone'
					},
					'magnific-popup': {
						deps: ['jquery']
					}
				},
				baseUrl: ".",
				name: "js/main",
				out: "dist/ideabile.js",
				optimize: "none"
			}
		}
	},
	exec: {
		export_cv: {
			cmd: function() {
				return 'phantomjs ph_pdf.js http://ideabile.dev/#/print cv.pdf A4';
			}
		}
	}
});
grunt.loadNpmTasks('grunt-contrib-requirejs');
grunt.loadNpmTasks('grunt-exec');

// Default task(s).
grunt.registerTask('default', ['requirejs']);

};