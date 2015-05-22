ChartistHtml.config = {
	colorSpectrum: [ '#85026A', '#019fde' ],
	backgroundColor: '#fff',
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
					showLabel: false, //only tooltips on pies
					labelInterpolationFnc: function(value) {
						return value[0];
					}
				}
			},
			/* if labels are off, then we don't need responsive labels */
			// responsiveOptions: [
			// 	['screen and (min-width: 640px)', {
			// 		chartPadding: 30,
			// 		labelOffset: 100,
			// 			labelInterpolationFnc: function(value) {
			// 				return value;
			// 			}
			// 	}],
			// 	['screen and (min-width: 1024px)', {
			// 		chartPadding: 20,
			// 		labelOffset: 80
			// 	}]
			// ] 
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
      					offset: 50,
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
      					offset: 50,
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
						offset: 50,
						position: 'end',
						labelInterpolationFnc: function(value) {
      						return value;
      					}
					}, 
					axisY: {
						offset: 50,
						position: 'start',
						onlyInteger: true,
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
		}
	}
};
