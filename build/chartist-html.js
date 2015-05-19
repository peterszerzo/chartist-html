var ChartistHtml = {};

ChartistHtml.letterOrder = function() {

};
ChartistHtml.config = {
	colorSpectrum: [ '#85026A', '#019fde' ],
	backgroundColor: '#FFFFFF',
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	xAxis: {
		labelInterpolationFnc: function(v) {
			if (v > 999) {
				return numeral(v).format('($0.0a)');
			}
			return numeral(v).format('($0)');
		}
	},
	tooltipTemplate: function(data) {
		var string = "",
			formatter = (data.value > 999) ? '($0.0a)' : '($0)';

		string = numeral(data.value).format(formatter);
		
		return '<h1>' + data.label + '</h1>' + '<p>' + string + '</p>';
	},
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
      					position: 'end',
      					onlyInteger: true
      				},
      				axisY: {
						offset: 70,
						position: 'start',
						labelInterpolationFnc: function(value) {
							return value;
						}
      				}
      			}
			},
			responsiveOptions: [
				['screen and (min-width: 640px)', {
					axisX: {
					    labelInterpolationFnc: function(value) {
					      	return value;
					    }
					}
				}],
				['screen and (min-width: 1024px)', {
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
					axisX: {
					    labelInterpolationFnc: function(value) {
					      	return value;
					    }
					}
				}],
				['screen and (min-width: 1024px)', {
					axisX: {
					    labelInterpolationFnc: function(value) {
					      	return value;
					    }
					}	
				}],
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

/* Extract the data and create a new chartist chart
* @param {string} string - html string
* @param {number} number - unique chart id to be added to existing chartBaseClass
* @returns {object} object - new chart object created using the constructor function 'new'
*/
// ChartistHtml.renderChart = function($el, chartId) {
// 	if (typeof chartId === "undefined") { 
// 		chartId = "apples"; 
// 	}

// 	var chartData = ChartistHtml.elementToJson($el),
// 		chartType = ChartistHtml.toSentenceCase(chartData.type),
// 		chartBaseClass = 'ct-chart',
// 		chartClass = chartBaseClass + '-' + chartId;

// 	var options = ChartistHtml.getOptions(chartData.type, chartData.subtypes),
// 		responsiveOptions = ChartistHtml.config.chartOptions[chartData.type].responsiveOptions;

// 	var $chartContainer = $('<div class="' + chartBaseClass + ' ct-perfect-fourth ' + chartClass + '"><div>');

// 	$el.append($chartContainer);

// 	var chart = new Chartist[chartType]('.' + chartClass, chartData, options, responsiveOptions);
// 	console.log(chart);
	
// 	return chart;
// };

ChartistHtml.renderAll = function() {
	new ChartistHtml.ChartCollectionManager($('.' + ChartistHtml.config.baseClass)).render();
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
	if(typeof subtypes !== "undefined" && subtypes.length > 0) {
		for(i = 0, max = subtypes.length; i < max; i += 1) {
			subtype = subtypes[i];
			specifics = chartTypeOptions[subtype];
			if (typeof specifics !== "undefined") {
				allOptions = $.extend(allOptions, specifics);
			}
		}
	}

	return allOptions;
};
ChartistHtml.ChartManager = function($el, chartId) {
	this.id = (typeof chartId !== "undefined") ? chartId : 1;
	this.type = undefined;
	this.$el = $el;
	return this;
};

ChartistHtml.ChartManager.prototype = {

	constructor: ChartistHtml.ChartManager,

	componentSubclassNames: {
		'pie': 'slice',
		'line': 'point',
		'bar': 'bar'
	},

	getType: function() {

	},

	isFillChart: function() {

	},

	isStrokeChart: function() {

	},

	innerHtmlToJson: function() {

		var chartType = this.type,
			$el = this.$el,
			$labelsEl = $($el.find('.' + ChartistHtml.getLabelsClass())),
			$seriesEl = $($el.find('.' + ChartistHtml.getSeriesClass())),
			json = {
				series: [],
				seriesLabels: [] // for line and bar charts only
			};
		
		if (chartType !== 'pie') {
			json.labels = ChartistHtml.splitString($labelsEl.html());
		} else {
			json.labels = [];
		}

		$seriesEl.each(function() {

			var $seriEl = $(this),
				stringSeries = ChartistHtml.splitString($seriEl.html()),
				numberSeries = [],
				i, max;

			for(i = 0, max = stringSeries.length; i < max; i += 1) {
				numberSeries.push(parseFloat(stringSeries[i]));
			}

			if ([ 'bar', 'line' ].indexOf(chartType) > -1) {
				json.seriesLabels.push($seriEl.attr('data-name'));
				json.series.push(numberSeries);
			} else if (chartType === 'pie') {
				json.series.push(numberSeries[0]);
				json.labels.push($seriEl.attr('data-name'));
			} else {

			}

		});

		return json;
	},

	getJson: function() {
		
		var $el = this.$el,
			json = {},
			data;

		json.title = $el.attr('data-title');
		json.type = $el.attr('data-type');

		this.type = json.type;
		
		var subtypeOptionA = ChartistHtml.splitString($el.attr('data-subtypes'));
		var subtypeOptionB = ChartistHtml.splitString($el.attr('data-options'));

		if (typeof subtypeOptionA !== "undefined") {
			json.subtypes = subtypeOptionA;
		} else {
			json.subtypes = subtypeOptionB;
		}

		data = this.innerHtmlToJson($el.html(), json.type);

		json = $.extend(json, data);

		return json;
	},

	render: function() {

		var self = this,
			chartData = this.getJson(this.$el),
			chartType = ChartistHtml.toSentenceCase(chartData.type),
			chartBaseClass = 'ct-chart',
			chartClass = chartBaseClass + '-' + this.id;

		var options = ChartistHtml.getOptions(chartData.type, chartData.subtypes),
			responsiveOptions = ChartistHtml.config.chartOptions[chartData.type].responsiveOptions;

		var $chartContainer = $('<div class="' + chartBaseClass + ' ct-perfect-fourth ' + chartClass + '"><div>');

		this.$chartContainer = $chartContainer;
		this.$el.append($chartContainer);

		var chart = new Chartist[chartType]('.' + chartClass, chartData, options, responsiveOptions);
		
		chart.on('created', function() {
			self.chart = chart;
			self.$chart = $(self.$el.find('.ct-chart'));
			self._appendTitle();
			self._bindTooltips();
			self._addColoring();
		});

		return this;
	},

	destroy: function() {

		var chart = this.chart;

		this._unbindTooltips();

        window.removeEventListener('resize', chart.resizeListener);
        chart.optionsProvider.removeMediaQueryListeners();

        this.$chartContainer.remove();
        this.$titleContainer.remove();

		
	},

	_appendTitle: function() {

		var title = this.chart.data.title
			$el = $('<div>' + title + '</div>');

		$el.addClass(ChartistHtml.config.baseClass + '__title');

		this.$el.prepend($el);
		this.$titleContainer = $el;

		return this;
	},

	_addColoring: function() {

		var self = this;

		if (typeof chroma !== "undefined") {

			if (typeof ChartistHtml.config.colorSpectrum !== "undefined") {

				var seriesCount = this.chart.data.series.length;

				this.$chart.find('.ct-series').each(function(i) {

					var $el = $(this),
						chartType = self.type,
						firstColor = ChartistHtml.config.colorSpectrum[0],
						lastColor = ChartistHtml.config.colorSpectrum[1],
						scale = chroma.scale([firstColor, lastColor]).domain([0, seriesCount-1]),
						color;

					if (typeof scale(i) !== "undefined") {

						color = scale(i).css();

						if (chartType === 'pie') {
							$el.find('path').each(function() { 
								$(this).css({ 'fill': color, 'stroke': ChartistHtml.config.backgroundColor, 'stroke-width': 3 }); 
							});
						} else {
							$el.find('line, path').each(function() { 
								$(this).css('stroke', color); 
							});
						}

					}
					
				});
			}
		}

		return this;
	},

	_bindTooltips: function() {

		var self = this,
			className = ChartistHtml.config.baseClass + '__tooltip',
			$chart = this.$chart,
			$tooltip = $chart
				.append('<div class="' + className + '"></div>')
				.find('.' + className)
				.hide(),
			chartType = this.type,
			componentSelector = '.ct-' + this.componentSubclassNames[this.type];

		this.$tooltip = $tooltip;

		$chart.on('mouseenter', componentSelector, function() {
			var $point = $(this),
				value = $point.attr('ct:value'),
				series = $point.parent().attr('class'),
				index,
				label;

			index = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'].indexOf(series[series.length - 1]);

			if (chartType === 'pie') {
				label = self.chart.data.labels[index];
			} else {
				label = self.chart.data.seriesLabels[index];
			}

			$tooltip.css({ 'visibility': 'visible' });
			$tooltip.html(ChartistHtml.config.tooltipTemplate({ label: label, value: value })).show();
		});


		$chart.on('mouseleave', componentSelector, function() {
			$tooltip.css({
				visibility: 'hidden'
			});
		});

		$chart.on('mousemove', function(event) {
			var x = (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
				y = (event.offsetY || event.originalEvent.layerY) - $tooltip.height();//
			$tooltip.css({
				display: 'inline-block',
				position: 'absolute',
				left: x,
				top: y
			});
		});

		return this;
	},

	_unbindTooltips: function() {
		this.$chart.off('mouseenter');
		this.$chart.off('mouseleave');
		this.$chart.off('mousemove');
		return this;
	}

};
ChartistHtml.ChartCollectionManager = function($el) {
	var self = this;
	this._chartManagers = [];
	$el.each(function(i) {
		self._chartManagers.push(new ChartistHtml.ChartManager($(this), i));
	});
	return this;
};

ChartistHtml.ChartCollectionManager.prototype = {

	constructor: ChartistHtml.ChartCollectionManager,

	render: function() {
		var i, max;
		for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
			this._chartManagers[i].render();
		}
		return this;
	},

	destroy: function() {
		var i, max;
		for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
			this._chartManagers[i].destroy();
		}
	}

};