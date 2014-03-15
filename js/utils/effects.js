define([], function() {

	var Effects = {
			scale_in: function(objs, options, bg){
				var times = options.times,
					objs = objs || options.objs || false;

				if( times < 100 && objs !== false){
					var c = 0,
						qnt = objs.length;

					for ( var i in objs ) {
						objs[i].scale( ( ( c / qnt ) *0.02 + ( times * 0.02 ) ) + 0.249 );
						c++;
					}
					times++;
					options.times = times;
					return false;
				}else{
					// if(this.next){
					return true;
					// }
				}
			},

			fade_in_border: function(objs, options, bg){
				var times = options.times,
					step = options,
					limit = 1;

				if( step.alphaBorder <= 1){
					step.alphaBorder += step.increaseRate;
				}

				if( _.isArray(objs) ){
					for ( var i in objs ) {
						if( _.isArray(objs[i]) ){
							Effects.fade_in_border(objs[i], options, bg);
						}else{
							objs[i].strokeColor = new Color(255, 255, 255, step.alphaBorder);
						}
					}
				}else{
					objs.strokeColor = new Color(255, 255, 255, step.alphaBorder);
				}

				options = step;

				if(typeof options.limitAlphaBorder != "undefined"){
					limit = options.limitAlphaBorder;
				}

				if( options.alphaBorder <= limit){
					return false;
				}else{
					return true;
				}
			},


			/*
			 * require options.prevTime, options.elapsedTime, options.randomValues = []
			 */
			random_dash_borders: function(objs, options, bg){

				if(_.isArray(objs)){
					_.each(objs, function(obj){
						Effects.random_dash_borders(obj, options, bg);
					});
				}else{
					var currentTime = +new Date();
					var deltaTime = currentTime - options.prevTime;
					options.prevTime = currentTime;
					options.elapsedTime += deltaTime;

					for (var i = 0; i < 10; i += 2) {
						objs.dashArray[i] = -Math.cos(options.elapsedTime / 3000. * options.randomValues[i]) * 200 + 500; // stroke length
						objs.dashArray[i + 1] = Math.sin(options.elapsedTime / 1000. * options.randomValues[i+1]) * 400 + 400; // gap length
					}

					objs.dashOffset = Math.cos(options.elapsedTime / 1000) * 10 - 10;
				}
			},

			move_stars: function ( objs, options, bg ){
				if( typeof options.vector == "undefined" ){
					options.vector = new Point({
						angle: 45,
						length: 0
					});
				}
				options.vector = options.vector.add(bg.mouseVector.subtract(options.vector)).divide(30);

				// Run through the active layer's children list and change
				// the position of the placed objs:
				for ( var i in objs ) {
					var item = objs[i];
					var size = item.bounds.size;
					var length = options.vector.length / 10 * size.width / 10;
					item.position = new Point( item.position.add( options.vector.normalize(length).add(item.data.vector) ) );
					Effects.keep_in_view(item);
				}
			},

			scale_out: function( objs, scale ){
				_.each(objs, function(obj){
					if(_.isArray(obj)){
						for( var i in obj){
							_.each(obj, function(elem){
								Effects.scale_out(elem, scale);
							});
						}
					}else if( typeof obj != "undefined" && typeof obj.scale != "undefined"){
						obj.scale( scale );
					}
				});
			},

			keep_in_view: function( item ){
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

	return Effects;
});
