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
		// How many graphlines do you want?
		// All data has to have the same xaxis (horizontal axis).
		numberOfGraphs: 10,

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
		url: "http://10.0.0.20/housedata/index2.php?id=13,14,20&max=44&sort=desc",

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
		xaxisTimeFormatLabels: "HH:mm",
		// Example for day above.
		//xaxisTimeFormatLabels: "YYYY-MM-DD",
		// Example for week above.
		//xaxisTimeFormatLabels: "WW",
		// Example for month above.
		//xaxisTimeFormatLabels: "MM",
		
		// Available: "category", "linear", "logarithmic", "time", "radialLinear" (you have to use one that works with your data).
		// For more options checkout: http://www.chartjs.org/docs/#scales
		xaxisType: "time",

		// Position of the horizontal scale labels (top, left, bottom and right).
		xaxisLabelsPosition: "bottom",
		
		// Position of information lables (top, left, bottom and right).
		showGraphLabelsPosition: "top",
		
		showGraphLabels: true,
		// Box before text.  R    G    B   Weight
		boxFontColor: "rgba(153, 153, 153, 0.6)",
		boxWidth: 2,

		// Axis color.    R    G    B   Weight
		xaxisColor: "rgba(255, 255, 255, 0.1)",

		// Default line bezier curve tension (recommended 0 - 0.4). Set to 0 for no bezier curves.
		lineTension: 0.4,
		
		// Tooltips enebeld/disabeld (displays if hoovering over tha graph points). 
		tooltipEnabeld: true,
		// Tooltip background         R  G  B  Weight
		tooltipBackgroundColor: "rgba(0, 0, 0, 0.8)",
		// Tooltip text colors.      R    G    B   Weight
		tooltipBodyFontColor: "rgba(255, 255, 255, 1)",
		tooltipTitleFontColor: "rgba(255, 255, 255, 1)",
		tooltipDisplayColorsBoxes: true,

		// Graph 0 information:
		// Colors.              R    G    B   Weight
		graph0GridColor: "rgba(255, 255, 255, 0.1)",
		graph0TickColor: "rgba(120, 120, 255, 0.8)",
		graph0LineColor: "rgba(80, 80, 255, 1)",
		graph0FillColor: "rgba(80, 80, 255, 0.4)",
		// Fill or not.
		graph0Fill: false,
		// Line width.
		graph0BorderWidth: 2,
		// Scale position. 
		graph0ScalePos: "left",
		// Size of the value steps on the scale (0 = Auto).
		graph0ScaleStepSize: 0,
		// Text after the graph example box.
		graph0Label: "Temprature C",
		// Show vertical side label.
		graph0ShowScaleLabel: false,
		// The text on the vertical label.
		graph0TextScaleLabel: "Temprature C",

		// Graph 1 information:
		// Colors.              R    G    B   Weight
		graph1GridColor: "rgba(255, 255, 255, 0.1)",
		graph1TickColor: "rgba(80, 200, 80, 0.6)",
		graph1LineColor: "rgba(80, 200, 80, 1)",
		graph1FillColor: "rgba(80, 200, 80, 0.4)",
		// Fill or not.
		graph1Fill: false,
		// Line width.
		graph1BorderWidth: 2,
		// Scale position (left or right). 
		graph1ScalePos: "right",
		// Size of the value steps on the right side (0 = Auto).
		graph1ScaleStepSize: 0,
		// Text after the graph example box.
		graph1Label: "Humidity %",
		// Show vertical side label.
		graph1ShowScaleLabel: false,
		// The text on the vertical label.
		graph1TextScaleLabel: "Humidity %",

		// Graph 2 information:
		// Colors.              R    G    B   Weight
		graph2GridColor: "rgba(255, 255, 255, 0.1)",
		graph2TickColor: "rgba(200, 80, 80, 0.6)",
		graph2LineColor: "rgba(200, 80, 80, 1)",
		graph2FillColor: "rgba(200, 80, 80, 0.4)",
		// Fill or not.
		graph2Fill: false,
		// Line width.
		graph2BorderWidth: 2,
		// Scale position (left or right). 
		graph2ScalePos: "right",
		// Size of the value steps on the right side (0 = Auto).
		graph2ScaleStepSize: 0,
		// Text after the graph example box.
		graph2Label: "Dummy D",
		// Show vertical side label.
		graph2ShowScaleLabel: false,
		// The text on the vertical label.
		graph2TextScaleLabel: "Dummy D",
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
				////Log.info('JSON parsed payload: ' + payload);
	
				// Parsing the JSON data to an array.
				payload = JSON.parse(payload.body);

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
						this.chartData.datasets[j-1].data.push(payload[i][j]);
					}
				}
				//Log.info('Length = ' + this.chartData.datasets.length);
				// Update the graphs.
				this.updateChartData();
				//this.updateDom(self.config.fadeSpeed);
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
//		this.ctx.canvas.width = this.config.graphWidth;
//		this.ctx.canvas.height = this.config.graphHeight;
//		this.canvas.width = 300;
//		this.canvas.height = 200;
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
						// Need to be abel to change the format here!!
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
			},
			elements: {
				point: {
					radius: 0,
					hitRadius: 3,
					hoverRadius: 3,
				},
				line: {
					tension: this.config.lineTension,
				}
			},
			scales: {
				xAxes: [{
					type: this.config.xaxisType,
					position: this.config.xaxisLabelsPosition,
					time: {
						displayFormats: {},
						unit: this.config.xaxisTimeUnit,
					},
					gridLines: {
						color: this.config.xaxisColor
					}
				}],
				yAxes: [
				// Graph 1
					{
						position: this.config.graph0ScalePos,//"left",
						id: "y-axis-0",
						scaleLabel: {
							display: this.config.graph0ShowScaleLabel,
							labelString: this.config.graph0TextScaleLabel
						},
						gridLines: {
							color: this.config.graph0GridColor
						},
						ticks: {
							stepSize: this.config.graph0ScaleStepSize,
							//minStepSize: 0.2,	
							fontColor: this.config.graph0TickColor,
							callback: function(val) {
								if (!isNaN(val)) {
									val = Math.round(val * 100) / 100
								}
								return val;
							}
						}
					},
				// Graph 2
					{
						position: this.config.graph1ScalePos,//"right",
						id: "y-axis-1",
						scaleLabel: {
							display: this.config.graph1ShowScaleLabel,
							labelString: this.config.graph1TextScaleLabel
						},
						gridLines: {
							color: this.config.graph1GridColor
						},
						ticks: {
							stepSize: this.config.graph1ScaleStepSize,
							//minStepSize: 0.2,
							fontColor: this.config.graph1TickColor,
							callback: function(val) {
								if (!isNaN(val)) {
									val = Math.round(val * 100) / 100
								}
								return val;
							}
						}
					},
				// Graph 3
					{
						position: this.config.graph2ScalePos,//"left",
						id: "y-axis-2",
						scaleLabel: {
							display: this.config.graph2ShowScaleLabel,
							labelString: this.config.graph2TextScaleLabel
						},
						gridLines: {
							color: this.config.graph2GridColor
						},
						ticks: {
							stepSize: this.config.graph2ScaleStepSize,
							//minStepSize: 0.2,
							fontColor: this.config.graph2TickColor,
							callback: function(val) {
								if (!isNaN(val)) {
									val = Math.round(val * 100) / 100
								}
								return val;
							}
						}
					}
				]
			}
		};

		// Ghraph datasets
		var graphdatasets = [
		// Graph 1
			{
				label: this.config.graph0Label,
				yAxisID: "y-axis-0",
				borderColor: this.config.graph0LineColor,
				backgroundColor: this.config.graph0FillColor,
				fill: this.config.graph0Fill,
				borderWidth: this.config.graph0BorderWidth,
				data: [],
			},
		// Graph 2
			{
				label: this.config.graph1Label,
				yAxisID: "y-axis-1",
				borderColor: this.config.graph1LineColor,
				backgroundColor: this.config.graph1FillColor,
				fill: this.config.graph1Fill,
				borderWidth: this.config.graph1BorderWidth,
				data: [],
			},
		// Graph 3
			{
				label: this.config.graph2Label,
				yAxisID: "y-axis-2",
				borderColor: this.config.graph2LineColor,
				backgroundColor: this.config.graph2FillColor,
				fill: this.config.graph2Fill,
				borderWidth: this.config.graph2BorderWidth,
				data: []
			}
		];

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
		
		// Creating the actual graph.
		this.myChart = new Chart(this.ctx, {
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
