describe('ChartistHtml', function() {
	it('exists as global', function() {
		(!!ChartistHtml).should.equal(true);
	});
});
describe('ChartistHtml.config', function() {
	it('has a config object', function() {
		(!!ChartistHtml.config).should.equal(true);
	});
});
describe('ChartistHtml', function() {

	describe('getBaseClass', function() {
		it('detects base class - for bars', function() {
			ChartistHtml.config.baseClass = 'ct-html';
			(ChartistHtml.getBaseClass()).should.equal('ct-html');
		});
		it('detects base class - for pies', function() {
			ChartistHtml.config.baseClass = 'cts';
			(ChartistHtml.getBaseClass()).should.equal('cts');
		});
	});

	describe('getLabelsClass', function() {
		it('detects labels class - for bars', function() {
			ChartistHtml.config.baseClass = 'ct-html';
			(ChartistHtml.getLabelsClass()).should.equal('ct-html__labels');
		});
		it('detects labels class - for pies', function() {
			ChartistHtml.config.baseClass = 'cts';
			(ChartistHtml.getLabelsClass(this)).should.equal('cts__labels');
		});
	});

	describe('getSeriesClass', function() {
		it('detects series class - for bars', function() {
			ChartistHtml.config.baseClass = 'ct-html';
			(ChartistHtml.getSeriesClass()).should.equal('ct-html__series');
		});
		it('detects series class - for pies', function() {
			ChartistHtml.config.baseClass = 'cts';
			(ChartistHtml.getSeriesClass(this)).should.equal('cts__series');
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

	describe('toSentenceCase', function() {
		var html = '<div class="ct-html" data-title="A Fine Chart" data-type="bar" data-options="stacked|horizontal"><ul><li class="ct-html__labels">May|June|July|August|September</li><li class="ct-html__series" data-name="Federal">1|2|3|4|5</li><li class="ct-html__series" data-name="State">1|2|3|4|5</li><li class="ct-html__series" data-name="Local">1|2|3|4|5</li></ul></div>';
		it('detects and capitalizes the first character only of chart type', function() {
			ChartistHtml.htmlToJson.type = 'bar';
			(ChartistHtml.toSentenceCase()).should.equal('Bar');
		});
	});
});