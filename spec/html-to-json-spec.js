describe('ChartistHtml', function() {

	var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>';
	
	describe('htmlToJson', function() {
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
		it('detects and separates chart series', function() {
			(ChartistHtml.htmlToJson(html).series[0][0]).should.equal(1);
		});
		describe('integration', function() {
			
		});
	});
});