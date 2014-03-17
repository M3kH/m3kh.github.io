define(['backbone', 'underscore', 'jquery'], function(Backbone, _, $) {
	var Router = Backbone.Router.extend({
			// <p><a href="#showSoftware" class="action">Softwares</a> | <a href="#showLanguages" class="action">Languages</a> | <a href="#showSkills" class="action">Skills</a></p>
			// <p><a href="#timeLine" class="action">My Timeline</a></p>
			routes: {
				'': 'main',
				'main': 'main',
				'me': 'me',
				'timeline' : 'timeline',
				'timeline/:id' : 'timeline_show',
				'languages': 'languages',
				'skills': 'skills',
				'software': 'software',
				'print': 'print'
			}

		});

	return Router;
});
