define(["js/backgrounds/space", "js/backgrounds/triangles", "js/utils/render_experience", "experiences", "jquery", "js/utils/soundtrack"], function (bg_stars, bg_triangles, render_exp, experiences, $, soundtrack) {

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
				init: function(){
					app.hideMenu();
					$("#main").css({'opacity': 0, 'display': 'table-cell'}).animate({'opacity': 1}, 500);
					bg_stars.init();
				},

				destroy: function(cb){
					bg_stars.destroy(cb);
				}
			},

			showSkills: {
				hide: false,
				init: function(){
					app.showMenu();
					app.onAnimationEnd("#skills", function(){
						$("#skills").removeClass("animated fadeInRight");
					});
					$("#skills").addClass("animated fadeInRight").css({'display': 'table-cell'});
				},
				destroy: function(cb){
					app.onAnimationEnd("#skills", function(){
						$("#skills").removeClass("animated fadeOutLeft").css({'display': 'none'});
						cb();
					});
					$("#skills").addClass("animated fadeOutLeft");
				}
			},

			showLanguages: {
				hide: false,
				init: function(){
					app.showMenu();
					$("#languages").addClass("animated fadeInRight").css({'display': 'table-cell'});
					app.onAnimationEnd("#languages", function(){
						$("#languages").removeClass("animated fadeInRight");
					});
				},
				destroy: function(cb){
					app.onAnimationEnd("#languages", function(){
						$("#languages").removeClass("animated fadeOutLeft").css({'display': 'none'});
						cb();
					});
					$("#languages").addClass("animated fadeOutLeft");
				}
			},

			showSoftware: {
				hide: false,
				init: function(){
					app.showMenu();
					app.onAnimationEnd("#software", function(){
						$("#software").removeClass("animated fadeInRight");
					});
					$("#software").addClass("animated fadeInRight").css({'display': 'table-cell'});
				},
				destroy: function(cb){
					app.onAnimationEnd("#software", function(){
						$("#software").removeClass("animated fadeOutLeft").css({'display': 'none'});
						cb();
					});
					$("#software").addClass("animated fadeOutLeft");
				}
			},

			timeLine: {
				init: function(){
					setTimeout(bg_triangles.init, 1000);
					render_exp.showContainer();
					app.showMenu();
				},

				destroy: function(cb){
					render_exp.hide();
					bg_triangles.destroy(cb);
				}
			},
		},

		show: function( dest ){
			var dest =  dest.substr(1);
			if(typeof app.actions[dest] != "undefined" ){

				if( app.actualAction == dest ){
					return false;
				}
				if(app.actualAction != "" ){
					if( typeof app.actions[app.actualAction].hide == "undefined" || app.actions[app.actualAction].hide ){
						$("#all > .panel").fadeOut(1000);
					}
					app.actions[app.actualAction].destroy(app.actions[dest].init);
				}else{
					app.actions[dest].init();
				}

				app.actualAction = dest;

				return true;
			}else{
				return false;
			}
		},

		print: function(){
			render_exp.print("#timeLine", experiences, bg_triangles.changeColor);
		},

		init: function(){


			app.show("#main");
			setTimeout(function(){
				render_exp.init("#timeLine", experiences, bg_triangles.changeColor);
			}, 25);

			$("a.action").on("click",function(){
				var href = $(this).attr("href");
				app.show(href);
				return false;
			});

			soundtrack.init();
		}
	};

	return app;
});
