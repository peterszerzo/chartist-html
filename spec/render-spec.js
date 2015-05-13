xdescribe('ChartistHtml.renderChart', function() {
	var html = '<div class="cts" data-type="pie"><ul><li class="cts__series" data-name="Federal">25</li><li class="cts__series" data-name="State">50</li><li class="cts__series" data-name="Local">25</li></ul></div>',
		    $el = $(html);
		beforeEach(function() {
			ChartistHtml.config.baseClass = 'cts';
		});

	it('names chart container using base class and id', function() {
		(ChartistHtml.renderChart($el, 1).container).should.equal('div.ct-chart.ct-perfect-forth.ct-chart-1');
	});
});