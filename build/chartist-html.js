var ChartistHtml = {};
ChartistHtml.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

ChartistHtml.months = [	
	{ name: 'January', abbreviation: 'Jan'},
	{ name: 'February', abbreviation: 'Feb'},
	{ name: 'March', abbreviation: 'Mar'},
	{ name: 'April', abbreviation: 'Apr'},
	{ name: 'May', abbreviation: 'May'},
	{ name: 'June', abbreviation: 'June'},
	{ name: 'July', abbreviation: 'July'},
	{ name: 'August', abbreviation: 'Aug'},
	{ name: 'September', abbreviation: 'Sept'},
	{ name: 'October', abbreviation: 'Oct'},
	{ name: 'November', abbreviation: 'Nov'},
	{ name: 'December', abbreviation: 'Dec'},
];

ChartistHtml.states = [
    { name: 'Alabama', abbreviation: 'AL'},
    { name: 'Alaska', abbreviation: 'AK'},
    { name: 'Arizona', abbreviation: 'AZ'},
    { name: 'Arkansas', abbreviation: 'AR'},
    { name: 'California', abbreviation: 'CA'},
    { name: 'Colorado', abbreviation: 'CO'},
    { name: 'Connecticut', abbreviation: 'CT'},
    { name: 'Delaware', abbreviation: 'DE'},
    { name: 'District of Columbia', abbreviation: 'DC'},
    { name: 'Florida', abbreviation: 'FL'},
    { name: 'Georgia', abbreviation: 'GA'},
    { name: 'Hawaii', abbreviation: 'HI'},
    { name: 'Idaho', abbreviation: 'ID'},
    { name: 'Illinois', abbreviation: 'IL'},
    { name: 'Indiana', abbreviation: 'IN'},
    { name: 'Iowa', abbreviation: 'IA'},
    { name: 'Kansas', abbreviation: 'KS'},
    { name: 'Kentucky', abbreviation: 'KY'},
    { name: 'Lousiana', abbreviation: 'LA'},
    { name: 'Maine', abbreviation: 'ME'},
    { name: 'Maryland', abbreviation: 'MD'},
    { name: 'Massachusets', abbreviation: 'MA'},
    { name: 'Michigan', abbreviation: 'MI'},
    { name: 'Minnesota', abbreviation: 'MN'},
    { name: 'Mississippi', abbreviation: 'MS'},
    { name: 'Missouri', abbreviation: 'MO'},
    { name: 'Montana', abbreviation: 'MT'},
    { name: 'Nebraska', abbreviation: 'NE'},
    { name: 'Nevada', abbreviation: 'NV'},
    { name: 'New Hampshire', abbreviation: 'NH'},
    { name: 'New Jersey', abbreviation: 'NJ'},
    { name: 'New Mexico', abbreviation: 'NM'},
    { name: 'New York', abbreviation: 'NY'},
    { name: 'North Carolina', abbreviation: 'NC'},
    { name: 'North Dakota', abbreviation: 'ND'},
    { name: 'Ohio', abbreviation: 'OH'},
    { name: 'Oklahoma', abbreviation: 'OK'},
    { name: 'Oregon', abbreviation: 'OR'},
    { name: 'Pennsylvania', abbreviation: 'PA'},
    { name: 'Rhode Island', abbreviation: 'RI'},
    { name: 'South Carolina', abbreviation: 'SC'},
    { name: 'South Dakota', abbreviation: 'SD'},
    { name: 'Tennessee', abbreviation: 'TN'},
    { name: 'Texas', abbreviation: 'TX'},
    { name: 'Utah', abbreviation: 'UT'},
    { name: 'Vermont', abbreviation: 'VT'},
    { name: 'Virginia', abbreviation: 'VA'},
    { name: 'Washington', abbreviation: 'WA'},
    { name: 'West Virginia', abbreviation: 'WV'},
    { name: 'Wisconsin', abbreviation: 'WI'},
    { name: 'Wyoming', abbreviation: 'WY' }
];
/*
* Formats and abbreviates series and labels on chart axes based on specified data formats
* @param {value} - number or string, depending whether chart series or labels
* @returns {string} - returns formatted string
*/
ChartistHtml.formatters = {
	currency: function(v) {
		var formatter = (v > 999) ? '($0.0a)' : '($0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	number: function(v) {
		var formatter = (v > 999) ? '(0.0a)' : '(0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	percent: function(v) {
		return (v + "%"); //eventually use numeral here to convert from decimal notation
	},
	year: function(v) {
		return (v > 999) ? ("'" + v.substring(2, 4)) : v;
	},
	state: function(v) {
		$.each(ChartistHtml.states, function(i) {
			if (v === ChartistHtml.states[i].name) {
				v = ChartistHtml.states[i].abbreviation;
			} else {
				v = v;
			}
		});

		return v;
	},
	month: function(v) {
		$.each(ChartistHtml.months, function(i) {
			if (v === ChartistHtml.months[i].name) {
				v = ChartistHtml.months[i].abbreviation;
			} else {
				v = v;
			}
		});

		return v;
	}
};
ChartistHtml.config = {
	colorSpectrum: [ '#85026A', '#019fde' ],
	backgroundColor: '#fff',
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	tooltipTemplate: function(data) {
		return '<h1>' + data.label + '</h1>' + '<p>' + data.value + '</p>';
	},
	chartOptions: {
		pie: {
			options: {
				base: {
					showLabel: false, //only tooltips on pies
					labelInterpolationFnc: function(value) {
						return value[0];
					}
				}
			},
			/* if labels are off, then we don't need responsive labels */
			// responsiveOptions: [
			// 	['screen and (min-width: 640px)', {
			// 		chartPadding: 30,
			// 		labelOffset: 100,
			// 			labelInterpolationFnc: function(value) {
			// 				return value;
			// 			}
			// 	}],
			// 	['screen and (min-width: 1024px)', {
			// 		chartPadding: 20,
			// 		labelOffset: 80
			// 	}]
			// ] 
		},
		bar: {
			options: {
				base: {
					seriesBarDistance: 13,
					axisX: {
						offset: 70,
						position: 'end'
					},
					axisY: {
      					offset: 50,
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
      					offset: 50,
      					position: 'end',
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
					axisX: {
					    labelInterpolationFnc: function(value) {
					      	return value;
					    }
					},
					axisY: {
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
					},
					axisY: {
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
						offset: 50,
						position: 'end',
						labelInterpolationFnc: function(value) {
      						return value;
      					}
					}, 
					axisY: {
						offset: 50,
						position: 'start',
						onlyInteger: true,
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
 			numberal(json.series).format();
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
	this._isRendered = false;
	return this;
};

ChartistHtml.ChartManager.prototype = {

	constructor: ChartistHtml.ChartManager,

	componentSubclassNames: {
		'pie': 'slice',
		'line': 'point',
		'bar': 'bar'
	},

	defaultChartDirections: {
		'line': 'horizontal',
		'bar': 'vertical'
	},

	getType: function() {
	},

	isFillChart: function() {
		if (typeof this.type === "undefined") { return false; }
		return (this.type === 'pie');
	},

	isStrokeChart: function() {
		if (typeof this.type === "undefined") { return false; }
		return (['bar', 'line'].indexOf(this.type) > -1);
	},

	isHorizontalChart: function() {
		return this.data.subtypes.indexOf('horizontal') > -1;
	},

	isSeriesOnX: function() {
		if (this.type === "bar") { return this.isHorizontalChart(); }
		if (this.type === "line") { return !this.isHorizontalChart(); }
	},

	/*
	 * Extracts chart content from the inner html
	 * @returns {object}
	 */
	innerHtmlToJson: function() {
		var chartType = this.type,
			self = this,
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

			if (self.isStrokeChart()) {
				json.seriesLabels.push($seriEl.attr('data-name'));
				json.series.push(numberSeries);
			} else if (self.isFillChart()) {
				json.series.push(numberSeries[0]);
				json.labels.push($seriEl.attr('data-name'));
			} else {

			}
		});

		return json;
	},

	/*
	* Get chart data from html div
	* @return {obj} - json data object
	*/
	getJson: function() {
		var $el = this.$el,
			json = {},
			data;

		json.title = $el.attr('data-title');
		json.seriesFormat = $el.attr('data-series-format');
		json.labelsFormat = $el.attr('data-labels-format');
		json.type = $el.attr('data-type');

		this.type = json.type;

		json.subtypes = ChartistHtml.splitString($el.attr('data-subtypes') || $el.attr('data-options'));

		data = this.innerHtmlToJson($el.html(), json.type);

		json = $.extend(json, data);

		this.data = json;

		return json;
	},

	/*
	* Gets chart options based on type and subtype
	* @return {obj} - options and responsive options
	*/
	getOptions: function() {
		var options = ChartistHtml.getOptions(this.data.type, this.data.subtypes),
			responsiveOptions = ChartistHtml.config.chartOptions[this.data.type].responsiveOptions;

		var fsv = this._formatSeriesValue.bind(this),
			flv = this._formatLabelsValue.bind(this);

		if (this.isStrokeChart()) {
			options.axisX = options.axisX || {};
			options.axisY = options.axisY || {};
			options.axisX.labelInterpolationFnc = this.isSeriesOnX() ? fsv : flv;
			options.axisY.labelInterpolationFnc = this.isSeriesOnX() ? flv : fsv;
		}

		if (this.isSeriesOnX() && this.data.seriesFormat === 'currency') { 
			responsiveOptions.axisX = responsiveOptions.axisX || {};
			responsiveOptions.axisX.labelInterpolationFnc = fsv;
		}

		return { options: options, responsiveOptions: responsiveOptions };
	},

	/*
	* Build a single chart
	* @returns {obj} - chart manager object
	*/
	render: function() {
		var self = this,
			chartType,
			chartClass,
			chart;

		this.getJson();
		chartType = ChartistHtml.toSentenceCase(this.data.type);
		chartClass = this._getChartClass();

		this._setChartContainer();

		var opt = this.getOptions();

		if(!self._isRendered) {
			chart = new Chartist[chartType]('.' + chartClass, this.data, opt.options, opt.responsiveOptions);
		}

		chart.on('created', function() {
			if(!self._isRendered) {
				self.chart = chart;
				self.$chart = $(self.$el.find('.ct-chart'));
				self._appendTitle();
				self._bindTooltips();
				self._isRendered = true;
			}
			self._addColoring();
		});

		return this;
	},

	_getChartClass: function() {
		return 'ct-chart-' + this.id;
	},

	_setChartContainer: function() {
		var chartBaseClass = 'ct-chart',
			containerSize = ' ct-perfect-fourth ',
			chartClass = this._getChartClass();

		this.$chartContainer = $('<div class="' + chartBaseClass + containerSize + chartClass + '"><div>');
		this.$el.append(this.$chartContainer);

		return this;
	},

	destroy: function() {
		var chart = this.chart;

		if (this._isRendered) {
			this._unbindTooltips();
	        window.removeEventListener('resize', chart.resizeListener);
	        chart.optionsProvider.removeMediaQueryListeners();
	        this.$chartContainer.remove();
	        this.$titleContainer.remove();
		}

        this._isRendered = false;

        return this;
	},

	/*
	 * Adds title div to chart container
	 * @returns {div}
	 */
	_appendTitle: function() {
		var title = this.chart.data.title,
			$el = $('<div>' + title + '</div>');

		$el.addClass(ChartistHtml.config.baseClass + '__title');

		this.$el.prepend($el);
		this.$titleContainer = $el;

		return this;
	},

	/*
	 * Formats series on chart axes and tooltips
	 * @returns {string}
	 */
	_formatSeriesValue: function(v) {
		if ( typeof this.data.seriesFormat !== 'undefined') {
		 	return ChartistHtml.formatters[this.data.seriesFormat](v);
		}
	},

	/*
	* Abbreviates labels on chart axes in response to screen width
	* @returns {string}
	*/
	_formatLabelsValue: function(v) {
		if ( typeof this.data.labelsFormat !== 'undefined') {
			return ChartistHtml.formatters[this.data.labelsFormat](v);
		}
	},

	/*
	* Applies color scale to chart series using two-color spectrum
	* @returns {obj} - chart manager object
	*/
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

						if (self.isFillChart()) {
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

		$tooltip.css({ visibility: 'hidden', display: 'table', position: 'absolute' });

		$chart.on('mouseover', componentSelector, function(e) {
			var $point = $(this),
				value = self._formatSeriesValue($point.attr('ct:value')),
				series = $point.parent().attr('class'),
				index,
				label;

			index = ChartistHtml.alphabet.indexOf(series[series.length - 1]);

			if (chartType === 'pie') {
				label = self.chart.data.labels[index];
			} else {
				label = self.chart.data.seriesLabels[index];
			}

			if (label && value) {
				$tooltip.html(ChartistHtml.config.tooltipTemplate({ label: label, value: value })).show();
				$tooltip.css({ 'visibility': 'visible' });
			}
		});

		$chart.on('mouseleave', componentSelector, function() {
			$tooltip.css({
				visibility: 'hidden'
			});
		});

		$chart.on('mousemove', function(event) {
			var x = (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2,
				y = (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 15; //fixes flicker
			$tooltip.css({
				left: x,
				top: y
			});
		});

		return this;
	},

	_unbindTooltips: function() {
		if (this.$chart) {
			this.$chart.off('mouseenter mouseleave mousemove');
		}

		return this;
	}
};
ChartistHtml.ChartCollectionManager = function($el) {
	var self = this;
	this._chartManagers = [];
	$el.each(function(i) {
		self._chartManagers.push(new ChartistHtml.ChartManager($(this), i));
	});
	this._isRendered = false;
	return this;
};

ChartistHtml.ChartCollectionManager.prototype = {

	constructor: ChartistHtml.ChartCollectionManager,

	render: function() {
		var i, max;
		if (this._isRendered) { this.destroy(); }
		for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
			this._chartManagers[i].render();
		}
		this._isRendered = true;
		return this;
	},

	destroy: function() {
		var i, max;
		if (this._isRendered) {
			for(i = 0, max = this._chartManagers.length; i < max; i += 1) {
				this._chartManagers[i].destroy();
			}
			this._isRendered = false;
		}
		return this;
	}

};