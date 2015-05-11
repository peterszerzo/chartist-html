ChartistHtml.renderChart = function($el) {
	// extract the data
	// create a new chartist chart
	var chartData = ChartistHtml.elementToJson($el),
		chartType = ChartistHtml.toSentenceCase(chartData.type);

	console.log(chartType, chartData);

	var options = ChartistHtml.config.chartOptions[chartData.type].options,
		responsiveOptions = ChartistHtml.config.chartOptions[chartData.type].responsiveOptions;

	var chart = new Chartist[chartType]('.ct-chart', chartData, allOptions, allResponsiveOptions);

	return chart;
};