 describe('ChartistHtml.ChartManager', function() {

	describe('innerHtmlToJson', function() {
		describe('for bar charts', function() {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
			});
			it('detects and separates chart labels', function() {
				(chart.innerHtmlToJson(html, 'bar').labels[0]).should.equal('May');
			});
			it('detects and separates chart series - array of array', function() {
				(chart.innerHtmlToJson(html, 'bar').series[0][0]).should.equal(1);
			});
		});
	});

	describe('getJson', function() {
		var html = '<div class="cts" data-type="pie"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
			chart;
		beforeEach(function() {
				ChartistHtml.config.baseClass = 'cts';
				chart = new ChartistHtml.ChartManager($(html), 1);
		});
		it('detects chart type', function() {
			(chart.getJson(html).type).should.equal('pie');
		});
	});

});