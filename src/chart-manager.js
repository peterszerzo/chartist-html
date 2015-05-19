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