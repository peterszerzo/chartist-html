describe('ChartistHtml', function() {

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