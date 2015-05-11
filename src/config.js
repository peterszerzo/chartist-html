ChartistHtml.config = {
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	chartOptions: {
		pie: {
			options: {
				labelInterpolationFnc: function(value) {
					return value[0];
				}
			},
			responsiveOptions: [
				  ['screen and (min-width: 640px)', {
				    chartPadding: 30,
				    labelOffset: 100,
				    labelInterpolationFnc: function(value) {
				      return value;
				    }
				  }],
				  ['screen and (min-width: 1024px)', {
				    chartPadding: 20,
				    labelOffset: 80
				  }]
			]
		},
		bar: {
			options: {
				seriesBarDistance: 10,
				axisX: {
					offset: 70,
					position: 'end'
				},
				axisY: {
      				offset: 70,
      				position: 'start',
      				labelInterpolationFnc: function(value) {
      					return value[0];
      				}
      			},
      			stackBars: true,
				horizontalBars: true,
				reverseData: true
			},
			responsiveOptions: [
				['screen and (min-width: 640px)', {
				   chartPadding: 30,
				   labelOffset: 100,
				   labelInterpolationFnc: function(value) {
				     return value;
				   }
				}],
				['screen and (min-width: 1024px)', {
				   chartPadding: 20,
				   labelOffset: 80
				}]
			]
		},
		line: {
			options: {
				showArea: true,
				
			}
		}
	}	
};