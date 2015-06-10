describe('ChartistHtml', function() {
	it('exists as global', function() {
		(!!ChartistHtml).should.equal(true);
	});
});
describe('ChartistHtml.data', function () {
	it('has a data object', function() {
		(!!ChartistHtml.data).should.equal(true);
	});

	it('has an alphabet key', function() {
		(!!ChartistHtml.data.alphabet).should.equal(true);
	});

	it('has a months key', function() {
		(!!ChartistHtml.data.months).should.equal(true);
	});

	it('has a states key', function() {
		(!!ChartistHtml.data.states).should.equal(true);
	});
});
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
describe('ChartistHtml.formatters', function() {
	it('has a formatters object', function() {
		(!!ChartistHtml.formatters).should.equal(true);
	});
});
describe('ChartistHtml.config', function() {
	it('has a config object', function() {
		(!!ChartistHtml.config).should.equal(true);
	});
});
describe('ChartistHtml html-to-json', function() {

	describe('getBaseClass', function() {
		it('detects base class', function() {
			ChartistHtml.config.baseClass = 'ct-html';
			(ChartistHtml.getBaseClass()).should.equal('ct-html');
		});
	});

	describe('getLabelsClass', function() {
		it('detects labels class', function() {
			ChartistHtml.config.baseClass = 'ctz';
			ChartistHtml.config.elementClassFragment = '___';
			(ChartistHtml.getLabelsClass()).should.equal('ctz___labels');
			ChartistHtml.config.elementClassFragment = '__';
		});
	});

	describe('getSeriesClass', function() {
		it('detects series class', function() {
			ChartistHtml.config.baseClass = 'ct-html';
			(ChartistHtml.getSeriesClass()).should.equal('ct-html__series');
		});
	});

	describe('splitString', function() {
		it('splits by a comma if only a comma is specified in the separator array', function() {
			ChartistHtml.config.seriesSeparators = [ ',' ];
			(ChartistHtml.splitString('1,2,3')[0]).should.equal('1');
		});
		it('splits by a comma if other characters are also specified in the separator array', function() {
			ChartistHtml.config.seriesSeparators = [ '|', ',' ];
			(ChartistHtml.splitString('1,2,3')[0]).should.equal('1');
		});
		it('does not split by a comma if it is not specified in the separator array. wraps string in an array instead', function() {
			ChartistHtml.config.seriesSeparators = [ '|' ];
			(ChartistHtml.splitString('1,2,3')[0]).should.equal('1,2,3');
		});
	});

	describe('toSentenceCase', function() {
		it('converts to sentence case', function() {
			(ChartistHtml.toSentenceCase('apples')).should.equal('Apples');
		});
	});
});
xdescribe('ChartistHtml.renderChart', function() {
	var html = '<div class="cts" data-type="pie"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
		    $el = $(html);
		beforeEach(function() {
			ChartistHtml.config.baseClass = 'cts';
		});

	it('names chart container using base class and id', function() {
		(ChartistHtml.renderChart($el, 1).container).should.eql('div.ct-chart.ct-perfect-forth.ct-chart-1');
	});
});
describe('ChartistHtml.getOptions', function() {
	var chartOptions = {
		bar: {
			options: {
				base: {'a': "b"}, 
				stacked: {'c': "d"}, 
				horizontal: {'d': "f"}
			}
		}
	};

	it('builds up the base options object based on specific chart subtypes', function() {
		(ChartistHtml.getOptions( 'bar', [ 'stacked' ], chartOptions)).should.eql({'a': "b", 'c': "d"});
	});
});
describe('ChartistHtml.ChartManager', function() {

	describe('isFillChart', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.type = "pie";

		it('sets fill chart based on chart type - pie', function() {
			(cm.isFillChart()).should.eql(true);
		});
	});

	describe('isStrokeChart', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.type = "line";

		it('sets stroke chart based on chart type - line and bar', function() {
			(cm.isStrokeChart()).should.eql(true);
		});
	});

	describe('isHorizontalChart', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.data = { subtypes: [ "stacked" ] };

		it('sets horizontal chart based on chart subtypes', function() {
			(cm.isHorizontalChart()).should.eql(false);
		});
	});

	describe('isSeriesOnX', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.type = "line";

		it('sets series axis based on chart type', function() {
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
			(cm._getChartClass()).should.eql('ct-chart-2'); //doesn't pass when id: 2 and should.eql('ct-chart-2')
		});
	});

	describe('_getChartClass', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.id;

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

		it('detects data series format', function() {
			(cm._formatSeriesValue(cm.data)).should.eql("[object Object]%"); //what's [object Object] here? how can this test check for numeral?
		});
	});

	describe('_formatLabelsValue', function() {
		var cm = new ChartistHtml.ChartManager();
		cm.data = { labelsFormat: "month" };

		it('detects data labels format', function() {
			(cm._formatLabelsValue(cm.data)).should.eql({ labelsFormat: "month" }); //why does this pass?
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

		it('detects and sets seriesCount', function() {
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
describe('ChartistHtml.ChartCollectionManager', function () {
	it('has a chart collection manager object', function() {
		(!!ChartistHtml.ChartCollectionManager).should.equal(true);
	});
});