ChartistHtml.config = {
	colorSpectrum: [ '#85026A', '#019fde' ],
	backgroundColor: '#FFFFFF',
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
					showLabel: false, //turn off labels, only tooltips on pies
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
				base: {
					seriesBarDistance: 10,
					axisX: {
						offset: 70,
						position: 'end',
						labelInterpolationFnc: function(value) {
							return value[0];
						}
					},
					axisY: {
      					offset: 70,
      					position: 'start',
      					onlyInteger: true,
      					labelInterpolationFnc: function(value) {
      						return numeral(value).format('(0)');
      					}
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
      					onlyInteger: true,
      					labelInterpolationFnc: function(value) {
      						return numeral(value).format('($0.0a)');
      					}
      				},
      				axisY: {
						offset: 70,
						position: 'start',
						labelInterpolationFnc: function(value) {
							return value.slice(0, 4);
						}
      				}
      			}
			},
			responsiveOptions: [
				['screen and (min-width: 640px)', {
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
				['screen and (min-width: 1024px)', {
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
						position: 'end',
						labelInterpolationFnc: function(value) {
      						return value[0];
      					}
					}, 
					axisY: {
						position: 'start',
						onlyInteger: true,
						labelInterpolationFnc: function(value) {
							return numeral(value).format('($0)');
						}
					}
				}
			},
			responsiveOptions: [
				['screen and (min-width: 640px)', {
					axisX: {
					    labelInterpolationFnc: function(value) {
					      	return value;
					    }
					}
				}],
				['screen and (min-width: 1024px)', {
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
