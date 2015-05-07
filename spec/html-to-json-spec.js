describe('ChartistHtml', function() {

	describe('htmlToJson', function() {
		describe('for bar charts', function() {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>';
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
			});
			it('detects chart title', function() {
				(ChartistHtml.htmlToJson(html).title).should.equal('A Fine Chart');
			});
			it('detects chart type', function() {
				(ChartistHtml.htmlToJson(html).type).should.equal('bar');
			});
			it('detects and separates chart options', function() {
				(ChartistHtml.htmlToJson(html).options[0]).should.equal('stacked');
				(ChartistHtml.htmlToJson(html).options[1]).should.equal('horizontal');
			});
			it('detects and separates chart labels', function() {
				(ChartistHtml.htmlToJson(html).labels[0]).should.equal('May');
			});
			it('detects and separates chart series - array of array', function() {
				(ChartistHtml.htmlToJson(html).series[0][0]).should.equal(1);
			});
		});
		
		describe('for pie charts', function() {
			var html = '<div class="cts" data-type="pie"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>';
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'cts';
			});
			it('detects chart type', function() {
				(ChartistHtml.htmlToJson(html).type).should.equal('pie');
			});
			it('detects and separates chart labels', function() {
				(ChartistHtml.htmlToJson(html).labels[0]).should.equal('Federal');
			});
			it('detects and separates chart series - simple array', function() {
				(ChartistHtml.htmlToJson(html).series[0]).should.equal(25);
			});
		});

		describe('integration', function() {	
		});
	});
});