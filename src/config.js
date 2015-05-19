ChartistHtml.config = {
	colorSpectrum: [ '#85026A', '#019fde' ],
	backgroundColor: '#FFFFFF',
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
	xAxis: {
		labelInterpolationFnc: function(v) {
			if (v > 999) {
				return numeral(v).format('($0.0a)');
			}
			return numeral(v).format('($0)');
		}
	},
	tooltipTemplate: function(data) {
		var string = "",
			formatter = (data.value > 999) ? '($0.0a)' : '($0)';

		string = numeral(data.value).format(formatter);
		
		return '<h1>' + data.label + '</h1>' + '<p>' + string + '</p>';
	},
	chartOptions: {
		pie: {
			options: {
				base: {
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
						position: 'start',
						labelInterpolationFnc: function(value) {
							return value;
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
						onlyInteger: true
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
