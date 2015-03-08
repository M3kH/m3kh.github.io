define(['backbone', 'underscore'], function(Backbone, _) {

	var Exp = Backbone.Model.extend({
			defaults: {
				title: '',
				details: [],
				categories: [],
				url: '',
				screenshot: [],
				showed: false,
				pictures: []
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

			initialize: function( ){
				var model = this;
				this.set("year", this.get_year(model.attributes) );
				this.set("categories", _.uniq(_.pluck( model.get("details"), 'category' ) ) );
			},

			/*
			 * This how should look the array returned
			 */
			// @TODO would be good to manage here det.related
			// var newDet = { name: det.name, value: det.hours };

			get_all_data_chart: function( ){
				var model = this;
				return _.map( model.get("categories"), function( name ){
					// return categories;
					// c.push(this.details)
					return model.get_data_chart( name );
				});
			},

			get_data_chart: function(category){
				var model = this;
				// var evens = _.filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
				return _.where(model.get("details"), {category: category});
			}
	});

	return  Exp;
});
