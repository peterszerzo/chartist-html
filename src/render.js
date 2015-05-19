ChartistHtml.renderAll = function() {
	new ChartistHtml.ChartCollectionManager($('.' + ChartistHtml.config.baseClass)).render();
};