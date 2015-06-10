describe('ChartistHtml.ChartCollectionManager', function () {
	it('has a chart collection manager object', function() {
		(!!ChartistHtml.ChartCollectionManager).should.equal(true);
	});

	it('has a chart collection manager prototype object', function() {
		(!!ChartistHtml.ChartCollectionManager.prototype).should.equal(true);
	});
});