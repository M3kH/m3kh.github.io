
		var c = {
			baseUrl: "",
			// urlArgs: "bust=" +  (new Date()).getTime(),
			paths: {
				"underscore": "bower_components/underscore/underscore",
				"backbone": "bower_components/backbone/backbone",
				"paper": "bower_components/paper/dist/paper-core.min",
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
			}
		};

		require.config(c);
		require(["js/app"], function(app){
			app.init();
		});