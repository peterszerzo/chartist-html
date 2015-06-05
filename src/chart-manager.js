ChartistHtml.ChartManager = function($el, chartId) { //
	this.id = (ChartistHtml.exists(chartId)) ? chartId : 1;
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

	isFillChart: function() {
		if (!ChartistHtml.exists(this.type)) { return false; }
		return (this.type === 'pie');
	},

	isStrokeChart: function() {
		if (!ChartistHtml.exists(this.type)) { return false; }
		return (['bar', 'line'].indexOf(this.type) > -1);
	},

	isHorizontalChart: function() {
		if (!ChartistHtml.exists(this.data.subtypes)) { return false; }
		return (this.data.subtypes.indexOf('horizontal') > -1);
	},

	isSeriesOnX: function() {
		if (this.type === "bar") { return this.isHorizontalChart(); }
		if (this.type === "line") { return !this.isHorizontalChart(); }
	},

	/*
	 * Extracts chart content from the inner html (unordered list).
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
				seriesLabels: [] //for line and bar charts only
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
	setData: function() {
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

		return this;
	},

	/*
	* Gets chart options based on type and subtype
	* @return {obj} - chart options
	* @return {array} - chart responsive options, array of arrays
	*/
	getOptions: function() {

		var options = ChartistHtml.getOptions(this.data.type, this.data.subtypes),
			responsiveOptions = ChartistHtml.config.chartOptions[this.data.type].responsiveOptions,
			longestLabelLength;

		var fsv = this._formatSeriesValue.bind(this),
			flv = this._formatLabelsValue.bind(this);

		if (this.isStrokeChart()) {
			options.axisX = options.axisX || {};
			options.axisY = options.axisY || {};
			options.axisX.labelInterpolationFnc = this.isHorizontalChart() ? fsv : flv;
			options.axisY.labelInterpolationFnc = this.isHorizontalChart() ? flv : fsv;
		}

		if (this.isSeriesOnX() && this.data.seriesFormat === 'currency') { 
			responsiveOptions[1].axisX = responsiveOptions[1].axisX || [];
			responsiveOptions[1].axisX.labelInterpolationFnc = fsv;
		}

		if (this.isHorizontalChart() && this.type === "bar") {
			options.axisY = options.axisY || {};
			longestLabelLength = this._getLongestLabelLength();
			if (longestLabelLength > ChartistHtml.config.longLabelLength) {
				options.axisY.offset = Math.round(longestLabelLength * ChartistHtml.config.labelOffsetCoefficient);
			}
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

		this.setData();
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
	        if(ChartistHtml.exists(this.$titleContainer)) { this.$titleContainer.remove(); }
		}

        this._isRendered = false;

        return this;
	},

	/*
	 * Adds title div to chart container if chart has a title
	 * @returns {div}
	 */
	_appendTitle: function() {
		var title = this.chart.data.title,
			$el = $('<div>' + title + '</div>');

		if (ChartistHtml.exists(this.chart.data.title)) {
			$el.addClass(ChartistHtml.config.baseClass + '__title');

			this.$el.prepend($el);
			this.$titleContainer = $el;
		}

		return this;
	},

	/*
	 * Formats series on chart axes and tooltips
	 * @returns {string}
	 */
	_formatSeriesValue: function(v) {
		if (ChartistHtml.exists(ChartistHtml.formatters[this.data.seriesFormat])) {
		 	return ChartistHtml.formatters[this.data.seriesFormat](v);
		}

		return v;
	},

	/*
	* Abbreviates labels on chart axes in response to screen width
	* @returns {string}
	*/
	_formatLabelsValue: function(v) {
		if (ChartistHtml.exists(ChartistHtml.formatters[this.data.labelsFormat])) {
			return ChartistHtml.formatters[this.data.labelsFormat](v);
		}

		return v;
	},

	/*
	* Finds longest label in array 
	* Used to adjust axis offset for long labels not set by formatters
	* @returns {number} - length of string
	*/
	_getLongestLabelLength: function (v) {
		var labels = this.data.labels,
			longestLength = 0,
			i, max;

		for ( i = 0, max = labels.length; i < max; i++ )  {
			if (labels[i].length > longestLength) {
				longestLength = labels[i].length;
			}
		}

		return longestLength;
	},

	/*
	* Applies color scale to chart series using two-color spectrum
	* @returns {obj} - chart manager object
	*/
	_addColoring: function() {
		var self = this;

		if (ChartistHtml.exists(chroma)) {

			if (ChartistHtml.exists(ChartistHtml.config.colorSpectrum)) {

				var seriesCount = this.chart.data.series.length;

				this.$chart.find('.ct-series').each(function(i) {

					var $el = $(this),
						chartType = self.type,
						firstColor = ChartistHtml.config.colorSpectrum[0],
						lastColor = ChartistHtml.config.colorSpectrum[1],
						scale = chroma.scale([firstColor, lastColor]).domain([0, seriesCount-1]),
						color;

					if (ChartistHtml.exists(scale(i))) {

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