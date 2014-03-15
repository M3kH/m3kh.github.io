define(['js/utils/base', 'paper', 'backbone', 'underscore', 'jquery'], function( UtilsBase, paper, Backbone, _, $) {

	var Animation = UtilsBase.extend({
		options:{
			loop: false,
			times: 0,
			end: 0,
			alphaBorder: 0,
			increaseRate: 0.001
		},
		initialize: function( attributes, params ){
			var bg = this;
			_.extend(this, attributes);
			this.options = _.clone(attributes.options);
			this._options = _.clone(bg.options);
			console.log(attributes);
			console.log(this._options);
			this.bg = params;
		},
		_animation: function( bg ){
			if(typeof this.animation != undefined){
				return this.animation( );
			}
			return false;
		},
		reset: function(){
			this.options = _.clone(this._options);
			if( typeof this.restore != "undefined" ){
				this.restore();
			}
		}

	});

	var BG = UtilsBase.extend({
		defaults: {
			animated: false,
			mouseControl: false,
			loop: false,
			start: 'init',
			status: {
				position: -1,
				animation: ''
			},
			exit_time: 1000,
			objs: {},
		},

		show: function(){
			var bg = this;
			bg.$el.find(".bg").removeClass("active");
			bg.$bg.addClass("active");
		},

		_animations: {},

		animations: {},

		parse_animations: function(){
			var bg = this;
			_.each(bg.animations, function(value, key){
				bg._animations[key] = _.map(value, function(obj){
					return new Animation(obj, bg);
				});
			});
		},

		initialize: function( attributes, options ) {
			var bg = this,
			id = "bg-"+bg._uniq();
			bg.id = id;
			// Set the jquery element;
			bg.el = attributes.el;
			bg.$el = $(bg.el);
			this._defaults = _.extend({},bg.defaults);

			// Now because each time we want to execute this
			// We want clean-up and start from sketch
			// I consider el is "#backgrounds" container
			// and so on I append a div.bg to it. with a uniq Id
		},

		start: function(){
			var bg = this;
			bg.$el.append("<canvas class='bg' id='"+bg.id+"' resize />");
			var elem = bg.$el.find("#"+bg.id);
			bg.$bg = elem;
			bg.scene = {};
			bg.scene.objs = {};

			// Now I have the div appended so is the time to execute the orchestra
			paper.install(window);
			paper.setup(bg.id);
			this.paper = paper;

			with( paper ){
				bg.draw( );
				if(bg.defaults.animated){
					// Here should be think to put a parser of the animations
					bg.parse_animations();
					view.bg = bg;
					view.onFrame = bg.onFrame;
				}

				if(bg.defaults.mouseControl){
					bg.tool = new Tool();

					var vector = new Point({
						angle: 45,
						length: 0
					});

					bg.mouseVector = vector.clone();
					bg.tool.onMouseMove = function(event) {
						bg.mouseVector = new Point(view.center).subtract(event.point);
					};
				}
			}
			bg.show();
		},

		next_animation: function(animation, position){
				console.log(this);
				// var bg = this;
				this.defaults.status.position = (position);
				this.defaults.status.animation = (animation);
				console.log(this.defaults.status.animation);
				console.log(this.defaults.status.position);
		},

		next: function( bg ){
			// console.log("NEXT!!!", this);
			var animations = bg._animations,
				anim_lg = animations.length,

				status = bg.defaults.status,
				animation = status.animation,
				position = status.position;

			// Here check if the actual step is defined with his position
			if( typeof animations[animation] != "undefined" && typeof animations[animation][position] != "undefined" ){
				var anim_serie = animations[animation],
					act_anim = anim_serie[position];
					act_anim.reset();

			// Here get just the animations series, position is not found
			}else if( typeof animations[animation] != "undefined"){
				var anim_serie = animations[animation];

			// Mhh.. no series and no position? Wired
			}else{
				console.log("Really animation don't have a starting point?");
				return false;
			}

			if( typeof nextAnimation != "undefined" && typeof animations[nextAnimation] != "undefined" ){
				// Check animation and step
				animation = nextAnimation;
				if( typeof step != "undefined" && typeof animations[animation][step] != "undefined" ){
					position = step;
				}else if( typeof animations[animation][0] != "undefined" ){
					position = 0;

				// Hey this is animation is not defined
				}else{
					console.log("Hey why this animation is not defined");
					return false;
				}

			}else{
				// If there is more then one step and if the position is lower then the length
				if( anim_serie.length > 0 && position < anim_serie.length ){
					position++;

				// What to do if the position is higher or equal available in the animation?
				}else if ( position >= anim_serie.length ){

					// Do you want loop it?
					if( anim_serie.defaults.loops == true){
						position = 0;
					}else{
						position = 0;
					}
				}
			}
			bg.next_animation(animation, position);
		},


		onFrame: function( event ){
			var bg = this.bg,
				status = bg.defaults.status,
				animation = status.animation,
				position = status.position;

			// console.log(bg);
			// Check if defaults status are ready for be animated
			if( position == -1 || animation == '' ){
				position = 0;
				animation = bg.defaults.start;
				bg.defaults.status.position = position;
				bg.defaults.status.animation = animation;
			}

			// Check in the bg animations if they are defined
			if( typeof bg._animations != "undefined"){
				// The animation function exist
				if(typeof bg._animations[animation][position] != "undefined"){
					var anim = bg._animations[animation][position];

					if(typeof anim._animation != "undefined"){
						anim._animation( bg );
					}

					if( ( typeof anim.options.end != "undefined" && anim.options.end != 0 )
						&& ( typeof anim.options.start == "undefined" || anim.options.start == 0 ) ){
						anim.options.start = +new Date();
					}

					if( typeof anim.options.end != "undefined" && anim.options.end != 0 ){
						var currentTime = +new Date();
						var deltaTime = currentTime - anim.options.start;

						if( deltaTime >= anim.options.end ){
							bg.next_animation(animation, position);
						}
					}

				}
			}

			this.bg = bg;

			// return false;

			// var step = background.steps[background.actStep];
			// if( typeof step.start == "undefined" ){
				// step.start = +new Date();
			// }
			// var currentTime = +new Date();
			// var deltaTime = currentTime - step.start;
//
//
			// if( step.end == 0 || deltaTime < step.end ){
				// step.animation();
			// }else{
				// background.actStep +=1;
			// }
		},

		del: function(){
			if( typeof this.end != "undefined" ){
				this.end();
			}{
				this.destroy();
			}
		},

		destroy: function( cb ){
			var bg = this;
			with(bg.paper){
				try{
					// _.each(projects.activeLayer.children, function(layer){
						// layer.remove();
					// });
					project.activeLayer.removeChildren();
				}
				catch (error) {
					// this catches the error and allows you to proceed along nicely
					// console.log(error);
				}
			}
			if(typeof bg.scene.objs != "undefined"){
				_.each(bg.scene.objs, function(objs, key){
					if(_.isArray(objs)){
						_.each(objs, function(obj){
							delete obj;
						});
						delete objs;
					}else{
						delete obj;
					}
				});
			}

			bg.paper.view.onFrame = null;
			if(typeof bg.tool.onMouseMove != "undefined" ){
				// bg.tool.onMouseMove = null;
			}
			bg._animations = {};
			bg.defaults = bg._defaults;
			bg.defaults.status.animation = '';
			bg.defaults.status.position = -1;
			bg.$bg.remove();

			// setTimeout(function(){
			// }, bg.defaults.exit_time);
		},

		_uniq: function( ){
			return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
				return v.toString(16);
			});
		}


	});

	return BG;
});
