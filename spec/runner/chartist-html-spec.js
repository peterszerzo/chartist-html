describe('ChartistHtml', function() {
	it('exists as global', function() {
		(!!ChartistHtml).should.equal(true);
	});
});
describe('ChartistHtml', function() {
	it('has a config object', function() {
		(!!ChartistHtml.config).should.equal(true);
	});
});
describe('ChartistHtml', function() {
	describe('htmlToJson', function() {
		it('detects chart title', function() {
			var html = "<div class='ct-html' data-title='A Fine Chart'></div>";
			(ChartistHtml.htmlToJson(html).title).should.equal('A Fine Chart');
		});
		describe('integration', function() {
			
		});
	});
});