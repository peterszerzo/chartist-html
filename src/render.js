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

	} else if (chartData.type === 'line') {
		options = ChartistHtml.config.chartOptions.line.options;
		responsiveOptions = ChartistHtml.config.chartOptions.line.responsiveOptions;
		
		console.log(options, responsiveOptions);
	} else {
		
	}

	var chart = new Chartist[chartType]('.ct-chart', data, options, responsiveOptions);

	return chart;
};