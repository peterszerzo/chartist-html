describe('ChartistHtml.ChartManager', function() {
	it('has a chart manager object', function() {
		(!!ChartistHtml.ChartManager).should.equal(true);
	});

	describe('isFillChart', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.type = "pie";

		it('tests true for pie chart', function() {
			(cm.isFillChart()).should.eql(true);
		});
	});

	describe('isStrokeChart', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.type = "line";

		it('tests true for line and bar charts', function() {
			(cm.isStrokeChart()).should.eql(true);
		});
	});

	describe('isHorizontalChart', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.data = { subtypes: [ "stacked" ] };

		it('tests false if horizontal is not in subtypes', function() {
			(cm.isHorizontalChart()).should.eql(false);
		});
	});

	describe('isSeriesOnX', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.type = "line";

		it('tests not-horizontal for line chart', function() {
			(cm.isSeriesOnX()).should.eql(!cm.isHorizontalChart());
		});
	});

	describe('setData', function() {
		describe('for bar charts', function() {
			var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>',
				chart;
			beforeEach(function() {
				ChartistHtml.config.baseClass = 'ct-html';
				chart = new ChartistHtml.ChartManager($(html), 1);
				chart.setData();
			});
			it('detects and separates chart labels - array', function() {
				(chart.data.labels[0]).should.eql('May');
			});
			it('detects and separates chart series - array of array', function() {
				(chart.data.series[0][0]).should.eql(1);
			});
		});
	});

	describe('_getChartClass', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.id = 2;

		it('sets chart id to value provided', function() {
			(cm._getChartClass()).should.eql('ct-chart-2');
		});
	});

	describe('_getChartClass', function() { //can this be combined with above?
		var cm = new ChartistHtml.ChartManager();

		it('sets chart id to 1 if it is not defined', function() {
			(cm._getChartClass()).should.eql('ct-chart-1');
		});
	});

	describe('_appendTitle', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.title = "Hello";

		it('detects title container', function() {
			(find($titleContainer)).should.equal('<div>"Hello"</div>'); //failing, misusing jquery find method
		});
	});

	describe('_formatSeriesValue', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.data = { seriesFormat: "percent" };

		it('detects data series format and formats value', function() {
			(cm._formatSeriesValue(50)).should.eql("50%");
		});
	});

	describe('_formatLabelsValue', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.data = { labelsFormat: "month" };

		it('detects data labels format and formats label', function() {
			(cm._formatLabelsValue("January")).should.eql("Jan");
		});
	});

	describe('_getLongestLabelLength', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.data = { labels: ['apples', 'grapefruits', 'oranges'] };

		it('finds length of longest label in labels array', function() {
			(cm._getLongestLabelLength(cm.data)).should.eql(11);
		});
	});

	describe('_addColoring', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.data = { series: [1, 2, 3, 4, null, 5]};

		it('counts series length to later set color spectrum length', function() {
			(cm.data.series.length).should.eql(6);
		});
	});

	// describe('_bindTooltips', function() {
	// 	var cm = new ChartistHtml.ChartManager();
	// 	cm.data = { labels: ['a', 'b', 'c'], series: [1, 2, 3] }

	// 	it('detects labels and value', function() {
	// 		(cm._bindTooltips)
	// 	});
	// });

});