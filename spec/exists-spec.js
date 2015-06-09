describe('ChartistHtml.exists', function () {
	it('has an exists object', function() {
		(!!ChartistHtml.exists).should.equal(true);
	});
	it('tests false for undefined', function() {
		ChartistHtml.exists(undefined).should.equal(false);
	});

	it('tests false for null', function() {
		ChartistHtml.exists(null).should.equal(false);
	});

	it('tests true for emopty string', function() {
		ChartistHtml.exists("").should.equal(true);
	});

	it('tests nested object recursively - true', function() {
		ChartistHtml.exists({ a: { b: { c: "" } } }, 'a.b.c').should.equal(true);
	});

	it('tests nested object recursively - false', function() {
		ChartistHtml.exists({ a: { b: { c: "" } } }, 'a.b.c.d').should.equal(false);
	});
});