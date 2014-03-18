define(['backbone', 'underscore', 'jquery', 'd3', 'companies', 'magnific-popup'], function(Backbone, _, $, d3, companies_data) {
	var get_percentage_chart = function(all){
			all = all[0];
			var arr = {};
			var total = 0;
			for( var i in all ){
				var data = all[i].__data__;
				if(typeof data != "undefined"){
					arr[data.data.key] = data.value;
					total += data.value;
				}
			}

			for( var k in arr ){
				arr[k] = ( arr[k] * 100 / total ).toFixed(2);
			}

			return arr;
	};

	var company = Backbone.Model.extend({}),
		companiesCollection = Backbone.Collection.extend({model: company}),
		companies = new companiesCollection(companies_data);

	var ExpView = Backbone.View.extend({
			tagName: 'li',
			className: 'exp',

			events: {
				"click .show_gallery": "open_gallery",
				"click .close_gallery": "close_gallery",
				"click .hide-element": "hide_elem"
			},

			hide_elem: function(){
				var li = this.$el;
				li.addClass("hide");
			},

			open_gallery: function(){

				var li = this.$el;
				var height = 0;
				var items = [];
				li.find(".gallery img").each(function(){
						items.push( {
							src: $(this).attr("src")
						} );
				});

				$.magnificPopup.open({
					items: items,
					type: 'image',
					// retina: {
						// ratio: 1,
						// replaceSrc: function(item, ratio) {
							// return item.src.replace(/\.\w+$/, function(m) { return '@2x' + m; });
						// }
					// },
					mainClass :  "mfp-zoom-out",
					gallery: {
						enabled: true
					},
					afterClose: function(){
						li.find(".gallery img").removeClass("mfp-hide");
					}
				});
				return false;
			},

			close_gallery: function(){
				return false;
			},

			pie: {

				on_mouse_over: function( d ){
					var pie = $(this).closest(".pie-chart"),
						labels = pie.find(".labels"),
						def = labels.find(".default"),
						label = labels.find(".selected .label"),
						value = labels.find(".selected .value");

					var percentage = get_percentage_chart(d3.select("#"+pie.attr("id")+" .chart").selectAll("path"));

					label.text(d.data.value.name);
					value.text(percentage[d.data.key]+"%");

					labels.addClass("active");

					d3.select("#"+pie.attr("id")+" .chart").selectAll("path")
					.style("opacity", 0.3);

					d3.select("#"+pie.attr("id")+" .chart").selectAll("path")
					.filter(function(node) {
						if( d.data.key == node.data.key ){
							return node;
						}
					}).style("opacity", 1);
				},

				on_mouse_leave: function( ){

					var pie = $(this);
					pie.find(".labels").removeClass("active");
					d3.select("#"+pie.attr("id")+" .chart").selectAll("path").style("opacity", 1);
				},

				render_for_animation: function( id, data ){
					var series = data,
						margin = {top: 20, right: 20, bottom: 20, left: 20};
						width = 200 - margin.left - margin.right;
						height = width - margin.top - margin.bottom;

					var chart = d3.select("#"+id+" .chart")
						.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")"),

					radius = Math.min(width, height) / 2,

					arc = d3.svg.arc()
						.outerRadius(radius)
						.innerRadius(radius - 10),

					pie = d3.layout.pie()
						.sort(null)
						.startAngle(1.1*Math.PI)
						.endAngle(3.1*Math.PI)
						.value(function(d) { return d.value.hours; });

					var g = chart.selectAll(".arc")
						.data( pie( d3.entries( series ) ) )
						.enter().append("g")
						.attr("class", "arc");

					return {path: g, arc: arc, id: id, size: {width: width, height: height}};

				},

				render: function( id, data ){
					var series = data,
						margin = {top: 20, right: 20, bottom: 20, left: 20};
						width = 200 - margin.left - margin.right;
						height = width - margin.top - margin.bottom;

					var chart = d3.select("#"+id+" .chart")
						.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")"),

					radius = Math.min(width, height) / 2,

					arc = d3.svg.arc()
						.outerRadius(radius)
						.innerRadius(radius - 10),

					pie = d3.layout.pie()
						.sort(null)
						.startAngle(1.1*Math.PI)
						.endAngle(3.1*Math.PI)
						.value(function(d) { return d.value.hours; });

					chart.append("g")
						.attr("class", "slices");
					chart.append("g")
						.attr("class", "labels");
					chart.append("g")
						.attr("class", "lines");

					var g = chart.select(".slices").selectAll(".arc")
						.data( pie( d3.entries( series ) ) )
						.enter().append("g")
						.attr("class", "arc");


					var color = d3.scale.ordinal()
						.range([
							"#B24739", "#DBFF62", "#FF7C6B", "#417ACC", "#F77CFF",
							"#5EFF6B", "#CDE856", "#FFE06B", "#E8A056", "#FF7E6B",
							"#FF6BA7", "#B461E8", "#7884FF", "#61CAE8", "#78FFBC",
							"#3CFF49", "#C9E837", "#FFD949", "#E89037", "#FF5F49",
							"#FF3F8F", "#A439E8", "#4C5DFF", "#39C2E8", "#4CFFA5"
						]);

					// return {path: g, arc: arc, id: id, size: {width: width, height: height}};

					var path = g.append("path");

					path.style("fill", function(d) { return color(d.data.value.name); }).attr('d', function(d) {
						return arc(d);
					});

					return true;

				},

				render_with_labels: function( id, data ){
					var series = data,
						margin = {top: 20, right: 100, bottom: 20, left: 100};
						width = 350 - margin.left - margin.right;
						height = width - margin.top - margin.bottom;

					var chart = d3.select("#"+id+" .chart")
						.append("svg")
						.attr("width", width + margin.left + margin.right)
						.attr("height", height + margin.top + margin.bottom)
						.append("g")
						.attr("transform", "translate(" + ((width/2)+margin.left) + "," + ((height/2)+margin.top) + ")"),

					radius = Math.min(width, height) / 2,

					arc = d3.svg.arc()
						.outerRadius(radius)
						.innerRadius(radius - 10),

					pie = d3.layout.pie()
						.sort(null)
						.startAngle(1.1*Math.PI)
						.endAngle(3.1*Math.PI)
						.value(function(d) { return d.value.hours; }),

					pie_data =  pie( d3.entries( series ) );

					chart.append("g")
						.attr("class", "slices");
					chart.append("g")
						.attr("class", "labels");
					chart.append("g")
						.attr("class", "lines");

					var g = chart.select(".slices").selectAll(".arc")
						.data( pie_data )
						.enter().append("g")
						.attr("class", "slice");


					var color = d3.scale.ordinal()
						.range([
							"#B24739", "#DBFF62", "#FF7C6B", "#417ACC", "#F77CFF",
							"#5EFF6B", "#CDE856", "#FFE06B", "#E8A056", "#FF7E6B",
							"#FF6BA7", "#B461E8", "#7884FF", "#61CAE8", "#78FFBC",
							"#3CFF49", "#C9E837", "#FFD949", "#E89037", "#FF5F49",
							"#FF3F8F", "#A439E8", "#4C5DFF", "#39C2E8", "#4CFFA5"
						]);

					// return {path: g, arc: arc, id: id, size: {width: width, height: height}};

					var path = g.append("path");

					path.style("fill", function(d) { return color(d.data.value.name); }).attr('d', function(d) {
						return arc(d);
					});


					/* ------- TEXT LABELS -------*/

					var text = chart.select(".labels").selectAll("text")
						.data( pie_data , function(d){
							// console.log(d);
							return d.data.value.name;
						});

					text.enter()
						.append("text")
						.attr("dy", ".35em")
						.style("font-size", "10px")
						.attr("transform", function(d) {
							var pos = arc.centroid(d);
							if(pos[0] > 0){
								pos[0] = radius+margin.left;
							}else{
								pos[0] = (radius*-1)-margin.right;
							}
							return "translate("+ pos +")";
						})
						.text(function(d) {
							return d.data.value.name;
						}).attr("text-anchor", function(d){
							var pos = arc.centroid(d);
							if(pos[0] > 0){
								return "end";
							}else{
								return "start";
							}
						});
					text.exit()
						.remove();

					/* ------- SLICE TO TEXT POLYLINES -------*/

					var polyline = chart.select(".lines").selectAll("polyline")
						.data(pie_data, function(d){
							return d.data.value.name;
						});
					polyline.enter()
						.append("polyline");

					polyline
					.attr("points", function(d){
						var pos = arc.centroid(d);
						var previous = _.clone(pos);
						if(pos[0] > 0){
							pos[0] = radius+margin.left;
							previous[0] = previous[0]+8;
						}else{
							pos[0] = (radius*-1)-margin.right;
							previous[0] = previous[0]-8;
						}

						pos[1] = pos[1]+8;
						previous[1] = previous[1]+8;


						return [arc.centroid(d), arc.centroid(d), previous, pos];
					}).attr("stroke", "#000").attr("stroke-width", 1).attr("fill", "none");
					polyline.exit()
						.remove();

					return true;

				},

				show_pie_chart: function(chart, that){
					var that = this,
						color = d3.scale.ordinal()
						.range([
							"#B24739", "#DBFF62", "#FF7C6B", "#417ACC", "#F77CFF",
							"#5EFF6B", "#CDE856", "#FFE06B", "#E8A056", "#FF7E6B",
							"#FF6BA7", "#B461E8", "#7884FF", "#61CAE8", "#78FFBC",
							"#3CFF49", "#C9E837", "#FFD949", "#E89037", "#FF5F49",
							"#FF3F8F", "#A439E8", "#4C5DFF", "#39C2E8", "#4CFFA5"
						]);


					var path = chart.path.append("path");

					path.style("fill", function(d) { return color(d.data.value.name); })
					.transition().delay(function(d, i) { return i * 100; }).duration(200)
					.attrTween('d', function(d) {
						var i = d3.interpolate(d.startAngle+0.1, d.endAngle);
						return function(t) {
							d.endAngle = i(t);
							return chart.arc(d);
						};
					});

					path.on("mouseover", that.on_mouse_over );

					d3.select("#"+chart.id).on("mouseleave", that.on_mouse_leave );
				}
			},

			initialize : function( options ) {
				// Here we have some cool functions so
				// var model = this.model;
				this.options = options;

				// We know each mode has the category properties
				// here is the array we know we want render
				// _.each(model.categories, function(category){
					// var data = model.get_global_category(category);
				// });

				// // And we can keep the data chart like this
				// this.model.get_details_data_chart('category_name');
			},


			tags_to_name: function( tag ){
				var t = tag;
				t = t.replace("-", " ");
				t = t.replace("_"," ");
				t = t.substr(0, 1).toUpperCase() + t.substr(1);
				return t;
			},

			get_company_desc: function(company){
				var c = companies.where({ tag : company});
				if(c.length > 0 && typeof c[0].attributes != "undefined" ){
					return c[0].attributes;
				}
				return false;
			},

			render_company_desc: function(attributes){
				if( typeof attributes.company != "undefined" && attributes.company!= "me"){
					var company = attributes.company,
						data = this.get_company_desc(company),
						tmpl = "";
					if( data != false ){
						tmpl += "<dl class=\"dl-horizontal\">";
							if(typeof data.name != "undefined" && data.name != ""){
								tmpl += "<dt>Company Name</dt>";
								tmpl += "<dd><%= name %></dd>";
							}
							if(typeof data.urls != "undefined"){

								tmpl += "<dt>Website</dt><dd>";
								tmpl += "<% _.each(urls, function(url){ ";
								tmpl += " if(url.status == true){ %>";
									tmpl += "<a href='<%= url.link %>' target='_blank' title='<%= url.title %>'><%= url.title %></a><br/>";
								tmpl += "<% }else{ %>";
									tmpl += "<a href='#' title='<%= url.title %>' class=\"disabled\"><%= url.title %></a><br/>";
								tmpl += "<% } ";
								tmpl += "}); %> </dd>";
							}
						tmpl += "</dl>";
						return _.template(tmpl, data);
					}
					return "";
				}else{
					return false;
				}
			},

			render_gallery : function(images){
				var base_url = "http://statics.ideabile.com/img/works/",
					tmpl = "";

					tmpl += "<% _.each(images, function(image,i){ %>";
						// tmpl += " if(i == 0){ %>";
							// tmpl += "<img src='<%= base %><%= image.url %>' alt='<%= image.name %>' class='active' /> ";
						// tmpl += "<% }else{ %>";
							tmpl += "<img src='<%= base %><%= image.url %>' alt='<%= image.name %>' /> ";
						// tmpl += "<% } ";
					tmpl += "<%  }); %>";

				return _.template(tmpl, {images: images, base: base_url});
			},

			render_years: function(attributes){
				var tmpl = '';
				if( _.isArray(attributes.year) ){
					tmpl += "<div class='year'><span><%= year[0] %> ~ <%= year[1] %></span></div>";
				}else if( typeof attributes.year !="undefined" ){
					tmpl += "<div class='year'><span><%= year %></span></div>";
				}
				return tmpl;
			},

			tmpl_print: function(attributes){
				var tmpl = '';

				var years = this.render_years(attributes),
					company_desc =  this.render_company_desc(attributes);

				tmpl += "<div class='cross'><button class='btn btn-danger btn-xs hide-element'>Don't print this</button></div>";
				tmpl += "<div class='row'>";
					if( company_desc != "" && company_desc!= false){
						/*
						 * Render the title with the company desc table
						 */
						tmpl += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>";
							tmpl += "<h2><%= title %></h2>";
							tmpl += years;
						tmpl += "</div>";
						tmpl += "<div class='col-xs-6 col-sm-6 col-md-6 col-lg-6'>";
								tmpl += company_desc;
						tmpl += "</div>";

					}else{
						tmpl += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
							tmpl += "<h2><%= title %></h2>";
							tmpl += years;
						tmpl += "</div>";
					}


					tmpl += "<div class='col-xs-12 col-sm-12 col-md-12 col-lg-12'>";
						/*
						 * Render charts place holder
						 */
						tmpl += "<div class='charts'><div class='spacer'>";
						tmpl += "<% _.each(categories, function(name, index) { %>";
								tmpl += "<div class='pie-chart' id='<%= cid %>-chart-<%= name %>' data-category='<%= name %>'>";
									tmpl += "<% var n = tagsToName(name); %><div class='labels'><span class='default'><%= n %></span><div class='selected'><span class='value'></span><span class='label'></span></div></div>";
									tmpl += "<div class='chart'></div>";
								tmpl += "</div>";
							tmpl += "<% }); %>";
						tmpl += "</div></div>";

						tmpl += "<div class='description'><%= description %></div>";
					tmpl += "</div>";
				tmpl += "</div>";
				return tmpl;
			},

			tmpl: function(attributes){
				var tmpl = '',
					glr_button = '';
				// console.log( this.options.print );

				//This render the gallery
				if( typeof attributes.images != "undefined" && attributes.images.length > 0 ){
					tmpl += "<div class='title'><div class='gallery'>"+ this.render_gallery(attributes.images)+"</div>";

					if(attributes.images.length > 1){
						glr_button += "<a href=\"#showGallery\" class=\"btn btn-primary show_gallery\">Show the gallery <span class='icon icon-pictures'></span></a>";
					}

					tmpl +="<div class='overlay'><h2><%= title %></h2>"+glr_button+"</div></div>";
				}else{
					tmpl += "<h2><%= title %></h2>";
				}

					if( _.isArray(attributes.year) ){
						tmpl += "<div class='year'><span><%= year[0] %> ~ <%= year[1] %></span></div>";
					}else if( typeof attributes.year !="undefined" ){
						tmpl += "<div class='year'><span><%= year %></span></div>";
					}
					tmpl += "<div class='row'>";
						tmpl += "<div class='col-xs-12 col-sm-12 col-md-6 col-lg-6'><div class='charts'><div class='spacer'>";

						tmpl += "<% _.each(categories, function(name, index) { %>";
							tmpl += "<div class='pie-chart' id='<%= cid %>-chart-<%= name %>' data-category='<%= name %>'>";
								tmpl += "<% var n = tagsToName(name); %><div class='labels'><span class='default'><%= n %></span><div class='selected'><span class='value'></span><span class='label'></span></div></div>";
								tmpl += "<div class='chart'></div>";
							tmpl += "</div>";
						tmpl += "<% }); %>";
					tmpl += "</div></div></div>";
					tmpl += "<div class='col-xs-12 col-sm-12 col-md-6 col-lg-6'>";
						if( typeof attributes.company != "undefined" && attributes.company!= "me"){
							tmpl += this.render_company_desc(attributes);
						}
						tmpl += "<div class='description'><%= description %></div>";
					tmpl += "</div>";
				tmpl += "</div>";
				return tmpl;
			},

			template: function(attributes, print){
				var tmpl = '';

				if(this.options.print){
					tmpl = this.tmpl_print(attributes);
				}else{
					tmpl = this.tmpl(attributes);
				}

				return _.template(tmpl, attributes);
			},

			waiting_rendering: {},

			show_chart: function( id ){
				if(this.options.print == false){
					var that = this,
						item = this.waiting_rendering[id];
					if(item != "undefined" ){
						this.pie.show_pie_chart(item);
						delete this.waiting_rendering[id];
					}else{
						return false;
					}
				}
			},

			render_details_chart: function(id, category){
				var data = this.model.get_data_chart(category);
				if(this.options.print){
					this.pie.render_with_labels(id, data);
				}else{
					this.waiting_rendering[id] = this.pie.render_for_animation(id, data);
				}
			},

			render : function() {
				var that = this,
					data = that.model.attributes;

 				data.cid = that.model.cid;
 				data.tagsToName = that.tags_to_name;

				that.$el.html(that.template(data));
				if( data.categories.length > 0 ){
					// Async render chart;
					setTimeout(function(){

						if( typeof data.images != "undefined" && data.images.length > 0 ){
							var sf = that.$el.find(".gallery img:first").attr("src");
							that.$el.find(".gallery").attr("style", 'background-image:url("'+sf+'");');
						}

						that.$el.find(".pie-chart").each(function(){

							var elem = $(this),
								category =elem.data("category"),
								id = $(this).attr("id");
							// This ask for render the chart
							that.render_details_chart(id, category);

							elem.on("renderPie", function(){
								that.show_chart(id);
								$(this).unbind("renderPie");
							});
						});
					},60);

				}

				return that;
			}
		});
	return ExpView;
});
