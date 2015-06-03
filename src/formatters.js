/*
* Formats and abbreviates series and labels on chart axes based on specified data formats
* @param {value} - number or string, depending on chart series or labels
* @returns {string} - returns formatted string
*/
ChartistHtml.formatters = {
	currency: function(v) {
		var formatter = (v > 999) ? '($0.00a)' : '($0)';
		return (ChartistHtml.exists(numeral)) ? numeral(v).format(formatter) : v;
	},
	number: function(v) {
		var formatter = (v > 999) ? '(0.00a)' : '(0)';
		return (ChartistHtml.exists(numeral)) ? numeral(v).format(formatter) : v;
	},
	percent: function(v) {
		return (v + "%"); //eventually use numeral here to convert from decimal notation
	},
	year: function(v) {
		if (!ChartistHtml.exists(v.substring)) { v = String(v); }
		return (v.length === 4) ? ("'" + v.substring(2, 4)) : v;
	},
	state: function(v) {
		$.each(ChartistHtml.states, function(i) {
			if (v === ChartistHtml.states[i].name) {
				v = ChartistHtml.states[i].abbreviation;
			} 
		});
		
		return v;
	},
	month: function(v) {
		$.each(ChartistHtml.months, function(i) {
			if (v === ChartistHtml.months[i].name) {
				v = ChartistHtml.months[i].abbreviation;
			} 
		});

		return v;
	}
};