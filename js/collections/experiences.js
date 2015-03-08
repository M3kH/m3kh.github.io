define(['backbone', 'underscore', 'js/models/experience'], function(Backbone, _, exp_model) {

	var ExpCollection = Backbone.Collection.extend({

		model: exp_model,

		all_details: {},

		/*
		 * Create the model and export it.
		 */
		initialize: function( experiences, options ){
			this.all_details = {};
			this.parse_experiences( experiences );
		},

		/*
		 * This will add the detail to all_details
		 */
		parse_experiences: function(models){
			var c = this;

			// Parse the collections
			_.each(models, function(element, index, list){
				// Parse the details
				// For get the globals;

				var year = c.get_year( element );
				if(_.isArray(element.details)){
					_.each(element.details, function(detail, index, list){
						c.add_detail(detail.category, detail, year);
					});
				}
			});
		},

		/*
		 * This will return year as "YYYY" or if is daterange ["YYYY", "YYYY", ...]
		 */
		get_year: function( element ){
			var y;
			if(typeof element.date != "undefined"){
				y = this.parse_date_range(element.date);
			}else if( typeof element.year ){
				y = element.year;
			}

			return y;
		},

		/*
		 * This return year as a string or array
		 */
		parse_date_range: function( date ){
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
		 * This add the details into the global statistic
		 */
		add_detail: function(category, det, year){
			// console.log(det);
			var name = det.name,
				value = det.hours,
				tag = this.parse_name_in_tag( name ),
				details = this.all_details;

			// If not define declare a new empty category
			if( _.isObject( details[category] ) == false ){
				details[category] = {};
			}

			// If the tag is not defined then create a new empty tag;
			if( _.isObject( details[category][tag] )  == false ){
				details[category][tag] = {name: name, total : 0, series: {}};
			}

			// Add the total result of the details
			details[category][tag].total += value;

			var s = details[category][tag].series;

			// Add to that year the amount of time spent (hipotetically hours);
			if( _.isArray(year) ){
				for( var k in year ){

					if( _.isNumber( s[year[k]] ) == false ){
						s[ year[k] ] = 0;
					}

					s[ year[k] ] += value;
				}
			}else{
				if( _.isNumber( s[year] ) == false ){
					s[ year ] = 0;
				}
				s[ year ] += value;
			}

			details[category][tag].series = s;

			this.all_details = details;
		},

		/*
		 * This return a clean data to be processed and
		 * accept the following categories:
		 *
		 * languages, programming_languages, skills,
		 * software, framework, tools,
		 * materials
		 */
		get_global_category: function( category ){

			if( _.isObject( this.all_details[category] ) ){
				var data = this.all_details[category],
					res = {},
					result = [],
					startYear = new Date().getFullYear(),
					endYear = new Date().getFullYear();

				// for( var k in data ){
				_.each( data, function(elem, index){
					var rl = result.length,
						series = [];

						// for( var i in elem.series ){
						var series  = _.map( elem.series, function(value, year){
							var sl = series.length;
							if( year < startYear ){
								startYear = parseInt(year);
							}
							return [year, value];
						});

					result[rl] = { name: elem.name, total: elem.total, series: series };
				});

				res = { domain: [startYear, endYear], name: category, series: result };

				return res;

			}else{
				return false;
			}

		},

		/*
		 * Convert name in tag
		 * like "Graphic and Design"
		 * would "graphic-and-design"
		 */
		parse_name_in_tag: function( name ){
			return name.trim().toLowerCase().replace(" ", "-");
		}

	});

	return ExpCollection;
});
