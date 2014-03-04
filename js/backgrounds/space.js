define(["paper"], function(paper){

	var background = {
		obj: {},
		sybs: {},
		mouseVector: null,
		actStep: 0,
		animations: [],
		effects: {

			scaleStarsIn: function( symbols, times ){
				var c = 0,
					qnt = symbols.length;

				for ( var i in symbols ) {
					symbols[i].scale( ( ( c / qnt ) *0.02 + ( times * 0.02 ) ) + 0.249 );
					c++;
				}
			},

			scaleStarsOut: function( obj, scale ){
				for ( var k in obj ) {
					if(typeof obj[k] == "Array"){
						for( var i in obj[k]){
							background.effects.scaleStarsOut(obj[k][i]);
						}
					}else if( typeof obj[k] != "undefined" && typeof obj[k].scale != "undefined"){
						obj[k].scale( scale );
					}
				}
			},

			moveStars: function ( symbols, vector ){
				if( typeof vector == "undefined" ){
					var vector = new Point({
						angle: 45,
						length: 0
					});
				}
				vector = vector.add(background.mouseVector.subtract(vector)).divide(30);

				// Run through the active layer's children list and change
				// the position of the placed symbols:
				for ( var i in symbols ) {
					var item = symbols[i];
					var size = item.bounds.size;
					var length = vector.length / 10 * size.width / 10;
					item.position = new Point( item.position.add( vector.normalize(length).add(item.data.vector) ) );
					background.keepInView(item);
				}
			},

			placeStars: function( symbol, qnt ){
				// Place the instances of the symbol:
				if(typeof background.sybs.stars == "undefined"){
					background.sybs.stars = [];
				}

				for (var i = 0; i < qnt; i++) {
					// The center position is a random point in the view:
					var center = paper.Point.random().multiply(view.size);
					// console.log(center);

					background.sybs.stars[i] = symbol.place(center);
					background.sybs.stars[i].scale(0.0001);

					// background.sybs.stars[i].scale(i / qnt + 0.001);
					background.sybs.stars[i].data.vector = new Point({
						angle: Math.random() * 360,
						length : (i / qnt) * Math.random() / 5
					});
				}
			},

			randomDashBorder: function(step, obj){
				var currentTime = +new Date();
				var deltaTime = currentTime - step.prevTime;
				step.prevTime = currentTime;
				step.elapsedTime += deltaTime;


				for (var i = 0; i < 10; i += 2) {
						obj.dashArray[i] = -Math.cos(step.elapsedTime / 3000. * step.randomValues[i]) * 200 + 500; // stroke length
						obj.dashArray[i + 1] = Math.sin(step.elapsedTime / 1000. * step.randomValues[i+1]) * 400 + 400; // gap length
				}

				obj.dashOffset = Math.cos(step.elapsedTime / 1000) * 10 - 10;
			},

			fadeFill: function(step, obj){

					if( step.alpha < 1 && step.increase ){
						step.alpha += step.increaseRate;
					}else if( step.alpha < 0 && !step.increase ){
						step.increase = true;
						step.alpha += step.increaseRate;
					} else {
						step.increase = false;
						step.alpha = step.alpha - step.increaseRate;
					}

					obj.fillColor = new Color(255, 255, 255, step.alpha);
			},

			fullFill: function(step, obj){

					if( step.alpha <= 1){
						step.alpha += step.increaseRate;
					}

					obj.fillColor = new Color(255, 255, 255, step.alpha);

					if( step.alpha <= 1){
						return false;
					}else{
						return true;
					}
			},

			fadeBorder: function( step, obj ){
				if( step.alphaBorder >= 0){
					step.alphaBorder = step.alphaBorder - step.increaseRate;
				}

				obj.strokeColor = new Color(255, 255, 255, step.alphaBorder);

				if( step.alphaBorder >= 0){
					return false;
				}else{
					return true;
				}
			},

			fadeInBorder: function( step, obj ){
				if( step.alphaBorder <= 1){
					step.alphaBorder += step.increaseRate;
				}

				obj.strokeColor = new Color(255, 255, 255, step.alphaBorder);

				if( step.alphaBorder <= 1){
					return false;
				}else{
					return true;
				}
			}
		},

		steps: [
			// Step 0
			/*
			 * Animation: Border Crown dash.
			 */
			{
				times: 0,
				end: 0,
				animation: function(){
					var step = this;
					if( step.times < 100 ){
						background.effects.scaleStarsIn(background.sybs.stars, step.times);
						step.times++;
					}else{
						step.times = 0;
						background.actStep++;
					}

				}
			},

			// Step 1
			/*
			 * Animation: Border Crown dash.
			 */
			{
				end: 0,
				alpha: 0,
				alphaBorder: 0,
				increase: true,
				increaseRate: 0.001,
				animation: function(){
					var step = this;
					background.steps[2].animation();
					if( background.effects.fadeInBorder( step, background.obj.crown ) ){
						step.alpha = 0;
						step.alphaBorder = 0;
						background.actStep++;
					}
				}

			},

			// Step 2
			/*
			 * Animation: Border Crown dash.
			 */
			{
				end: 10000,
				animation: function(){
					var step = this;
					/*
					 * Animate the Crown
					 */

					// This is just the initial state.
					if( typeof step.prevTime == "undefined" ){
						step.prevTime = +new Date();
						step.elapsedTime = 0;


						step.randomValues = [];
						for (var i = 0; i < 10; i++) {
							step.randomValues.push(Math.random()/2 + 0.5);
						}
					}
					background.effects.moveStars( background.sybs.stars );
					background.effects.randomDashBorder(step, background.obj.crown);
				}

			},

			// Step 3
			/*
			 * Animation: Fill the crown
			 */
			{
				end: 0,
				alpha: 0,
				increase: true,
				increaseRate: 0.001,
				animation: function(){
					var step = this;
					background.steps[2].animation();
					background.effects.moveStars( background.sybs.stars );

					if( background.effects.fullFill(step, background.obj.crown) ){
						step.alpha = 0;
						background.actStep++;
					}
				}

			},

			// Step 4
			/*
			 * Maintain the rotate start
			 * Rotate the crown
			 */
			{
				end: 0,
				animation: function(){
					background.effects.moveStars( background.sybs.stars );
					background.obj.crown.rotate(0.01);
				}
			},

			// Step 5
			/*
			 * Fade out all the elements in the scene with scale effect.
			 */
			{
				end: 0,
				scale: 1,
				rate: 0.00001,
				opacity: 100,
				animation: function(){
					var step = this;
					if(step.scale >= 0){
						step.scale = step.scale - step.rate;
						background.effects.scaleStarsOut(background.sybs, 0.9);
						background.effects.scaleStarsOut(background.obj, 0.9);
					}
				}
			}
		],

		onFrame: function(){
			var step = background.steps[background.actStep];
			if( typeof step.start == "undefined" ){
				step.start = +new Date();
			}
			var currentTime = +new Date();
			var deltaTime = currentTime - step.start;


			if( step.end == 0 || deltaTime < step.end ){
				step.animation();
			}else{
				background.actStep +=1;
			}
		},

		init: function( ) {
			background.actStep = 0;
			paper.install(window);
			paper.setup('background');
			with (paper) {
				// The amount of symbol we want to place;
				var count = 50;
				background.tool = new Tool();

				// Create a symbol, which we will use to place instances of later:
				background.obj.circle = new Path.Circle({
					center: [0, 0],
					radius: 5,
					fillColor: 'white',
					strokeColor: 'black'
				});

				var symbol = new Symbol(background.obj.circle);
				background.effects.placeStars(symbol, count);

				/*
				 * Place the crown in SVG from DOM element
				 */
				var increase = true;
				background.obj.crown = project.importSVG(document.getElementById('ideabile'));
				background.obj.crown.fillColor = new Color(255,255,255, 0);
				background.obj.crown.strokeColor =  new Color(255,255,255, 0);
				background.obj.crown.transformContent = true;
				background.obj.crown.scale(8);
				background.obj.crown.position = new Point(view.center);

				var vector = new Point({
					angle: 45,
					length: 0
				});

				background.mouseVector = vector.clone();
				background.tool.onMouseMove = function(event) {
					background.mouseVector = new Point(view.center).subtract(event.point);
				};

				// The onFrame function is called up to 60 times a second:
				view.onFrame = function(event) {
					background.onFrame( );
				};

				view.draw();
			}
		},

		remove: function(item){
			item.remove();
		},

		destroy: function(cb){
			// background.obj.crown.remove();
			background.tool = null;
			background.actStep = 5;
			setTimeout(function(){
				paper.project.clear();
				delete background.obj.circle;
				delete background.obj.crown;
				for( var i in background.sybs.stars ){
					// console.log(background.sybs.stars[i]);
					// background.sybs.stars[i].remove();
					delete background.sybs.stars[i];
					// console.log(background.sybs.stars[i]);
				}

				paper.view.onFrame = null;

				if(typeof cb != "undefined"){
					cb();
				}

			}, 3000);
			// project.activeLayer.remove();


			// paper.project.activeLayer.remove();
			// var layer = new paper.Layer();
			// paper.project.activeLayer.removeChildren();

		},

		keepInView: function(item){
			var position = item.position;
			var viewBounds = view.bounds;
			// console.log(position);
			if (position.isInside(viewBounds))
				return;
			var itemBounds = item.bounds;
			if (position.x > viewBounds.width + 5) {
				position.x = -item.bounds.width;
			}

			if (position.x < -itemBounds.width - 5) {
				position.x = viewBounds.width;
			}

			if (position.y > viewBounds.height + 5) {
				position.y = -itemBounds.height;
			}

			if (position.y < -itemBounds.height - 5) {
				position.y = viewBounds.height;
			}
		}
	};

	return background;
});
