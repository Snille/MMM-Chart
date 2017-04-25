/* global Module */

/* Magic Mirror 2
 * Module: MMM-Chart
 * 
 * Developed by Erik Pettersson
 * Based on dynchart module by Chris van Marle
 * MIT Licensed.
 */
 
Module.register("MMM-Chart",{

	requiresVersion: "2.1.0",
	//var graph = [],
	// Default module config.
	defaults: {
		// Number ofdata graphlines that you have in your JSON.
		// All data has to have the same xaxis (horizontal axis).
		numberOfGraphs: 1,

		// How long between updates. 
		updateInterval: 60000,

		// Animation speed.
		fadeSpeed: 1000,
		// Graph size.
		graphWidth: 300,
		graphHeight: 200,

		// Type of graph.
		// For mor information checkout: http://www.chartjs.org/docs/
		graphStyle: "line",
		//graphStyle: "bar",
		//graphStyle: "radar",
		//graphStyle: "polarArea",
		
		// URL to graph data.
//		url: "http://10.0.0.20/housedata/index1.php?id=20&max=5&sort=desc",
//		url: "http://10.0.0.20/housedata/index1.php?id=3&max=144&sort=desc",
//		url: "http://10.0.0.20/housedata/index2.php?id=9,10&max=5&sort=desc",
//		url: "http://10.0.0.20/housedata/index2.php?id=13,14,20&max=44&sort=desc",

		// X Axis time unit the graphs should be ploted in.
		//xaxisTimeUnit: "millisecond",
		//xaxisTimeUnit: "second",
		//xaxisTimeUnit: "minute",
		xaxisTimeUnit: "hour",
		//xaxisTimeUnit: "day",
		//xaxisTimeUnit: "week",
		//xaxisTimeUnit: "month",
		//xaxisTimeUnit: "quarter",
		//xaxisTimeUnit: "year",

		// Format for the unit above.
		// For more options checkout: http://momentjs.com/docs/#/displaying/format/
		// Example for minute above.
		//xaxisTimeFormatLabels: "mm",
		// Example for hour above.
		xaxisTimeFormatLabels: "H",
		// Example for day above.
		//xaxisTimeFormatLabels: "YYYY-MM-DD",
		// Example for week above.
		//xaxisTimeFormatLabels: "WW",
		// Example for month above.
		//xaxisTimeFormatLabels: "MM",
		
		// Available: "category", "linear", "logarithmic", "time", "radialLinear" (you have to use one that works with your data).
		// For more options checkout: http://www.chartjs.org/docs/#scales
		xaxisType: "time",

		// Display X-Axis ticks.
		xaxisLabelTicks: true,

		// Position of the horizontal scale labels (top, left, bottom and right).
		xaxisLabelsPosition: "bottom",
		
		// Show information lables.
		showGraphLabels: true,
		// Position of information lables (top, left, bottom and right).
		showGraphLabelsPosition: "top",
		// Box before text.  R    G    B   Weight
		boxFontColor: "rgba(153, 153, 153, 0.6)",
		boxWidth: 2,

		// Axis color.    R    G    B   Weight
		xaxisColor: "rgba(255, 255, 255, 0.1)",

		// Default line bezier curve tension (recommended 0 - 0.4). Set to 0 for no bezier curves.
		lineTension: 0.2,
		
		// Tooltips enebeld/disabeld (displays if hoovering over tha graph points). 
		tooltipEnabeld: true,
		// Tooltip background         R  G  B  Weight
		tooltipBackgroundColor: "rgba(0, 0, 0, 0.8)",
		// Tooltip text colors.      R    G    B   Weight
		tooltipBodyFontColor: "rgba(255, 255, 255, 1)",
		tooltipTitleFontColor: "rgba(255, 255, 255, 1)",
		tooltipDisplayColorsBoxes: true,
		
		// Graph 1 information:
		// Colors.              R    G    B   Weight
		graphGridColor0: "rgba(255, 255, 255, 0.1)",
		graphTickColor0: "rgba(120, 120, 255, 0.8)",
		graphLineColor0: "rgba(80, 80, 255, 1)",
		graphFillColor0: "rgba(80, 80, 255, 0.4)",
		// Fill or not.
		graphFill0: false,
		// Line width.
		graphBorderWidth0: 2,
		// Scale position. 
		graphScalePos0: "left",
		// Display Y-Axis ticks.
		graphLabelTicks0: true,
		// Size of the value steps on the scale (0 = Auto).
		graphScaleStepSize0: 0,
		// Text after the graph example box.
		graphLabel0: "Dummy A",
		// Show vertical side label.
		graphShowScaleLabel0: false,
		// The text on the vertical label.
		graphTextScaleLabel0: "Dummy A",
		// Stack the graph.
		graphstacked0: false,

		// Graph 2 information:
		// Colors.              R    G    B   Weight
		graphGridColor1: "rgba(255, 255, 255, 0.1)",
		graphTickColor1: "rgba(80, 200, 80, 0.6)",
		graphLineColor1: "rgba(80, 200, 80, 1)",
		graphFillColor1: "rgba(80, 200, 80, 0.4)",
		// Fill or not.
		graphFill1: false,
		// Line width.
		graphBorderWidth1: 2,
		// Scale position (left or right). 
		graphScalePos1: "right",
		// Display Y-Axis ticks.
		graphLabelTicks1: true,
		// Size of the value steps on the right side (0 = Auto).
		graphScaleStepSize1: 0,
		// Text after the graph example box.
		graphLabel1: "Dummy B",
		// Show vertical side label.
		graphShowScaleLabel1: false,
		// The text on the vertical label.
		graphTextScaleLabel1: "Dummy B",
		// Stack the graph.
		graphstacked1: false,

		// Graph 3 information:
		// Colors.              R    G    B   Weight
		graphGridColor2: "rgba(255, 255, 255, 0.1)",
		graphTickColor2: "rgba(200, 80, 80, 0.6)",
		graphLineColor2: "rgba(200, 80, 80, 1)",
		graphFillColor2: "rgba(200, 80, 80, 0.4)",
		// Fill or not.
		graphFill2: false,
		// Line width.
		graphBorderWidth2: 2,
		// Scale position (left or right). 
		graphScalePos2: "left",
		// Display Y-Axis ticks.
		graphLabelTicks2: true,
		// Size of the value steps on the right side (0 = Auto).
		graphScaleStepSize2: 0,
		// Text after the graph example box.
		graphLabel2: "Dummy C",
		// Show vertical side label.
		graphShowScaleLabel2: false,
		// The text on the vertical label.
		graphTextScaleLabel2: "Dummy C",
		// Stack the graph.
		graphstacked2: false,

		// Graph 4 information:
		// Colors.              R    G    B   Weight
		graphGridColor3: "rgba(255, 255, 255, 0.1)",
		graphTickColor3: "rgba(200, 200, 80, 0.6)",
		graphLineColor3: "rgba(200, 200, 80, 1)",
		graphFillColor3: "rgba(200, 200, 80, 0.4)",
		// Fill or not.
		graphFill3: false,
		// Line width.
		graphBorderWidth3: 2,
		// Scale position (left or right). 
		graphScalePos3: "right",
		// Display Y-Axis ticks.
		graphLabelTicks3: true,
		// Size of the value steps on the right side (0 = Auto).
		graphScaleStepSize3: 0,
		// Text after the graph example box.
		graphLabel3: "Dummy D",
		// Show vertical side label.
		graphShowScaleLabel3: false,
		// The text on the vertical label.
		graphTextScaleLabel3: "Dummy D",
		// Stack the graph.
		graphstacked3: false,

	},

	// Get the Module CSS.
	getStyles: function() {
		return ["MMM-Chart.css"];
	},
	
	// Get the needed scripts to make graphs.
	getScripts: function() {
		return [
			this.file('node_modules/moment/min/moment.min.js'),
			this.file('node_modules/chart.js/dist/Chart.min.js')
		]
	},
	
	// Starting up.
	start: function() {
		this.scheduleUpdate();
		this.dataid = 0;
		this.chartData = {labels: [], datasets: [] }
		this.config.identifier = this.identifier;
		
		// Triggers the get data.
		this.getData(this.config);
		
		// Setup all data variables.
		for (var q = 0; q < this.config.numberOfGraphs; q++) {
			this.chartData.datasets[q] = { data:[] };
		}
	},
	
	// Request the graph data.
	getData: function (data) {
		this.sendSocketNotification('GET_GRAPH_DATA', data);
	},

	// Getting the grapg data (from all graph modules).
	socketNotificationReceived: function(notification, payload) {
		if (notification === "GRAPH_DATA_RESULT") {

			// Checks if the data is to this instans of the graph module.
			if (this.identifier === payload.identifier) {

				// Show it all!
				//Log.info('Parsed payload: ' + JSON.stringify(payload));
	
				// Parsing the JSON data to an array.
				payload = JSON.parse(payload.body);
				//Log.info('Parsed payload body: ' + JSON.stringify(payload));

				// Reset all data gprah lines.
				for (var q = 0; q < this.config.numberOfGraphs; q++) {
					this.chartData.datasets[q] = { data:[] };
				}
				
				// Counting trough the new graph data.
				for (var i = 0, toI = payload.length; i < toI; i++) {
					// Setting up the graph "labels".
					this.chartData.labels.push(payload[i][0]);
					
					// Setting up the graphs data.
					for (var j = 1, toJ = payload[i].length; j < toJ; j++) {
						if (typeof this.chartData.datasets[j-1] != 'undefined' || this.chartData.datasets[j-1] != null) {
							this.chartData.datasets[j-1].data.push(payload[i][j]);
						}
					}
				}
				//Log.info('Length = ' + this.chartData.datasets.length);
				// Update the graphs.
				this.updateChartData();
				this.updateDom(self.config.fadeSpeed);
			}
		}
	},
	
	// Updating routine.
	scheduleUpdate: function(delay) {
		var nextLoad = this.config.updateInterval;
		if (typeof delay !== "undefined" && delay >= 0) {
			nextLoad = delay;
		}

		var self = this;
		setInterval(function() {
			self.getData(self.config.url);
		}, nextLoad);
	},
	
	// Parsing the data and preparing for the graph chart.
	updateChartData: function() {
		if(this.myChart !== undefined) {
			this.myChart.data.labels = this.chartData.labels;
			//Log.info('Length = ' + this.myChart.data.datasets.length);
			for (var i = 0; i < this.myChart.data.datasets.length && i < this.chartData.datasets.length; i++) {
				this.myChart.data.datasets[i].data = this.chartData.datasets[i].data;
			}
			this.myChart.update();
		}
	},

	// Override dom generator.
	getDom: function() {
		var wrapper = document.createElement("div");
		this.ctx = document.createElement("canvas");
		wrapper.appendChild(this.ctx);

		// Graph options.
		var options = {
			responsive: true,
			maintainAspectRatio: true,
			legend: {
				display: this.config.showGraphLabels,
				position: this.config.showGraphLabelsPosition,
				labels: {
					boxWidth: this.config.boxWidth,
					fontFamily: "Arial",
					//fontFamily: "Roboto-Black",
					fontColor: this.config.boxFontColor
				}
			},
			tooltips: {
				enabled: this.config.tooltipEnabeld,
				backgroundColor: this.config.tooltipBackgroundColor,
				displayColors: this.config.tooltipDisplayColorsBoxes,
				titleFontColor: this.config.tooltipTitleFontColor,
				bodyFontColor: this.config.tooltipBodyFontColor,
				mode: "x",
				callbacks: {
					title: function(ti, data) {
						return moment(ti[0].xLabel).format("HH:mm:ss");
					},
					label: function(ti, data) {
						if (ti.datasetIndex == 0) {
							return data.datasets[ti.datasetIndex].data[ti.index];
						} else if(ti.datasetIndex == 1) {
							return data.datasets[ti.datasetIndex].data[ti.index];
						} else {
							return data.datasets[ti.datasetIndex].data[ti.index].toString();
						}
					}
				}
			}
			
		};
		
		// Start of the Scales.
		var optionScales = {
			scales: {
				xAxes: [],
				yAxes: []
			}
		};

		// X Axis Scale.
		var xAxis0 = {
			display: this.config.xaxisLabelTicks,
			type: this.config.xaxisType,
			position: this.config.xaxisLabelsPosition,
			time: {
				displayFormats: {},
				unit: this.config.xaxisTimeUnit,
			},
			gridLines: {
				color: this.config.xaxisColor
			}
		};
		
		// Adding Graph XAxis to chart.
		optionScales.scales.xAxes.push(xAxis0);

		// Adding Graph label and color settings to chart.
		for (var y = 0; y < this.chartData.datasets.length; y++) {		
			// Graph 1.
			yAxis0 = {
				display: this.config['graphLabelTicks' + y],
				stacked: this.config['graphstacked' + y],
				position: this.config['graphScalePos' + y],
				id: "y-axis-" + y,
				scaleLabel: {
					display: this.config['graphShowScaleLabel' + y],
					labelString: this.config['graphTextScaleLabel' + y]
				},
				gridLines: {
					color: this.config['graphGridColor' + y]
				},
				ticks: {
					stepSize: this.config['graphScaleStepSize' + y],
					//minStepSize: 0.2,	
					fontColor: this.config['graphTickColor' + y],
					callback: function(val) {
						if (!isNaN(val)) {
							val = Math.round(val * 100) / 100
						}
						return val;
					}
				}
			};
			optionScales.scales.yAxes.push(yAxis0);
		};

		// Scale option elements.
		var optionelements = {
			elements: {
				point: {
					radius: 0,
					hitRadius: 3,
					hoverRadius: 3,
				},
				line: {
					tension: this.config.lineTension,
				}
			}
		};

		// Start graph datasets.
		var graphdatasets = [];

		// Adding Graph line settings to chart.
		for (var g = 0; g < this.chartData.datasets.length; g++) {
			graph0 = {
				label: this.config['graphLabel' + g],
				yAxisID: "y-axis-" + g,
				borderColor: this.config['graphLineColor' + g],
				backgroundColor: this.config['graphFillColor' + g],
				fill: this.config['graphFill' + g],
				borderWidth: this.config['graphBorderWidth' + g],
				data: [],
			};
			graphdatasets.push(graph0);
			//Log.info(JSON.stringify(graph0));
		};

		// Merging it all.
		Object.assign(options, optionelements, optionScales);

		// Show it all...
		//Log.info(JSON.stringify(options));
		
		// Setting the time scale.
		if (this.config.xaxisTimeUnit == "millisecond") {
			options.scales.xAxes[0].time.displayFormats.millisecond = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "second") {
			options.scales.xAxes[0].time.displayFormats.second = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "minute") {
			options.scales.xAxes[0].time.displayFormats.minute = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "hour") {
			options.scales.xAxes[0].time.displayFormats.hour = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "day") {
			options.scales.xAxes[0].time.displayFormats.day = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "week") {
			options.scales.xAxes[0].time.displayFormats.week = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "month") {
			options.scales.xAxes[0].time.displayFormats.month = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "quarter") {
			options.scales.xAxes[0].time.displayFormats.quarter = this.config.xaxisTimeFormatLabels
		} else if (this.config.xaxisTimeUnit == "year") {
			options.scales.xAxes[0].time.displayFormats.year = this.config.xaxisTimeFormatLabels
		}

		// Show it all again...
		//Log.info(JSON.stringify(options));

		// Creating the actual graph.
		this.myChart = new Chart(this.ctx, {
			defaults: {
				global: {
					fontSize: 80,
				}
			},
			type: this.config.graphStyle,
			data: {
				labels: [],
				datasets: graphdatasets,
			},
			options: options
		});
		this.updateChartData();
		return wrapper;
	}
});
