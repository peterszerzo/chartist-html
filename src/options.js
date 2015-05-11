/*
 * Merges the elements in two objects to create a new object with all chart options
 * @param {string} string - type of chart
 * @param {array} array - chart options specified in html string
 * @returns {object} object - new AllOptions object that merges defaults with specifics, and defaults and specifics stay the same 
 */
ChartistHtml.getOptions = function(type, options) {
	var chartType = ChartistHtml.config.chartOptions[type];
	var defaults = chartType.options.standard;
	var specifics;

	var allOptions = $.extend({}, defaults, specifics);
	console.log(allOptions);

	var i, max, option;
	for(i = 0, max = options.length; i < max; i += 1) {
		option = options[i];
		specifics = chartType.options[option];
		allOptions = $.extend(allOptions, specifics);
	}

	return allOptions;
};