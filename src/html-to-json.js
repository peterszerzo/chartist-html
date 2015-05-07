ChartistHtml.htmlToJson = function(html) {

	var $el = $(html),
		$labelsEl = $($el.find('.ct-html__labels')),
		$seriesEl = $($el.find('.ct-html__series')),
		json = {};

	json.title = $el.attr('data-title'); 
	json.type = $el.attr('data-type');
	json.options = $el.attr('data-options').split('|');

	json.labels = $labelsEl.html().split('|');

	json.series = [];

	$seriesEl.each(function() {
		var stringSeries = $(this).html().split('|'),
			numberSeries = [];

		numberSeries = parseFloat(stringSeries);
		json.series.push(numberSeries);
	});

	return json;
};