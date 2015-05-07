var ChartistHtml = {};
ChartistHtml.config = {
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeperator: ['|', ',']
};
ChartistHtml.getBaseClass = function() {
	return this.config.baseClass;
};

ChartistHtml.getLabelsClass = function() {
	return this.config.baseClass + this.config.elementClassFragment + 'labels';
};

ChartistHtml.getSeriesClass = function() {
	return this.config.baseClass + this.config.elementClassFragment + 'series';
};

/*
 * Splits string into array based on configured separator characters.
 * Try all of them until one is found in the string.
 * @param {string} string - String to be split.
 * @returns {array} array - Split array. 
 */
ChartistHtml.splitString = function(string) {
	var $anyString = $(this),
		splitArray = [],
		i, max;

	for(i=0, max = anyString.length; i < max; i += 1) {
		if (i === this.config.stringSeperator) {
			$anyString.split(this.config.stringSeperator);
		}
	}
	return splitArray;
};
	// loop over separator characters
	// when you find one that is present in the string
	//   interrupt the loop
	//   do splitting by that character
	// return

ChartistHtml.htmlToJson = function(html) {

	var $el = $(html),
		$labelsEl = $($el.find('.' + this.getLabelsClass())),
		$seriesEl = $($el.find('.' + this.getSeriesClass())),
		json = {};

	json.title = $el.attr('data-title'); 
	json.type = $el.attr('data-type');
	
	if (json.type !== 'pie') {
		json.options = $el.attr('data-options').split('|');
		json.labels = $labelsEl.html().split('|');
	} else {
		json.labels = [];
	}

	json.series = [];

	$seriesEl.each(function() {

		var $seriEl = $(this),
			stringSeries = $seriEl.html().split('|'),
			numberSeries = [],
			i, max;

		for(i = 0, max = stringSeries.length; i < max; i += 1) {
			numberSeries.push(parseFloat(stringSeries[i]));
		}

		if ([ 'bar', 'line' ].indexOf(json.type) > -1) {
			json.series.push(numberSeries);
		} else if (json.type === 'pie') {
			json.series.push(numberSeries[0]);
			json.labels.push($seriEl.attr('data-name'));
		} else {

		}
	});

	return json;
};