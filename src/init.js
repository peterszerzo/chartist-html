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

ChartistHtml.alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i'];

ChartistHtml.months = [	
	{ name: 'January', abbreviation: 'Jan'},
	{ name: 'February', abbreviation: 'Feb'},
	{ name: 'March', abbreviation: 'Mar'},
	{ name: 'April', abbreviation: 'Apr'},
	{ name: 'May', abbreviation: 'May'},
	{ name: 'June', abbreviation: 'June'},
	{ name: 'July', abbreviation: 'July'},
	{ name: 'August', abbreviation: 'Aug'},
	{ name: 'September', abbreviation: 'Sept'},
	{ name: 'October', abbreviation: 'Oct'},
	{ name: 'November', abbreviation: 'Nov'},
	{ name: 'December', abbreviation: 'Dec'},
];

ChartistHtml.states = [
    { name: 'Alabama', abbreviation: 'AL'},
    { name: 'Alaska', abbreviation: 'AK'},
    { name: 'Arizona', abbreviation: 'AZ'},
    { name: 'Arkansas', abbreviation: 'AR'},
    { name: 'California', abbreviation: 'CA'},
    { name: 'Colorado', abbreviation: 'CO'},
    { name: 'Connecticut', abbreviation: 'CT'},
    { name: 'Delaware', abbreviation: 'DE'},
    { name: 'District of Columbia', abbreviation: 'DC'},
    { name: 'Florida', abbreviation: 'FL'},
    { name: 'Georgia', abbreviation: 'GA'},
    { name: 'Hawaii', abbreviation: 'HI'},
    { name: 'Idaho', abbreviation: 'ID'},
    { name: 'Illinois', abbreviation: 'IL'},
    { name: 'Indiana', abbreviation: 'IN'},
    { name: 'Iowa', abbreviation: 'IA'},
    { name: 'Kansas', abbreviation: 'KS'},
    { name: 'Kentucky', abbreviation: 'KY'},
    { name: 'Lousiana', abbreviation: 'LA'},
    { name: 'Maine', abbreviation: 'ME'},
    { name: 'Maryland', abbreviation: 'MD'},
    { name: 'Massachusets', abbreviation: 'MA'},
    { name: 'Michigan', abbreviation: 'MI'},
    { name: 'Minnesota', abbreviation: 'MN'},
    { name: 'Mississippi', abbreviation: 'MS'},
    { name: 'Missouri', abbreviation: 'MO'},
    { name: 'Montana', abbreviation: 'MT'},
    { name: 'Nebraska', abbreviation: 'NE'},
    { name: 'Nevada', abbreviation: 'NV'},
    { name: 'New Hampshire', abbreviation: 'NH'},
    { name: 'New Jersey', abbreviation: 'NJ'},
    { name: 'New Mexico', abbreviation: 'NM'},
    { name: 'New York', abbreviation: 'NY'},
    { name: 'North Carolina', abbreviation: 'NC'},
    { name: 'North Dakota', abbreviation: 'ND'},
    { name: 'Ohio', abbreviation: 'OH'},
    { name: 'Oklahoma', abbreviation: 'OK'},
    { name: 'Oregon', abbreviation: 'OR'},
    { name: 'Pennsylvania', abbreviation: 'PA'},
    { name: 'Rhode Island', abbreviation: 'RI'},
    { name: 'South Carolina', abbreviation: 'SC'},
    { name: 'South Dakota', abbreviation: 'SD'},
    { name: 'Tennessee', abbreviation: 'TN'},
    { name: 'Texas', abbreviation: 'TX'},
    { name: 'Utah', abbreviation: 'UT'},
    { name: 'Vermont', abbreviation: 'VT'},
    { name: 'Virginia', abbreviation: 'VA'},
    { name: 'Washington', abbreviation: 'WA'},
    { name: 'West Virginia', abbreviation: 'WV'},
    { name: 'Wisconsin', abbreviation: 'WI'},
    { name: 'Wyoming', abbreviation: 'WY' }
];
