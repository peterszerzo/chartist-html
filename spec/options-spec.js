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

	it('has a getOptions object', function() {
		(!!ChartistHtml.getOptions).should.equal(true);
	});

	it('builds up the base options object based on specific chart subtypes', function() {
		(ChartistHtml.getOptions( 'bar', [ 'stacked' ], chartOptions)).should.eql({'a': "b", 'c': "d"});
	});
});