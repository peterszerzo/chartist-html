// Makes library CommonJS and AMD-compatible. Wraps the entire content of the library.
(function(root, factory) {

	if (typeof module === 'object' && module.exports) {
		var numeral;
		try { numeral = require('numeral'); }
		catch (e) { numeral = {}; }
		module.exports = factory(require('chartist'), require('jquery'), numeral);
	} else if (typeof define === "function" && define.amd) {
		define([ 'jquery', 'chartist', 'numeral' ], factory);
	} else {
		root.ChartistHtml = factory(root.Chartist, root.$, root.numeral);
	}
	
}(this, function(Chartist, $, numeral) {
