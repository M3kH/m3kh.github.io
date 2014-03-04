define(['jquery', 'd3'], function($, d3){

	var render = {

		// These are all experience data charts
		expData: [],

		// All Details
		details: {},

		// All Categories
		categories: [],

		// All Categories
		companies: {},

		/*
		 * Convert name in tag
		 * like "Graphic and Design"
		 * would "graphic-and-design"
		 */
		parseNameInTag: function( name ){
			return name.trim().toLowerCase().replace(" ", "-");
		},

		/*
		 * This get all the categories in one shot.
		 * for a general summary of skill, tools
		 */
		getAll: function( ){
			var result = [];
			for( var k in render.details ){
				var rl = result.length;
				result[rl] = render.getGlobalCategory(k);
			}
			return result;
		},

		/*
		 * This return a clean data to be processed and
		 * accept the following categories:
		 *
		 * languages, programming_languages, skills,
		 * software, framework, tools,
		 * materials
		 */
		getGlobalCategory: function( category ){

			if( typeof render.details[category] != "undefined" ){
				var data = render.details[category],
					res = {},
					result = [],
					startYear = new Date().getFullYear(),
					endYear = new Date().getFullYear();

				for( var k in data ){
					var rl = result.length,
						elem = data[k],
						series = [],
						c = 0;

						for( var i in elem.series ){
							var sl = series.length;
							if( i < startYear ){
								startYear = parseInt(i);
							}
							series[sl] = [i, elem.series[i]];
							c++;
						}

					result[rl] = { name: elem.name, total: elem.total, series: series };
				}

				res = { domain: [startYear, endYear], name: category, series: result };

				return res;

			}else{
				return false;
			}

		},

		countExp: 0,

		charts: {},

		renderSummaryChart: function( idElem, category ){
			// Original
			// [
				// {
					// "articles": [[2010, 6], [2011, 10], [2012, 11], [2013, 23], [2006, 1]],
					// "total": 51
					 // "name": "The Journal of neuroscience : the official journal of the Society for Neuroscience"
				// }
			// ]

			// This get the data
			// name: "languages"
			// domain: [2010, 2014]
			// series: [
				//{
				// name: "English"
				// series: [[2010, 8]]
				// total: 8
				//}
			//]

			var data = render.getGlobalCategory(category);

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
				// .style("margin-left", margin.left + "px")
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

				x.domain(data.domain);

			var xScale = d3.scale.linear()
				.domain(data.domain)
				.range([0, width]);

			svg.append("g")
				.attr("class", "x axis")
				.attr("transform", "translate(0," + 0 + ")")
				.call(xAxis)
				.style({ 'stroke': '#FFF', 'fill': 'none', 'stroke-width': '1px', "color": "#FFF"}).selectAll('text').style({ 'stroke-width': '1px', 'fill': "#FFF", "font-size": "12px"});

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
					// .on("mouseover", mouseover)
					// .on("mouseout", mouseout);
			};


			function mouseover(p) {
				var g = d3.select(this).node().parentNode;
				d3.select(g).selectAll("circle").style("display","none");
				d3.select(g).selectAll("text.value").style("display","block");
			}

			function mouseout(p) {
				var g = d3.select(this).node().parentNode;
				d3.select(g).selectAll("circle").style("display","block");
				d3.select(g).selectAll("text.value").style("display","none");
			}
		},

		showAll: function(){
			for( var i in render.charts ){
				render.showAllExperienceChart( i );
			}
		},

		showAllExperienceChart: function(id){
			if( render.utils.define(id, render.charts) ){
				for( var i in render.charts[id] ){
					render.showPieChart( render.charts[id][i] );
				}
			}
		},

		getPiePercent: function(all){
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
		},

		onMouseOverPieChart: function( d ){

				var pie = $(this).closest(".pie-chart"),
					labels = pie.find(".labels"),
					def = labels.find(".default"),
					label = labels.find(".selected .label"),
					value = labels.find(".selected .value");

				 var percentage = render.getPiePercent(d3.select("#"+pie.attr("id")+" .chart").selectAll("path"));

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

		onMouseLeavePieChart: function( ){

			var pie = $(this);
			pie.find(".labels").removeClass("active");
			d3.select("#"+pie.attr("id")+" .chart").selectAll("path").style("opacity", 1);
		},

		showPieChart: function(chart){

			// var color = d3.scale.ordinal()
				// .range(["#3399FF", "#5DAEF8", "#86C3FA", "#ADD6FB", "#D6EBFD"]);
			// var color = d3.scale.ordinal()
				// .range([
					// "#FF3CE4", "#8D33E8", "#86C3FA", "#4554FF", "#33A7E8",
					// "#FF60EB", "#9D54E8", "#6A77FF", "#54B4E8", "#5DFFDB"
				// ]);
			var color = d3.scale.ordinal()
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

			path.on("mouseover", render.onMouseOverPieChart );

			d3.select("#"+chart.idCont).on("mouseleave", render.onMouseLeavePieChart );
		},

		chartQueue: {},

		renderAllExpCharts: function(){
			for( var k in render.chartQueue ){
				render.renderChart( k );
				delete render.chartQueue[k];
			}
		},

		renderChart: function( id ){

			var series = render.chartQueue[id].series,
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
				.value(function(d) { return d.value.value; });

			var g = chart.selectAll(".arc")
				.data( pie( d3.entries( series ) ) )
				.enter().append("g")
				.attr("class", "arc");

			if( typeof render.charts[id] == "undefined" ){
				render.charts[id] = [];
			}

			var cl = render.charts[id].length;
			render.charts[id][cl] = {path: g, arc: arc, idCont: id, size: {width: width, height: height}};

			return true;
		},

		tagsToName: function( tag ){
			var t = tag;
			t = t.replace("-", " ");
			t = t.replace("_"," ");
			t = t.substr(0, 1).toUpperCase() + t.substr(1);
			return t;
		},

		/*
		 * This is for render the chart
		 * the category params should look like [ {name: "Graphic", value: 10}, ..]
		 */
		renderChartDetails: function( category, name, id ){

			var newId = name+"-"+id,
				elem = $("<div class='pie-chart' id='"+newId+"'/>");
				elem.append("<div class='labels'><span class='default'>"+render.tagsToName(name)+"</span><div class='selected'><span class='value'></span><span class='label'></span></div></div>");
				elem.append("<div class='chart'></div>");
				render.chartQueue[newId] = {"series": category, "name": name };
				return elem;
		},

		/*
		 * This add the details into the global statistic
		 */
		addGlobalDetail: function(category, det, year){

			var name = det.name,
				value = det.value,
				tag = render.parseNameInTag( name );

			// If not define declare a new empty category
			if(render.utils.define(category, render.details) == false ){
				render.details[category] = {};
			}

			// If the tag is not defined then create a new empty tag;
			if(render.utils.define(tag, render.details[category]) == false ){
				render.details[category][tag] = {name: name, total : 0, series: {}};
			}

			// Add the total result of the details
			render.details[category][tag].total += value;

			var s = render.details[category][tag].series;

			// Add to that year the amount of time spent (hipotetically hours);
			if( typeof year == "object" ){
				for( var k in year ){

					if( render.utils.define( year[k], s ) == false ){
						s[ year[k] ] = 0;
					}

					s[ year[k] ] += value;
				}
			}else{
				if( render.utils.define( year, s ) == false ){
					s[ year ] = 0;
				}
				s[ year ] += value;
			}

			render.details[category][tag].series = s;
		},

		/*
		 * This parse the details
		 */
		parseDetails: function( details, year, id ){

			var categories = {},
				elem = $("<div class='charts'><div class='spacer'></div></div>");


			for( var i in details ){
				var det = details[i];

				if(render.utils.define("category", det)){

					// @TODO would be good to manage here det.related
					var newDet = { name: det.name, value: det.hours };

					// Define the new category in categories
					if(render.utils.define(det.category, categories) === false){
						categories[ det.category ] = [];
					}

					// Add the new element to the array of that category
					// categories: { skills: [{name: "Test", value: 10}, {..}, ..] }
					var l = categories[det.category].length;
					categories[ det.category ][l] = newDet;

					// Add to the global statistics
					render.addGlobalDetail( det.category, newDet, year );

				}
			}

			// Append to the dom with the result of render.renderChartDetails
			for( var k in categories ){
				elem.find(".spacer").append( render.renderChartDetails(categories[k], k, id) );
			}

			// When it show should be render the charts with the animation
			elem.bind("show-charts", function(){
				render.showAllExperienceChart( id );
			});

			return elem;
		},

		/*
		 * This get years as string or array [2012, 2014];
		 */
		getYear: function( date ){
			var year = [];
			date = date.trim();

			if( date.indexOf(" - ") > -1 ){
				var d = date.split(" - "),
					y = [];

				for( var k in d ){
					var dd = d[k].split("-")[0];
					y[y.length] = dd;
				}

				var diff = y[1] - y[0];
				if( diff == 0 ){
					return parseInt(y[0]);
				}else{
					for( var i = 0; i < (diff+1); i++ ){
						year[year.length] = parseInt(y[0])+i;
					}
				}

			}

			return year;
		},

		/*
		 * Parse Url
		 */
		parseUrl: function( url, status ){
			if(typeof status == "undefined"){
				status = "enabled";
			}

			var c = 'url ';
			switch(status){
				case 'enabled':
				c += " enabled";
				break;
				case 'dismissed': case 'disabled':
				c += " disabled";
				break;
				default:
				c += " disabled";
				break;
			}

			return $("<a class='"+c+"' href='"+url+"' />").html(url);
		},

		/*
		 * This parse description
		 * @TODO This should doing an investigation of the Company OBJ and return the right details.
		 */
		parseCompany: function( company ){
			return $("<div class='company'/>").html(company);
		},

		/*
		 * This parse description
		 *
		 */
		parseDescription: function( description ){
			return $("<div class='description'/>").html(description);
		},

		/*
		 * This parse title
		 *
		 */
		parseTitle: function( title ){
			return $("<h2/>").html(title);
		},

		/*
		 * This parse single experience
		 */
		parseExp: function( exp ){

			// Add one to the count
			render.countExp++;

			// Create the li element
			var li = $("<li id='exp-"+render.countExp+"' />");

			//Define the Title
			if(render.utils.define("title", exp)){
				li.append(render.parseTitle(exp.title));
			}

			// Define year
			var year;
			if( render.utils.define("date", exp) && render.utils.define("year", exp) === false ){

				year = render.getYear(exp.date);
				if(typeof year == "object"){
					li.append($("<div class='year'><span>"+year[0]+" ~ "+year[(year.length-1)]+"</span></div>"));
				}else{
					li.append( $("<div class='year'><span>"+year+"</span></div>") );
				}

			}else{
				year = exp.year;
				li.append($("<div class='year'><span>"+year+"</span></div>"));
			}

			// Add the description
			if(render.utils.define("description", exp)){
				li.append(render.parseDescription(exp.description));
			}

			// Add the company
			if(render.utils.define("company", exp)){
				li.append(render.parseCompany(exp.company));
			}

			// Add the url
			if(render.utils.define("url", exp)){
				li.append(render.parseUrl(exp.url, exp.status ));
			}

			// Pare sthe details
			if(render.utils.define("details", exp)){
				li.append(render.parseDetails( exp.details, year, render.countExp ));
			}

			if(render.utils.define("images", exp)){
			}

			if(render.utils.define("screenshot", exp)){
			}

			return li;
		},

		/*
		 * This parse all the experiences
		 */
		parseAllExp: function( experiences ){
			var ul = $("<ul class='experencies'/>");

			for(var i in experiences ){
				var exp = experiences[i];
				ul.append(render.parseExp(exp));
			}

			return ul;
		},

		print: function( elem, experiences ){
			render.elem = $(elem);

			render.elem.append( render.parseAllExp( experiences ) );
			render.renderAllExpCharts();

			render.showAll();

			render.renderSummaryChart("#skills_summary", "skill");
			render.renderSummaryChart("#software_summary", "software");
			render.renderSummaryChart("#languages_summary", "programming_languages");
		},

		init: function( elem, experiences, bg_trans ){
			render.elem = $(elem);


			render.bg_trans = bg_trans;

			render.elem
				.append( render.parseAllExp( experiences ) );

			// render.elem.find( "> ul > li" ).hide();
			render.renderAllExpCharts();

			render.renderSummaryChart("#skills_summary", "skill");
			render.renderSummaryChart("#software_summary", "software");
			render.renderSummaryChart("#languages_summary", "programming_languages");

			render.elem.find("a.next").on("click", function(){
				render.next();
			});
			render.elem.find("a.prev").on("click", function(){
				render.prev();
			});
		},

		elem: null,

		activeElem: 0,

		transition: false,

		next: function(){
			if( render.transition  == false){
				render.transition = true;
				render.bg_trans();
				render.show((render.activeElem+1));
			}
		},

		hideNext: function(){
			if( render.transition  == false){
				render.transition = true;
				render.bg_trans();
				render.elem.find(".next").hide();
			}
		},

		prev: function(){
			render.bg_trans();
			if(render.activeElem != 0){
				render.show((render.activeElem-1));
			}
		},

		hidePrev: function(){
			render.elem.find(".prev").hide();
		},

		showContainer: function(){
			render.elem.css({'opacity': 0,'display': 'table-cell'}).animate({'opacity': 1}, 500);
			render.show(0);
		},

		show: function( element ){
			var lis = render.elem.find( ".experencies > li" ),
				l = lis.length;

			if( element > l ){ return false; }
			render.elem.find(".experencies-nav a").show();
			if(element == 0){
				render.hidePrev();
			}else if((element-1) == l){
				render.hideNext();
			}

			render.activeElem = element;
			var elem = lis.eq(element);

			var activeElement = render.elem.find( ".experencies > li.active" )[0];
			if( typeof activeElement != "undefined" ){
				$(activeElement).addClass("animated fadeOutLeft");
				$(activeElement).on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
					render.transition = false;
					$(activeElement).removeClass("animated fadeOutLeft active");
					$(activeElement).unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', null);
					render.showElem(elem);
				});
			}else{
				render.showElem(elem);
			}

			//Remove class active at all elements

			//Add class active
			return true;
		},

		hide: function(){
			render.elem.find( ".experencies > li" ).removeClass("active");
		},

		showElem: function( elem){

			// Apply the animation effect to the element
			elem.addClass("active animated bounceInUp");


			// Trigger when the event finish
			elem.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
				render.elem.removeClass("animated bounceInUp fadeOutLeft");

				elem.unbind('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend');

				var i = 0;
				elem.find(".pie-chart").each(function(){
					i++;
					var id = $(this).attr("id");
					if( $(this).hasClass("showed") == false){
						setTimeout(function(){
							render.showAllExperienceChart(id);
						},200*i);
					}
					$(this).addClass("showed");
				});
			});
		},

		utils: {
			define: function(prop, a){
				if(typeof a[prop] !== "undefined"){
					return true;
				}
				return false;
			}
		}
	};

	return render;

});
