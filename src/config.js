ChartistHtml.config = {
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	chartOptions: {
		pie: {
			options: {
				standard: {
					labelInterpolationFnc: function(value) {
						return value[0];
					}
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
				standard: {
					seriesBarDistance: 10,
					axisX: {
						offset: 70,
						position: 'start',
						labelInterpolationFnc: function(value) {
      						return value[0];
      					}
					},
					axisY: {
      					offset: 70,
      					position: 'start',
      				}
				},
				stacked: {
					stackedBars: true
				},
				horizontal: {
					horizontalBars: true,
					reverseData: true,
					axisX: {
      					offset: 70,
      					position: 'start',
      				},
      				axisY: {
						offset: 70,
						position: 'start',
						labelInterpolationFnc: function(value) {
      						return value[0];
      					}
					}
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
		line: {
			options: {
				standard: {
					showArea: true,
					axisX: {
						position: 'start',
						labelInterpolationFnc: function(value) {
      						return value[0];
      					}
					}, 
					axisY: {
						position: 'start'
					}
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
		}
	}	
};
