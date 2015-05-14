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

	innerHtmlToJson: function() {

		var chartType = this.type,
			$el = this.$el,
			$labelsEl = $($el.find('.' + ChartistHtml.getLabelsClass())),
			$seriesEl = $($el.find('.' + ChartistHtml.getSeriesClass())),
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
	},

	getJson: function() {
		// ChartistHtml.elementToJson(this.$el);
		
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

		json.series = data.series;
		json.labels = data.labels;

		//return json;
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

		this.$el.append($chartContainer);

		var chart = new Chartist[chartType]('.' + chartClass, chartData, options, responsiveOptions);
		
		chart.on('created', function() {
			self.chart = chart;
			self.$chart = $(self.$el.find('.ct-chart'));
			self._bindTooltips();
		});

		return this;
	},

	destroy: function() {

		this._unbindTooltips();

		function detach() {
            window.removeEventListener('resize', this.resizeListener);
            this.optionsProvider.removeMediaQueryListeners();

			return this;
		}
	},

	_bindTooltips: function() {

		var self = this,
			$chart = this.$chart,
			$tooltip = $chart
				.append('<div class="cts__tooltip"></div>')
				.find('.cts__tooltip')
				.hide(),
			componentSelector = '.ct-' + this.componentSubclassNames[this.type];

		this.$tooltip = $tooltip;

		$chart.on('mouseenter', componentSelector, function() {
			var $point = $(this),
				value = $point.attr('ct:value'),
				series = $point.parent().attr('class'),
				index,
				label;

			index = ['a', 'b', 'c'].indexOf(series[series.length - 1]);
			label = self.chart.data.labels[index];
			$tooltip.css({ 'visibility': 'visible' });
			$tooltip.html('<h1>' + label + '</h1>' + '<p>' + value + '</p>').show();
		});

		$chart.on('mouseleave', componentSelector, function() {
			$tooltip.css({
				visibility: 'hidden'
			});
		});

		$chart.on('mousemove', function(event) {
			var x = (event.offsetX || event.originalEvent.layerX) - $tooltip.width() / 2 - 10,
				y = (event.offsetY || event.originalEvent.layerY) - $tooltip.height() - 40;
			$tooltip.css({
				display: 'inline-block',
				position: 'absolute',
				left: x,
				top: y
			});
		});

		return this;
	},

	unbindTooltips: function() {
		$chart.off('mouseenter');
		$chart.off('mouseleave');
		$chart.off('mousemove');
		return this;
	}

};