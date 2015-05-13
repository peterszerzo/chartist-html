ChartistHtml.ChartManager = function($el, chartId) {
	this.id = (typeof chartId !== "undefined") ? chartId : 1;
	this.type = undefined;
	this.$el = $el;
	return this;
};

ChartistHtml.ChartManager.prototype = {

	constructor: ChartistHtml.ChartManager,

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

		var chartData = this.getJson(this.$el),
			chartType = ChartistHtml.toSentenceCase(chartData.type),
			chartBaseClass = 'ct-chart',
			chartClass = chartBaseClass + '-' + this.id;

		var options = ChartistHtml.getOptions(chartData.type, chartData.subtypes),
			responsiveOptions = ChartistHtml.config.chartOptions[chartData.type].responsiveOptions;

		var $chartContainer = $('<div class="' + chartBaseClass + ' ct-perfect-fourth ' + chartClass + '"><div>');

		this.$el.append($chartContainer);

		var chart = new Chartist[chartType]('.' + chartClass, chartData, options, responsiveOptions);
		
		this.chart = chart;

		return this;
	},

	destroy: function() {
		return this;
	},

	bindTooltips: function() {
		return this;
	},

	unbindTooltips: function() {

	}

};