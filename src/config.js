ChartistHtml.config = {
	baseClass: 'ct-html',
	elementClassFragment: '__',
	modifierClassFragment: '--',
	seriesSeparators: ['|', ','],
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
      					position: 'start',
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
				    seriesBarDistance: 5,
				    axisX: {
				    	labelInterpolationFnc: function(value) {
				      		return value;
				    	}
				    }
				}],
				['screen and (min-width: 1024px)', {
				    seriesBarDistance: 10,
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
				    chartPadding: 30,
				    labelOffset: 100,
				    labelInterpolationFnc: function(value) {
				      return value;
				    }
				  }],
				  ['screen and (min-width: 1024px)', {
				    chartPadding: 20,
				    labelOffset: 80,
				    labelInterpolationFnc: function(value) {
				      return value;
				    }
				  }]
			]
		}
	}	
};
