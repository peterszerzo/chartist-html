describe('ChartistHtml.ChartManager', function() {

	describe('isFillChart', function() {
		describe('for bar charts - not fill charts', function () {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="pie" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
			});
			it('detects chart type and assigns fill or stroke', function() {
				(chart.isFillChart(html, 'bar')).should.eql(false);
			});
		});
	});

	describe('isStrokeChart', function() {
		describe('for bar charts - stroke charts', function () {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
			});
			it('detects chart type and assigns fill or stroke', function() {
				(chart.isStrokeChart(html, 'bar')).should.eql(false); //not as expected
			});
		});
	});

	// describe('isHorizontalChart', function() {
	// 	var cm = new ChartManager();
	// 		cm.data = { subtypes: [ "horizontal", "circle" ] };

	// });

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
				(chart.data.labels[0]).should.eql('May');
			});
			it('detects and separates chart series - array of array', function() {
				(chart.data.series[0][0]).should.eql(1);
			});
		});
	});

	// describe('render', function() {
	// 	var html = '<div class="cts" data-type="pie" data-title="This is a title"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
	// 		chart;
	// 	beforeEach(function() {
	// 		ChartistHtml.config.baseClass = 'cts';
	// 		chart = new ChartistHtml.ChartManager($(html), 1);
	// 	});
	// 	it('detects and capitalizes chart type', function() {
	// 		(chart.render(html).chartType).should.eql('Pie');
	// 	});
	// });
	
});
