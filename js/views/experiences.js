define(['backbone', 'underscore', 'jquery', 'js/views/experience', 'd3'], function(Backbone, _, $, ExpView, d3) {

	var ExpsView = Backbone.View.extend({

			el: "div",

			className: "panel",

			id: "time-line",

			initialize : function(arguments) {
				var that = this,
					print = false;
				this._experiences = [];

				if(arguments.print){
					print = true;
				}

				$(this.el).append("<ul class='experencies'/>");

				this.list = $(this.el).find('.experencies');
				this.next = $(this.el).find('.experencies-nav .next');
				this.prev = $(this.el).find('.experencies-nav .prev');
				this.total = this.collection.length;
				this.show_status = false;

				this.collection.each(function(experience, index) {
					that._experiences.push(new ExpView({
						id: 'exp-'+index,
						model : experience,
						tagName : 'li',
						print: print
					}));
				});

				this.summary_chart("#skills_summary", "skills", print);
				this.summary_chart("#software_summary", "software", print);
				this.summary_chart("#languages_summary", "programming_languages", print);
			},

			summary_chart: function( idElem, category, print ){

				var data = this.collection.get_global_category(category);

				function truncate(str, maxLength, suffix) {
					if(str.length > maxLength) {
						str = str.substring(0, maxLength + 1);
						str = str.substring(0, Math.min(str.length, str.lastIndexOf(" ")));
						str = str + suffix;
					}
					return str;
				}

				var margin = {top: 50, right: 200, bottom: 0, left: 50},
					width = 500,
					height = 500;

				var c = d3.scale.category20c();

				var x = d3.scale.linear()
					.range([0, width]);

				var xAxis = d3.svg.axis()
					.scale(x)
					.orient("top");

				var formatYears = d3.format("d");
				xAxis.tickFormat(formatYears);

				var svg = d3.select(idElem).append("svg")
					.attr("width", width + margin.left + margin.right)
					.attr("height", height + margin.top + margin.bottom)
					.append("g")
					.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

					x.domain(data.domain);

				var xScale = d3.scale.linear()
					.domain(data.domain)
					.range([0, width]);

				var labels = svg.append("g")
					.attr("class", "x axis")
					.attr("transform", "translate(0," + 0 + ")")
					.call(xAxis);
				if(print){
					labels.style({ 'stroke': '#000', 'fill': 'none', 'stroke-width': '1px', "color": "#000"}).selectAll('text').style({ 'stroke-width': '1px', 'fill': "#000", "font-size": "12px"});
				}else{
					labels.style({ 'stroke': '#FFF', 'fill': 'none', 'stroke-width': '1px', "color": "#FFF"}).selectAll('text').style({ 'stroke-width': '1px', 'fill': "#FFF", "font-size": "12px"});

				}

				for (var j = 0; j < data.series.length; j++) {
					var g = svg.append("g").attr("class","journal");

					var circles = g.selectAll("circle")
						.data(data.series[j]['series'])
						.enter()
						.append("circle");

					var text = g.selectAll("text")
						.data(data.series[j]['series'])
						.enter()
						.append("text");

					var rScale = d3.scale.linear()
						.domain([0, d3.max(data.series[j]['series'], function(d) { return d[1]; })])
						.range([2, 9]);

					circles
						.attr("cx", function(d, i) { return xScale(d[0]); })
						.attr("cy", j*20+20)
						.attr("r", function(d) { return rScale(d[1]); })
						.style("fill", function(d) { return c(j); });

					text
						.attr("y", j*20+25)
						.attr("x",function(d, i) { return xScale(d[0])-5; })
						.attr("class","value")
						.text(function(d){ return d[1]; })
						.style("fill", function(d) { return c(j); })
						.style("display","none");

					g.append("text")
						.attr("y", j*20+25)
						.attr("x",width+20)
						.attr("class","label")
						.text(truncate(data.series[j]['name'],30,"..."))
						.attr("font-size", "12px")
						.style("fill", function(d) { return c(j); });
				};

				// $("#"+idElem+" > svg > g")[0].getBoundingClientRect().width;
				// $("#"+idElem+" > svg > g")[0].getBoundingClientRect().height;
				if(print){
					var that = this;
					setTimeout(function(){
						that.resize_summary(idElem);
					}, 200);
				}


			},

			resize_summary: function(idElem){
				var _svg = $(idElem+" > svg"),
					artWork = _svg.find("> g")[0],
					width = artWork.getBoundingClientRect().width+60,
					height = artWork.getBoundingClientRect().height+50;

					_svg.attr({"width": width, "height": height});
			},


			hide: function(){
				this.$el.css({'opacity': 1}).animate({'opacity': 0,'display': 'none'}, 500);
				this.list.find( " > li" ).removeClass("active");
				this.show_status = false;
			},

			show_nav: function(eq){
				this.prev.show();
				this.next.show();
				eq = parseInt(eq);
				var prev = eq-1,
					next = eq+1;

				if( eq == 0 ){
					prev = 1;
					this.prev.hide();
				}else if( eq >= (this.total-1) ){
					next = this.total-1;
					if(eq > this.total){
						prev = this.total-1;
					}
					this.next.hide();
				}

				this.prev.attr("href", "#/timeline/"+prev);
				this.next.attr("href", "#/timeline/"+next);
			},

			show_elem: function( elem ){
				$("body").css({"overflow-y": "hidden"});

				// Trigger when the event finish
				this.on_animation_finish(elem, function(){
					elem.removeClass("animated bounceInUp fadeOutLeft");
					$("body").css({"overflow-y": "auto"});

					var i = 0;
					elem.find(".pie-chart").each(function(){
						i++;
						var e = $(this),
							id = e.attr("id");
						if( e.hasClass("showed") == false){
							setTimeout(function(){
								e.trigger("renderPie");
							},200*i);
						}
						e.addClass("showed");
					});
				});
				elem.addClass("active animated bounceInUp");
			},

			on_animation_finish: function( elem, cb ){
				elem.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					$(this).unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');
					cb();
				});
			},

			show_by_index: function( eq ){
				var view = this;

				view.show_nav(eq);

				// Apply the animation effect to the element
				var elem =  view.list.find(" > li").eq(eq),
					actived = view.list.find(" > li.active")[0];

				if( typeof actived != "undefined" ){
					var actived = $(actived);
					view.on_animation_finish(actived, function(){
						actived.removeClass("active fadeOutLeft");
						view.show_elem(elem);
					});
					actived.addClass("animated fadeOutLeft");
				}else{
					view.show_elem(elem);
				}
			},

			show: function(id){
				if(this.show_status == false){
					this.$el.css({'opacity': 0,'display': 'table-cell'}).animate({'opacity': 1}, 500);
					this.show_status = true;
				}
				this.show_by_index(id);
			},

			render : function() {
				var that = this;
				// Clear out this element.
				that.list.empty();

				// Render each sub-view and append it to the parent view's element.
				_( this._experiences ).each( function( exp_view ){
					that.list.append( exp_view.render().el ) ;
				});
				return that;
			}
		});
	return ExpsView;
});
