/*
* Formats and abbreviates series and labels on chart axes based on specified data formats
* @param {value} - number or string, depending on series or labels
* @returns {string} - returns formatted string
*/
ChartistHtml.formatters = {
	currency: function(v) {
		var formatter = (v > 999) ? '($0.0a)' : '($0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	number: function(v) {
		var formatter = (v > 999) ? '(0.0a)' : '(0)';
		return (typeof numeral !== "undefined") ? numeral(v).format(formatter) : v;
	},
	percent: function(v) {
		return (v + "%");
	},
	year: function(v) {
		return (v > 999) ? ("'" + v.substring(2, 4)) : v;
	},
	state: function(v) {
		$.each(ChartistHtml.states, function(i) {
			if (v === ChartistHtml.states[i].name) {
				v = ChartistHtml.states[i].abbreviation;
			} else {
				v = v;
			}
		});

		return v;
	},
	month: function(v) {
		$.each(ChartistHtml.months, function(i) {
			if (v === ChartistHtml.months[i].name) {
				v = ChartistHtml.months[i].abbreviation;
			} else {
				v = v;
			}
		});

		return v;
	}
};