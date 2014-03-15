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
				for ( var k in symbols ) {
					symbols[i].scale( scale );
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

				obj.strokeColor.alpha = step.alphaBorder;

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

				obj.strokeColor.alpha = step.alphaBorder;

				if( step.alphaBorder <= 1){
					return false;
				}else{
					return true;
				}
			}
		},

		steps: [
			/*
			 * Animation: This should animate the triangles background
			 */
			// Step 0
			{
				times: 0,
				end: 0,
				alphaBorder: 0,
				increaseRate: 0.00001,
				alphaLimit: 0.2,
				animation: function(){
					var step = this;
					if( step.alphaBorder <= step.alphaLimit ){
						for( var k in background.obj.downTriangles ){
							for (var i in background.obj.downTriangles[k]){
								background.effects.fadeInBorder(step, background.obj.downTriangles[k][i]);
							}
						}
						for( var k in background.obj.upTriangles ){
							for (var i in background.obj.upTriangles[k]){
								background.effects.fadeInBorder(step, background.obj.upTriangles[k][i]);
							}
						}
					}else{
						background.actStep++;
					}
				}
			},
			// Step 1
			{
				times: 0,
				actScale: 1,
				scaleLimit: 0.003,
				scaleRate: 0.0005,
				end: 0,
				bgSet: false,
				animation: function(){
					var step = this;

					if( step.bgSet == false ){
						step.bgSet = true;
						background.obj.bg.fillColor = "#78FFBC";
					}

					background.steps[2].animation();

					if( step.actScale >= (1-step.scaleLimit) ){

						step.actScale = step.actScale - step.scaleRate;

						for( var k in background.obj.downTriangles ){
							for (var i in background.obj.downTriangles[k]){
									background.obj.downTriangles[k][i].scale(step.actScale);
							}
						}
						for( var k in background.obj.upTriangles ){
							for (var i in background.obj.upTriangles[k]){
								background.obj.upTriangles[k][i].scale(step.actScale);
							}
						}
					}else{
						step.bgSet = false;
						background.actStep++;
					}
				}
			},

			// Step 2
			{
				end: 5000,
				animation: function(){

					background.obj.bg.fillColor.hue += 1;
				}
			},
			// Step 3
			{
				times: 0,
				end: 0,
				animation: function(){

					// background.obj.bg.fillColor.hue += 1;
				}
			},
			// Step 4
			{
				times: 0,
				actScale: 1,
				scaleLimit: 1,
				scaleRate: 0.005,
				end: 0,
				animation: function(){
					var step = this;
					background.obj.bg.fillColor.alpha = background.obj.bg.fillColor.alpha - 0.02;
					if( step.actScale >= (1-step.scaleLimit) ){

						step.actScale = step.actScale - step.scaleRate;

						for( var k in background.obj.downTriangles ){
							for (var i in background.obj.downTriangles[k]){
									background.obj.downTriangles[k][i].scale(step.actScale);
							}
						}
						for( var k in background.obj.upTriangles ){
							for (var i in background.obj.upTriangles[k]){
								background.obj.upTriangles[k][i].scale(step.actScale);
							}
						}
					}else{
						step.actScale = 1;
						background.actStep++;
					}
				}
			},
			// Step 5
			{
				times: 0,
				end: 0,
				animation: function(){

				}
			}
		],

		changeColor: function(){
			background.actStep = 2;
		},

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
				delete step.start;
				background.actStep +=1;
			}
		},

		init: function( ) {
			background.actStep = 0;
			paper.install(window);
			paper.setup('background');
			with (paper) {
				// The amount of symbol we want to place;


				var // Arithmetic variables
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
					strokeColor = new Color(255,255,255, 0),
					bgColor = new Color(0,0,0,1),
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

				background.obj.upTriangles = [];
				background.obj.downTriangles = [];

				background.obj.bg = new Path.Rectangle({
					point: [0, 0],
					size: [view.size.width, view.size.height],
					color: "black"
				});

				i = nrHoriz;

				// Cycle through the triangles
				while (i > 0) {
				// Update indexes
				i -= 1;
				j = nrVerti;

				background.obj.downTriangles[i] = [];
				background.obj.upTriangles[i] = [];

				while (j) {
						j -= 1;

						offset = (j % 2 === 0 ? 0 : tWidth / 2);

						// Series 1
						triangle = new Path.RegularPolygon(new Point(series1.startX + (i * tWidth) + offset, series1.startY + (j * tHeight)), 3, radius);
						triangle.fillColor = series1.color;
						triangle.strokeColor = series1.strokeColor;
						triangle.rotate(60, triangle.bounds.center);

						// New atributes
						triangle.opacityDelta = Math.random() * 0.01 + 0.001;
						triangle.x = i;
						triangle.y = j;

						background.obj.downTriangles[i][j] = triangle;

						// Series 2
						triangle = new Path.RegularPolygon(new Point(series2.startX + (i * tWidth) + offset, series2.startY + (j * tHeight)), 3, radius);
						triangle.fillColor = series2.color;
						triangle.strokeColor = series2.strokeColor;

						// New atributes
						triangle.opacityDelta = Math.random() * 0.01 + 0.001;
						triangle.x = i;
						triangle.y = j;

						background.obj.upTriangles[i][j] = triangle;
					}
				}

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

		destroy: function(cb, attributes){
			background.tool = null;
			background.actStep = 4;
			setTimeout(function(){
				paper.project.clear();
				paper.view.onFrame = null;

				for( var i in background.obj ){
					var obj = background.obj[i];
					if(typeof obj.remove != "undefined"){
						obj.remove();
					}else{
						for(var k in obj ){
							if(typeof obj[k].remove != "undefined"){
								obj[k].remove();
							}
						}
					}
					delete background.obj[i];
				}

				if(typeof cb != "undefined"){
					cb(attributes);
				}

			}, 3000);

		}
	};

	return background;
});
