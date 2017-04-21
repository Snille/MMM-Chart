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

	// Default module config.
	defaults: {
		// How long between updates. 
		updateInterval: 60000,
		// Animation speed.
		fadeSpeed: 1000,

		// URL to graph data.
//		url: "http://10.0.0.20/housedata/index1.php?id=20&max=5&sort=desc",
//		url: "http://10.0.0.20/housedata/index1.php?id=3&max=144&sort=desc",
		url: "http://10.0.0.20/housedata/index2.php?id=9,10&max=50&sort=desc",

		// Timeunit the graphs should be ploted in.
		// Checkout: http://momentjs.com/docs/#/displaying/format/
		//timeUnit: "millisecond",
		//timeUnit: "second",
		//timeUnit: "minute",
		//timeUnit: "hour",
		timeUnit: "day",
		//timeUnit: "week",
		//timeUnit: "month",
		//timeUnit: "quarter",
		//timeUnit: "year",

		// Time format of the unit above.
		// Checkout: http://momentjs.com/docs/#/displaying/format/
		timeFormatLabels: "HH:mm",

		// Left side vertical label.
		showLeftScaleLabel: false,
		textLeftScaLelabel: "Temprature C",

		// Right side vertical label.
		showRightScaleLabel: false,
		textRightScaleLabel: "Humidity %",

		showGraphLabels: true,
		// Box before text.  R    G    B   Weight
		boxFontColor: "rgba(153, 153, 153, 0.6)",
		boxWidth: 2,
		// Text after the box.
		graph1Label: "Temprature C",
		graph2Label: "Humidity %",
		
		// Axis color.    R    G    B   Weight
		axisColor: "rgba(255, 255, 255, 0.1)",

		// Default line bezier curve tension (0-0.4). Set to 0 for no bezier curves.
		lineTension: 0.4,
		
		// Graph 1 colors.      R    G    B   Weight
		graph1GridColor: "rgba(255, 255, 255, 0.1)",
		graph1TickColor: "rgba(120, 120, 255, 0.8)",
		graph1LineColor: "rgba(80, 80, 255, 1)",
		graph1FillColor: "rgba(80, 80, 255, 0.4)",
		graph1Fill: false,

		// Graph 2 colors.      R    G    B   Weight
		graph2GridColor: "rgba(255, 255, 255, 0.1)",
		graph2TickColor: "rgba(80, 200, 80, 0.6)",
		graph2LineColor: "rgba(80, 200, 80, 1)",
		graph2FillColor: "rgba(80, 200, 80, 0.4)",
		graph2Fill: false,

		// Tooltips enebeld/disabeld. 
		tooltipEnabeld: true,
		// Tooltip background         R  G  B  Weight
		tooltipBackgroundColor: "rgba(0, 0, 0, 0.8)",
		// Tooltip text colors.      R    G    B   Weight
		tooltipBodyFontColor: "rgba(255, 255, 255, 1)",
		tooltipTitleFontColor: "rgba(255, 255, 255, 1)",
		tooltipDisplayColorsBoxes: true,
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

	start: function() {
		this.scheduleUpdate();
		this.dataid = 0;
		this.chartData = {labels: [], datasets: [] }

		// Triggers the get data.
		this.getData(this.config.url);
		
		// Setup the data variable.
		this.chartData.datasets[0] = { data:[] };
		this.chartData.datasets[1] = { data:[] };
	},
	
	getData: function (url) {
		//Log.info('ID = ' + this.identifier);
		this.sendSocketNotification('GET_GRAPH_DATA', url);
	},

	socketNotificationReceived: function(notification, payload) {
		//Log.info('Recived ID = ' + id);
		if (notification === "GRAPH_DATA_RESULT") {

    /*************** Two Graphs working ******************/

			// Parsing the JSON data to an array.
			payload = JSON.parse(payload);
			// Show it.
			////Log.info('JSON parsed payload: ' + payload);

			// Reset the data chart
			this.chartData.datasets[0].data = [];
			this.chartData.datasets[1].data = [];
			
			// Counting trough the data.
			for (var i = 0, toI = payload.length; i < toI; i++) {

				// Setting up the "labels".
				this.chartData.labels.push(payload[i][0]);

				// Setting up the graphdata.
				this.chartData.datasets[0].data.push(payload[i][1]);
				this.chartData.datasets[1].data.push(payload[i][2]);
			}
			// Update the graph.
			this.updateChartData();
			//this.updateDom(self.config.fadeSpeed);
		}
	},
    /*****************************************************/
	
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
	
	updateChartData: function() {
		if(this.myChart !== undefined) {
			this.myChart.data.labels = this.chartData.labels;
			for(var i = 0; i < this.myChart.data.datasets.length && i < this.chartData.datasets.length; i++) {
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

		this.myChart = new Chart(this.ctx, {
			type: "line",
			data: {
				labels: [],
				datasets: [{
					label: this.config.graph1Label,
					yAxisID: "y-axis-0",
					borderColor: this.config.graph1LineColor,
					backgroundColor: this.config.graph1FillColor,
					fill: this.config.graph1Fill,
					data: [],
				},

				{
					label: this.config.graph2Label,
					yAxisID: "y-axis-1",
					borderColor: this.config.graph2LineColor,
					backgroundColor: this.config.graph2FillColor,
					fill: this.config.graph2Fill,
					data: []
				}

				]
			},
			options: {
				responsive: true,
				legend: {
					display: this.config.showGraphLabels,
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
						type: "time",
						time: {
							unit: this.config.timeUnit,
							displayFormats: {
								hour: this.config.timeFormatLabels,
							},
						},
						gridLines: {
							color: this.config.axisColor
						}
					}],
					yAxes: [{
						position: "left",
						id: "y-axis-0",
						scaleLabel: {
							display: this.config.showLeftScaleLabel,
							labelString: this.config.textLeftScaLelabel
						},
						gridLines: {
							color: this.config.graph1GridColor
						},
						ticks: {
							fontColor: this.config.graph1TickColor,
							callback: function(val) {
								return val;
							}
						}
					},

					{
						position: "right",
						id: "y-axis-1",
						scaleLabel: {
							display: this.config.showRightScaleLabel,
							labelString: this.config.textRightScaleLabel
						},
						gridLines: {
							color: this.config.graph2GridColor
						},
						ticks: {
							fontColor: this.config.graph2TickColor,
							callback: function(val) {
								return val;
							}
						}
					}

					]
				}
			}
		});

		this.updateChartData();

		return wrapper;
	}
});
