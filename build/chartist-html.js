var ChartistHtml = {};
ChartistHtml.config = {
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	chartOptions: {
		pie: {
			options: {
				base: {
					labelInterpolationFnc: function(value) {
						return value[0];
					}
				}
			},
			responsiveOptions: [
				  ['screen and (min-width: 640px)', {
				    chartPadding: 30,
				    labelOffset: 100,
				    labelInterpolationFnc: function(value) {
				      return value;
				    }
				  }],
				  ['screen and (min-width: 1024px)', {
				    chartPadding: 20,
				    labelOffset: 80
				  }]
			]
		},
		bar: {
			options: {
				base: {
					seriesBarDistance: 10,
					axisX: {
						offset: 70,
						position: 'end',
						labelInterpolationFnc: function(value) {
							return value[0];
						}
					},
					axisY: {
      					offset: 70,
      					position: 'start',
      					onlyInteger: true
      				}
				},
				stacked: {
					stackBars: true
				},
				horizontal: {
					horizontalBars: true,
					reverseData: true,
					axisX: {
      					offset: 70,
      					position: 'start',
      					onlyInteger: true
      				},
      				axisY: {
						offset: 70,
						position: 'start'
      				}
				}
			},
			responsiveOptions: [
				['screen and (min-width: 640px)', {
				    seriesBarDistance: 5,
				    axisX: {
				    	labelInterpolationFnc: function(value) {
				      		return value;
				    	}
				    }
				}],
				['screen and (min-width: 1024px)', {
				    seriesBarDistance: 10,
				    axisX: {
				    	labelInterpolationFnc: function(value) {
				      		return value;
				    	}
				    }	
				}],
			]
		},
		line: {
			options: {
				base: {
					showArea: false,
					axisX: {
						position: 'end',
						labelInterpolationFnc: function(value) {
      						return value[0];
      					}
					}, 
					axisY: {
						position: 'start',
						onlyInteger: true
					}
				}
			},
			responsiveOptions: [
				  ['screen and (min-width: 640px)', {
				    chartPadding: 30,
				    labelOffset: 100,
				    labelInterpolationFnc: function(value) {
				      return value;
				    }
				  }],
				  ['screen and (min-width: 1024px)', {
				    chartPadding: 20,
				    labelOffset: 80,
				    labelInterpolationFnc: function(value) {
				      return value;
				    }
				  }]
			]
		}
	}	
};

ChartistHtml.getBaseClass = function() {
	return this.config.baseClass;
};

ChartistHtml.getLabelsClass = function() {
	return this.config.baseClass + this.config.elementClassFragment + 'labels';
};

ChartistHtml.getSeriesClass = function() {
	return this.config.baseClass + this.config.elementClassFragment + 'series';
};

/*
 * Splits string into array based on configured separator characters
 * Try all of them until one is found in the string
 * @param {string} string - String to be split
 * @returns {array} array - Split array
 */
ChartistHtml.splitString = function(string) {
	var separators = this.config.seriesSeparators,
		separator,
		splitArray,
		i, max;

	if (typeof string === "undefined") { return; }

	for(i = 0, max = separators.length; i < max; i += 1) {
		separator = separators[i];
		if (string.indexOf(separator) > -1) { 
			return string.split(separator);
		}
	}

	return [ string ];
};

/*
 * Reads and parses an html string into a json object
 * Json object contains elements in the format that the Chartist library expects 
 * @param {string} string - string of html to be parsed
 * @returns {object} object - json data object 
 */
ChartistHtml.innerHtmlToJson = function(html, chartType) {
	var $el = $(html),
		$labelsEl = $($el.find('.' + this.getLabelsClass())),
		$seriesEl = $($el.find('.' + this.getSeriesClass())),
		json = {};
	
	if (chartType !== 'pie') {
		json.labels = ChartistHtml.splitString($labelsEl.html());
	} else {
		json.labels = [];
	}

	json.series = [];

	$seriesEl.each(function() {

		var $seriEl = $(this),
			stringSeries = ChartistHtml.splitString($seriEl.html()),
			numberSeries = [],
			i, max;

		for(i = 0, max = stringSeries.length; i < max; i += 1) {
			numberSeries.push(parseFloat(stringSeries[i]));
		}

		if ([ 'bar', 'line' ].indexOf(chartType) > -1) {
			json.series.push(numberSeries);
		} else if (chartType === 'pie') {
			json.series.push(numberSeries[0]);
			json.labels.push($seriEl.attr('data-name'));
		} else {
		}
	});

	return json;
};

/*
 * Takes the current html element and builds a json object  
 * @param {string} - string of html
 * @returns {object} - json data object
 */
ChartistHtml.elementToJson = function($el) {

	var json = {},
		data;

	json.title = $el.attr('data-title'); 
	json.type = $el.attr('data-type');
	
	var subtypeOptionA = ChartistHtml.splitString($el.attr('data-subtypes'));
	var subtypeOptionB = ChartistHtml.splitString($el.attr('data-options'));

	if (typeof subtypeOptionA !== "undefined") {
		json.subtypes = subtypeOptionA;
	} else {
		json.subtypes = subtypeOptionB;
	}

	data = ChartistHtml.innerHtmlToJson($el.html(), json.type);

	json.series = data.series;
	json.labels = data.labels;

	return json;
};

/*
 * Takes a string and capitalizes the first character 
 * @param {string} string - json.type string
 * @returns {string} string - json.type string with first character capitalized 
 */
ChartistHtml.toSentenceCase = function(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
};

ChartistHtml.renderChart = function($el, chartId) {
	// extract the data
	// create a new chartist chart

	if(typeof chartId === "undefined") { chartId = "apples"; }

	var chartData = ChartistHtml.elementToJson($el),
		chartType = ChartistHtml.toSentenceCase(chartData.type),
		chartBaseClass = 'ct-chart',
		chartClass = chartBaseClass + '-' + chartId;

	var options = ChartistHtml.getOptions(chartData.type, chartData.subtypes),
		responsiveOptions = ChartistHtml.config.chartOptions[chartData.type].responsiveOptions;

	var $chartContainer = $('<div class="' + chartBaseClass + ' ct-perfect-fourth ' + chartClass + '"><div>');

	$el.append($chartContainer);

	var chart = new Chartist[chartType]('.' + chartClass, chartData, options, responsiveOptions);

	return chart;
};

ChartistHtml.renderAll = function() {
	var i = 0;
	$('.' + ChartistHtml.config.baseClass).each(function() {
		console.log($(this), i);
		ChartistHtml.renderChart($(this), i);
		i += 1;
	});
};
/*
 * Merges the elements in two objects to create a new object with all chart options
 * @param {string} string - type of chart
 * @param {array} array - chart subtypes specified in html string
 * @param {object} config - Optional chart options object. Defaults to ChartistHtml.config.chartOptions
 * @returns {object} object - new AllOptions object that merges defaults with specifics, and defaults and specifics stay the same 
 */
ChartistHtml.getOptions = function(type, subtypes, chartOptions) {
	if (typeof chartOptions === "undefined") {
		chartOptions = ChartistHtml.config.chartOptions;
	}

	var chartTypeOptions = chartOptions[type].options;
	var defaults = chartTypeOptions.base;
	var specifics;

	var allOptions = $.extend({}, defaults);

	var i, max, subtype;
	for(i = 0, max = subtypes.length; i < max; i += 1) {
		subtype = subtypes[i];
		specifics = chartTypeOptions[subtype];
		if (typeof specifics !== "undefined") {
			allOptions = $.extend(allOptions, specifics);
		}
	}

	return allOptions;
};