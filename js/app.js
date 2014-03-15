define([
	"jquery",

	// Backgrounds
	"js/utils/backgrounds/stars", "js/utils/backgrounds/triangles",
	// Exp Utils and Exps
	"experiences",

	"js/router",

	"js/collections/experiences",
	"js/views/experiences",

	"js/utils/soundtrack"],

	function ( $, stars, triangles, experiences, Router, CollectionExp, ViewExps, soundtrack) {

	//Will be the value 'blue'
	var app = {

		showMenu: function(){
			$(".nav").fadeIn();
		},

		hideMenu: function(){
			$(".nav").fadeOut();
		},

		onAnimationEnd: function(elem, cb){

			$(elem).bind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				if(typeof cb != "undefined"){
					cb();
				}
				$(elem).unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', null);
			});
		},

		actualAction: '',

		actions: {

			main: {
				init: function(attributes){
					var action = this;
					app.bg.stars.start();
					app.hideMenu();
					$("#main").css({'opacity': 0, 'display': 'table-cell'}).animate({'opacity': 1}, 500);

					// bg_stars.init();
				},

				destroy: function(cb, attributes){
					// bg_stars.destroy(cb, attributes);
					app.bg.stars.del();
					setTimeout(function(){
						cb(attributes);
					}, 3000);
				}
			},

			skills: {
				hide: false,
				init: function(attributes){
					app.showMenu();
					app.onAnimationEnd("#skills", function(){
						$("#skills").removeClass("animated fadeInRight");
						app.view_experiences.resize_summary("#skills_summary");
					});
					$("#skills").addClass("animated fadeInRight").css({'display': 'table-cell'});
				},
				destroy: function(cb, attributes){
					app.onAnimationEnd("#skills", function(){
						$("#skills").removeClass("animated fadeOutLeft").css({'display': 'none'});
						cb(attributes);
					});
					$("#skills").addClass("animated fadeOutLeft");
				}
			},

			languages: {
				hide: false,
				init: function(attributes){
					app.showMenu();
					$("#languages").addClass("animated fadeInRight").css({'display': 'table-cell'});
					app.onAnimationEnd("#languages", function(){
						$("#languages").removeClass("animated fadeInRight");
						app.view_experiences.resize_summary("#languages_summary");
					});
				},
				destroy: function(cb, attributes){
					app.onAnimationEnd("#languages", function(){
						$("#languages").removeClass("animated fadeOutLeft").css({'display': 'none'});
						cb(attributes);
					});
					$("#languages").addClass("animated fadeOutLeft");
				}
			},

			software: {
				hide: false,
				init: function(attributes){
					app.showMenu();
					app.onAnimationEnd("#software", function(){
						$("#software").removeClass("animated fadeInRight");
						app.view_experiences.resize_summary("#software_summary");
					});
					$("#software").addClass("animated fadeInRight").css({'display': 'table-cell'});
				},
				destroy: function(cb, attributes){
					app.onAnimationEnd("#software", function(){
						$("#software").removeClass("animated fadeOutLeft").css({'display': 'none'});
						cb(attributes);
					});
					$("#software").addClass("animated fadeOutLeft");
				}
			},

			timeline: {
				init: function(id){
					app.bg.triangles.start();
					if(typeof id == "undefined"){
						app.view_experiences.show(0);
					}
					app.showMenu();
				},

				destroy: function(cb, attributes){
					// render_exp.hide();
					app.view_experiences.hide();
					app.bg.triangles.del();
					setTimeout(function(){
						cb(attributes);
					}, 2000);
				}
			},
		},

		show: function( dest, attributes ){
			if(typeof app.actions[dest] != "undefined" ){

				if( app.actualAction == dest ){
					return false;
				}
				if(app.actualAction != "" ){
					if( typeof app.actions[app.actualAction].hide == "undefined" || app.actions[app.actualAction].hide ){
						$("#all > .panel").fadeOut(1000);
					}
					app.actions[app.actualAction].destroy( app.actions[dest].init, attributes );
				}else{
					app.actions[dest].init(attributes);
				}

				app.actualAction = dest;

				return true;
			}else{
				return false;
			}
		},

		check_first_render: false,

		new_style: function(){
			$("#print_style").removeAttr("disabled");
		},

		render_content: function(print){
			if( app.check_first_render == false){
				console.log("Render");
				var print = print || false;
				app.experiences = new CollectionExp(experiences);
				app.view_experiences = new ViewExps({collection: app.experiences, print: print, el: $("#time-line")});
				var elem = app.view_experiences.render().el;
				$("#all").append(elem);
				app.check_first_render = true;

				if(print){
					app.new_style();
				}
				return true;

			}else{
				return true;
			}
		},

		hide_images: function(elem){
			var new_txt = $(elem).data("toggle"),
				old = $(elem).text();
			$(elem).data("toggle", old);
			$(elem).text(new_txt);
			var echo_div = $(elem).closest(".eco-print"),
				active = echo_div.find(".active"),
				not_active = echo_div.find("div:not(.active)");

			active.removeClass("active");
			not_active.addClass("active");
			$("body").toggleClass("no-img");
		},

		init: function(){

			// setTimeout(function(){
			// render_exp.init("#timeLine", experiences, bg_triangles.changeColor);

			// }, 25);

			// Start the router
			var app_router = new Router;

			// Check if they are looking for the print version.
			if(Backbone.history.location.hash.indexOf("#/print") > -1 ){
				app.render_content(true);

				// Trigger event for hide the images
				$(".hide-images").on("click", function(){
					app.hide_images(this);
					return false;
				});


			}else{
				app.render_content();
				app.bg = {};
				app.bg.stars =  new stars({el: "#bgs"});
				app.bg.triangles =  new triangles({el: "#bgs"});

				soundtrack.init();
				app_router.on('route:print', function () {
					window.location.reload();
				});

				app_router.on('route:main', function () {
					app.show( "main" );
				});
				app_router.on('route:timeline', function () {
					app.show( "timeline" );
				});
				app_router.on('route:timeline_show', function (id){
					app.show( "timeline", id);
					app.view_experiences.show(id);
				});
				app_router.on('route:skills', function () {
					app.show( "skills" );
				});
				app_router.on('route:software', function () {
					app.show( "software" );
				});
				app_router.on('route:languages', function () {
					app.show( "languages" );
				});

			}

			// Make the history start
			Backbone.history.start();
		}
	};

	return app;
});
