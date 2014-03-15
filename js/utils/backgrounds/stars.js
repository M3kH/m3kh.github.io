define([

	'js/utils/backgrounds/base', 'backbone', 'underscore',
 	'js/utils/effects',
], function( BGBase,Backbone, _, effects ) {

	var BG = BGBase.extend({
		defaults: {
			stars: 50,
			animated: true,
			mouseControl: true,
			start: "init",
			exit: "end",
			status: {
				position: -1,
				animation: ''
			},
			exit_time: 1000,
			objs: {},
			tools: {}
		},

		objs: {
			crown: function(){
				var crown = project.importSVG(document.getElementById('ideabile'));
					crown.fillColor = new Color(255,255,255, 0);
					crown.strokeColor =  new Color(255,255,255, 0);
					crown.transformContent = true;
					crown.scale(8);
					crown.position = new Point(view.center);

				return crown;
			},

			circle: function(){
				return new Path.Circle({
					center: [0, 0],
					radius: 5,
					fillColor: 'white',
					strokeColor: 'black'
				});
			}
		},

		animations: {

			init: [
				{
					options: {
						loop: false,
						times: 0,
						end: 0
					},
					animation: function( ){
						// console.log(this);
						this.bg.animations.dash_border[0].animation(this.bg);
						if( effects.scale_in(this.bg.scene.objs.stars, this.options, this.bg) ){
							this.bg.next(this.bg);
						};
					},
				},
				{
					options: {
						loop: false,
						times: 0,
						end: 0,
						alphaBorder: 0,
						increaseRate: 0.001
					},
					animation: function(){
						this.bg.animations.move_stars[0].animation(this.bg);
						this.bg.animations.dash_border[0].animation(this.bg);
						if( effects.fade_in_border(this.bg.scene.objs.crown, this.options, this.bg) ){
							this.bg.next(this.bg);
						};
					}
				},
				{
					options: {
						loop: false,
						times: 0,
						end: 0,
						alphaBorder: 0,
						increaseRate: 0.001
					},
					animation: function(){
						this.bg.animations.move_stars[0].animation(this.bg);
						this.bg.animations.dash_border[0].animation(this.bg);
					}
				}

			],

			end: [
				{
					options: {
						loop: false,
						times: 0,
						end: 0,
						alphaBorder: 0,
						scale: 1,
						rate: 0.001,
						increaseRate: 0.001
					},
					animation: function(){
						var step = this;
						if(step.scale >= 0){
							step.scale = step.scale - step.rate;
							effects.scale_out(this.bg.scene.objs, 0.9);
						}else{
							this.bg.next(this.bg);
						}
					}
				},
				{
					options: {
						loop: false,
						times: 0,
						end: 0,
						alphaBorder: 0,
						scale: 1,
						rate: 0.001,
						increaseRate: 0.001
					},
					animation: function(){
						this.bg.destroy();
					}
				}
			],

			dash_border: [

				{
					/*
					 * require options.prevTime, options.elapsedTime, options.randomValues = []
					 */
					options: {
						prevTime : 0,
						elapsedTime: 0,
						end: 0,
						randomValues: []
					},
					animation: function(bg){
						if(typeof this.bg != "undefined" ){
							var bg = this.bg;
						}else if( typeof bg != "undefined" ){

						}else{
							return false;
						}

						if( this.options.prevTime == 0 ){
							this.options.prevTime = +new Date();
							this.options.elapsedTime = 0;


							this.options.randomValues = [];
							for (var i = 0; i < 10; i++) {
								this.options.randomValues.push(Math.random()/2 + 0.5);
							}
						}


						effects.random_dash_borders(bg.scene.objs.crown, this.options, bg);
					}
				}
			],

			move_stars: [

				{
					/*
					 * require options.prevTime, options.elapsedTime, options.randomValues = []
					 */
					options: {
					},
					animation: function(bg){
						effects.move_stars(bg.scene.objs.stars, this.options, bg);
					}
				}
			]
		},

		stars: {
			draw: function(bg, symbol, qnt, scale){
				// Place the instances of the symbol:
				// console.log(view);
				if(typeof bg.scene.objs.stars == "undefined"){
					bg.scene.objs.stars = [];
				}

				for (var i = 0; i < qnt; i++) {
					// The center position is a random point in the view:
					var center = paper.Point.random().multiply(view.size);
					// console.log(center);

					bg.scene.objs.stars[i] = symbol.place(center);
					bg.scene.objs.stars[i].scale(scale);

					// background.sybs.stars[i].scale(i / qnt + 0.001);
					bg.scene.objs.stars[i].data.vector = new Point({
						angle: Math.random() * 360,
						length : (i / qnt) * Math.random() / 5
					});
				}
			}
		},

		end: function(){
			this.next_animation("end", 0);
		},

		draw: function( ){
			var bg = this;

				// The amount of symbol we want to place;
				var count = 50;

				// Create a symbol, which we will use to place instances of later:
				bg.scene.objs.circle = bg.objs.circle();
				bg.scene.objs.symbol_star = new Symbol(bg.scene.objs.circle);
				bg.stars.draw( bg, bg.scene.objs.symbol_star, bg.defaults.stars, 0.0001 );

				/*
				 * Place the crown in SVG from DOM element
				 */
				var increase = true;
				bg.scene.objs.crown = bg.objs.crown();

		}

	});

	return BG;
});
