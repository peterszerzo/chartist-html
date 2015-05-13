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