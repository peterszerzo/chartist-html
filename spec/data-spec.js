describe('ChartistHtml.data', function () {
	it('has a data object', function() {
		(!!ChartistHtml.data).should.equal(true);
	});

	it('has an alphabet key', function() {
		(!!ChartistHtml.data.alphabet).should.equal(true);
	});

	it('has a months key', function() {
		(!!ChartistHtml.data.months).should.equal(true);
	});

	it('has a states key', function() {
		(!!ChartistHtml.data.states).should.equal(true);
	});
});