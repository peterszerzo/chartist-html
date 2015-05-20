var ChartistHtml = {};

ChartistHtml.formatters = {
	currency: function(v) {
		var formatter = (v > 999) ? '($0.0a)' : '($0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	number: function(v) {
		var formatter = (v > 999) ? '(0.0a)' : '(0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	year: function(v) {
		return (v > 999) ? ("'" + v.substring(2, 4)) : v;
	},
	state: function(v) {
		return v;
	},
	month: function(v) {
		return v;
	}
};
