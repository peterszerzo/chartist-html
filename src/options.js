/*
 * Merges the elements in two objects to create a new object with all chart options
 * @param {string} string - type of chart
 * @param {array} array - chart subtypes specified in html string
 * @param {object} config - Optional chart options object. Defaults to ChartistHtml.config.chartOptions
 * @returns {object} object - new AllOptions object that merges defaults with specifics, and defaults and specifics stay the same 
 */
ChartistHtml.getOptions = function(type, subtypes, chartOptions) {
	if (!ChartistHtml.exists(chartOptions)) {
		chartOptions = ChartistHtml.config.chartOptions;
	}

	var chartTypeOptions = chartOptions[type].options;
	var defaults = chartTypeOptions.base;
	var specifics;

	var allOptions = $.extend({}, defaults);

	var i, max, subtype;
	if (ChartistHtml.exists(subtypes) && subtypes.length > 0) {
		for(i = 0, max = subtypes.length; i < max; i += 1) {
			subtype = subtypes[i];
			specifics = chartTypeOptions[subtype];
			if (ChartistHtml.exists(specifics)) {
				allOptions = $.extend(allOptions, specifics);
			}
		}
	}

	return allOptions;
};