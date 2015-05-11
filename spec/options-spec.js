describe('ChartistHtml.getOptions', function() {
	var config = {bar:{ standard: {a: b}, stacked: {c: d}, horizontal: {d: f}}};
	it('builds up the standard options object based on specific chart types', function() {
		(ChartistHtml.getOptions('bar', [ 'stacked' ])).should.equal({a: b, c: d});
	});
});
