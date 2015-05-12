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