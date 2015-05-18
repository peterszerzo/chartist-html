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
				//json.series.push($seriEl.attr('data-name'));
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

		json.series = data.series;
		json.labels = data.labels;

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
			self._addColoring();
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

		detach();
	},

	_addColoring: function() {

		if (chroma !== "undefined") { // is Chroma present?

			if (typeof ChartistHtml.config.colorSpectrum !== "undefined") {

				var seriesCount = this.chart.data.series.length;

				this.$chart.find('.ct-series').each(function(i) {

					var $el = $(this),
						firstColor = ChartistHtml.config.colorSpectrum[0],
						lastColor = ChartistHtml.config.colorSpectrum[1],
						scale = chroma.scale([firstColor, lastColor]).domain([0, seriesCount-1]),
						color = scale(i).css();

					$el.find('line, path').each(function() { $(this).css('stroke', color); });

					// attr('stroke', color);
					//create a scale and set start and end colors of series spectrum
					//interpolate colors for other series inbetween
					//create a color spectrum that has the same length as chart series
					//iterate through chart series and apply color spectrum values using jquery attr
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