var ChartistHtml = {};
ChartistHtml.config = {
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	chartOptions: {
		bar: {
			options: {
				seriesBarDistance: 10,
				axisX: {
					offset: 70,
					position: 'end'
				},
				axisY: {
      				offset: 70,
      				position: 'start',
      				labelInterpolationFnc: function(value) {
      					return value[0];
      				}
      			},
      			stackBars: true,
				horizontalBars: true,
				reverseData: true
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
		line: {},
		pie: {
			options: {
				labelInterpolationFnc: function(value) {
					return value[0];
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
 * Splits string into array based on configured separator characters.
 * Try all of them until one is found in the string.
 * @param {string} string - String to be split.
 * @returns {array} array - Split array. 
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
 * Reads and parses an html string into a json object.
 * Json object contains elements in the format that the Chartist library expects. 
 * @param {string} string - string of html to be parsed.
 * @returns {object} object - json data object. 
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

ChartistHtml.elementToJson = function($el) {

	var json = {},
		data;

	json.title = $el.attr('data-title'); 
	json.type = $el.attr('data-type');
	json.options = ChartistHtml.splitString($el.attr('data-options'));

	data = ChartistHtml.innerHtmlToJson($el.html(), json.type);

	json.series = data.series;
	json.labels = data.labels;

	return json;
};

/*
 * Takes a string and capitalizes the first character. 
 * @param {string} string - json.type string
 * @returns {string} string - json.type string with first character capitalized. 
 */
ChartistHtml.toSentenceCase = function(str) {
      return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
};

ChartistHtml.renderChart = function($el) {
	// extract the data
	// create a new chartist chart
	var $el = $('.cts'),
		chartData = ChartistHtml.elementToJson($el),
		chartType = ChartistHtml.toSentenceCase(chartData.type);

	console.log(chartType, chartData);
		
	var data = {
		labels: chartData.labels,
		series: chartData.series
	};

	var options,
		responsiveOptions;

	if (chartData.type === 'pie') {	
		options = ChartistHtml.config.chartOptions.pie.options;
		responsiveOptions = ChartistHtml.config.chartOptions.pie.responsiveOptions;
		
		console.log(options, responsiveOptions);
	} else if (chartData.type === 'bar') {
		options = ChartistHtml.config.chartOptions.bar.options;
		responsiveOptions = ChartistHtml.config.chartOptions.bar.responsiveOptions;
		
		console.log(options, responsiveOptions);
	} else {}

	var chart = new Chartist[chartType]('.ct-chart', data, options, responsiveOptions);

	return chart;
};