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
		$.each(ChartistHtml.data.states, function(i) {
			if (v === ChartistHtml.data.states[i].name) {
				v = ChartistHtml.data.states[i].abbreviation;
			} 
		});
		
		return v;
	},
	month: function(v) {
		$.each(ChartistHtml.data.months, function(i) {
			if (v === ChartistHtml.data.months[i].name) {
				v = ChartistHtml.data.months[i].abbreviation;
			} 
		});

		return v;
	}
};