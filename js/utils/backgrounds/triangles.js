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

			rectangle_bg: function(){
				return new Path.Rectangle({
					point: [0, 0],
					size: [view.size.width, view.size.height],
					color: "black"
				});
			}
		},

		animations: {

			init: [
				{
					options: {
						loop: false,
						times: 0,
						alphaBorder: 0,
						increaseRate: 0.001,
						limitAlphaBorder: 0.4,
						end: 0
					},
					animation: function( ){
						// this.bg.animations.dash_border[0].animation(this.bg);
						if( effects.fade_in_border( this.bg.scene.objs.downTriangles, this.options, this.bg ) &&
							effects.fade_in_border( this.bg.scene.objs.upTriangles, this.options, this.bg ) ){
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
						// this.bg.animations.dash_border[0].animation(this.bg);
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


						effects.random_dash_borders(bg.scene.objs.downTriangles, this.options, bg);
						effects.random_dash_borders(bg.scene.objs.upTriangles, this.options, bg);
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

			var bg = this,
				// Arithmetic variables
				radius  = 50,
				radian  = Math.PI / 180,
				width   = Math.cos(30 * radian) * radius * 2,
				height  = Math.tan(60 * radian) * (width / 2),
				tWidth  = Math.cos(30 * Math.PI / 180) * radius * 2,
				tHeight = Math.sin(30 * Math.PI / 180) * radius + radius,
				nrHoriz = Math.ceil(view.size.width / tWidth) + 2,   // Two extra triangles, just in case...
				nrVerti = Math.ceil(view.size.height / tHeight) + 2, // Two extra triangles, just in case...
				// Animation speeds
				movementSpeed = 80,
				movementFadeOut = 0.06,
				// Colors
				strokeColor = new Color(255,255,255, 0.001),
				bgColor = new Color(0,0,0,0.001),
				waveHighlight = 'magenta',
				series1Color  = 'yellow',
				series2Color  = 'cyan',
				// Poiting down series
				series1 = {
					startX: -radius,
					startY: 0,
					color:  bgColor,
					strokeColor: strokeColor
				},
				// Pointing up series
				series2 = {
					startX: -radius + width / 2.65,
					startY: radius * 2 - height - (radius / 8),
					color:  bgColor,
					strokeColor: strokeColor
				},
				// General vars
				triangle,
				i,
				j,
				n = 0,
				offset;

			bg.scene.objs.upTriangles = [];
			bg.scene.objs.downTriangles = [];

			bg.scene.objs.bg = bg.objs.rectangle_bg();

			i = nrHoriz;

			// Cycle through the triangles
			while (i > 0) {
			// Update indexes
			i -= 1;
			j = nrVerti;

			bg.scene.objs.downTriangles[i] = [];
			bg.scene.objs.upTriangles[i] = [];

				while (j) {
					j -= 1;

					offset = (j % 2 === 0 ? 0 : tWidth / 2);

					// Series 1
					triangle = new Path.RegularPolygon(new Point(series1.startX + (i * tWidth) + offset, series1.startY + (j * tHeight)), 3, radius);
					triangle.fillColor = series1.color;
					triangle.strokeColor = series1.strokeColor;
					triangle.strokeWidth = 1;
					triangle.rotate(60, triangle.bounds.center);

					// New atributes
					// triangle.opacityDelta = Math.random() * 0.01 + 0.001;
					triangle.x = i;
					triangle.y = j;

					bg.scene.objs.downTriangles[i][j] = triangle;

					// Series 2
					triangle = new Path.RegularPolygon(new Point(series2.startX + (i * tWidth) + offset, series2.startY + (j * tHeight)), 3, radius);
					triangle.strokeWidth = 1;
					triangle.fillColor = series2.color;
					triangle.strokeColor = series2.strokeColor;

					// New atributes
					// triangle.opacityDelta = Math.random() * 0.01 + 0.001;
					triangle.x = i;
					triangle.y = j;

					bg.scene.objs.upTriangles[i][j] = triangle;
				}
			}
		}

	});

	return BG;
});
