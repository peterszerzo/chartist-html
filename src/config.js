ChartistHtml.config = {
	colorSpectrum: [ '#85026A', '#019fde' ],
	backgroundColor: '#fff',
	longLabelLength: 35,//set character length to define long labels
	labelOffsetCoefficient: 3,
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	tooltipTemplate: function(data) {
		return '<h1>' + data.label + '</h1>' + '<p>' + data.value + '</p>';
	},
	chartOptions: {
		pie: {
			options: {
				base: {
					showLabel: false //only tooltips on pies, so no responsive options needed
				}
			}
		},
		bar: {
			options: {
				base: {
					seriesBarDistance: 13,
					axisX: {
						offset: 70,
						position: 'end'
					},
					axisY: {
						offset: 70,
      					position: 'start',
      					onlyInteger: true
      				}
				},
				stacked: {
					stackBars: true
				},
				horizontal: {
					horizontalBars: true,
					reverseData: true,
					axisX: {
						offset: 70,
      					position: 'end',
      					onlyInteger: true
      				},
      				axisY: {
						offset: 70,
						position: 'start'
      				}
      			}
			},
			responsiveOptions: [
				['screen and (min-width: 1920px)', {
					axisX: {
						labelInterpolationFnc: function(value) {
							return value;
					    }
					},
					axisY: {
						labelInterpolationFnc: function(value) {
							return value;
					    }
					}
				}],
				['screen and (min-width: 1920px)', {
			 		axisX: {
						labelInterpolationFnc: function(value) {
							return value;
					    }
					},
					axisY: {
						labelInterpolationFnc: function(value) {
							return value;
					    }
					}	
				}],
			]
		},
		line: {
			options: {
				base: {
					showArea: false,
					axisX: {
						offset: 70,
						position: 'end'
					}, 
					axisY: {
						offset: 70,
						position: 'start',
						onlyInteger: true
					}
				}
			},
			responsiveOptions: [
				['screen and (min-width: 1920px)', {
					axisX: {
						labelInterpolationFnc: function(value) {
							return value;
					    }
					}
				}],
				['screen and (min-width: 1920px)', {
					axisX: {
						labelInterpolationFnc: function(value) {
							return value;
					    }
					}	
				}],
			] 
		}
	}
};
