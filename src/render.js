/*
 * Entry point to the library, rendering all HTML charts on the page.
 *
 */
ChartistHtml.renderAll = function() {
	new ChartistHtml.ChartCollectionManager($('.' + ChartistHtml.config.baseClass)).render();
};