describe('ChartistHtml.config', function() {
	it('has a config object', function() {
		(!!ChartistHtml.config).should.equal(true);
	});

	it('has a chart options key', function() {
		(!!ChartistHtml.config.chartOptions).should.equal(true);
	});
});