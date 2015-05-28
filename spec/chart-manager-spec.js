 describe('ChartistHtml.ChartManager', function() {

	describe('setData', function() {
		describe('for bar charts', function() {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
				chart.setData();
			});
			it('detects and separates chart labels', function() {
				(chart.data.labels[0]).should.equal('May');
			});
			it('detects and separates chart series - array of array', function() {
				(chart.data.series[0][0]).should.equal(1);
			});
		});
	});

});