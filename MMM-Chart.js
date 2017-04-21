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
		// URL to fetch data from.

		// Two graphs.
//		url: "http://10.0.0.20/housedata/multiindex.php?id=20,21&max=5&sort=desc",
//		url: "http://10.0.0.20/housedata/multiindex.php?id=20&max=5&sort=desc",

		// One graph only.
//		url: "http://10.0.0.20/housedata/index.php?id=20&max=5&sort=desc",
		url: "http://10.0.0.20/housedata/index.php?id=3&max=144&sort=desc",

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
		boxWidth: 10,
		// Text after the box.
		graph1Label: "Temprature C",
		graph2Label: "Humidity %",
		
		// Axis color.    R    G    B   Weight
		axisColor: "rgba(255, 255, 255, 0.1)",

		// Default line bezier curve tension (0-0.4). Set to 0 for no bezier curves.
		lineTension: 0.4,
		
		// Graph 1 colors.      R    G    B   Weight
		graph1GridColor: "rgba(255, 255, 255, 0.1)",
		graph1TickColor: "rgba(80,80, 200, 0.8)",
		graph1LineColor: "rgba(80, 80, 255, 1)",
		graph1FillColor: "rgba(80, 80, 255, 0.4)",
		graph1Fill: true,

		// Graph 2 colors.      R    G    B   Weight
		graph2GridColor: "rgba(255, 255, 255, 0.1)",
		graph2TickColor: "rgba(80, 200, 80, 0.6)",
		graph2LineColor: "rgba(80, 200, 80, 1)",
		graph2FillColor: "rgba(80, 200, 80, 0.4)",
		graph2Fill: true,

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
		//this.chartData.datasets[1] = { data:[] };
	},
	
	getData: function (url) {
		Log.info('ID' + this.identifier);
		this.sendSocketNotification('GET_GRAPH_DATA', url);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "GRAPH_DATA_RESULT") {

    /******************* One graph working *********************/

			// Parsing the JSON data to an array.
			payload = JSON.parse(payload);
			// Show it.
			////Log.info('JSON parsed payload: ' + payload);

			// Reset the data chart
			this.chartData.datasets[0].data = [];
			
			// Counting trough the data.
			for (var i = 0, toI = payload.length; i < toI; i++) {
				// Setting up the "labels".
				this.chartData.labels.push(payload[i][0]);
				// Setting up the graphdata.
				this.chartData.datasets[0].data.push(payload[i][1]);
			}
			// Update the graph.
			this.updateChartData();
			//this.updateDom(self.config.fadeSpeed);
		}
	},///*
    /***************** Two graphs NOT working *******************/
	/*
			// Parsing the JSON data to an array.
			payload = JSON.parse(payload);
			// Show first datastream.
			Log.info('JSON parsed payload S20: ' + payload.s20);
			// Show second datastream.
//			Log.info('JSON parsed payload S21: ' + payload.s21);

			// Tried to see whats going on...
//			Log.info('Value ' + JSON.stringify(payload.s21));
			
			// How can it be 10?!
//			le = payload.s21.length;
//			Log.info('Length: ' + le);

			// Reset the data chart for first graph.
			this.chartData.datasets[0].data = [];
			// Reset the data chart for second graph.
			//this.chartData.datasets[1].data = [];

			// Reset the labels for both graphs.
			//this.chartData.labels = [];

			// Counting trough the first grapgh data.
			for (var i = 0, toI = payload.s20.length; i < toI; i++) {
				// Trying to understand whats going on in first graph...
				Log.info(i + ' Data 20 = ' + payload.s20[i]);
				// Trying to understand whats going on in second graph...
//				Log.info(i + ' Data 21 = ' + payload.s21[i]);

				// Adding data labels (using first graphs labels) to  both graphs.
				this.chartData.labels.push(payload.s20[i][0]);

				// Adding data labels to second graph (not really used).
//				this.chartData.labels.push(payload.s21[i]);

				// Adding data to fisrt graph.
				this.chartData.datasets[0].data.push(payload.s20[i][1]);

				// Adding data to second graph.
//				this.chartData.datasets[1].data.push(payload.s21[i]);

			}
			// Update the graph.
			this.updateChartData();
			//this.updateDom(self.config.fadeSpeed);
		}
	},//*/
	
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
			Log.info('Labels: ' + this.chartData.labels);
			this.myChart.data.labels = this.chartData.labels;

			////Log.info('Datasets Length: ' + this.myChart.data.datasets.length);

			for(var i = 0; i < this.myChart.data.datasets.length && i < this.chartData.datasets.length; i++) {
				////Log.info('Data ' + i + ': ' + this.chartData.datasets[i].data);
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
								return data.datasets[ti.datasetIndex].data[ti.index];// + "C";

							} else if(ti.datasetIndex == 1) {
								return data.datasets[ti.datasetIndex].data[ti.index];// + "%";

							} else {
								return data.datasets[ti.datasetIndex].data[ti.index].toString();
							}
						}
					}
				},
				elements: {
					point: {
						radius: 0,
						hitRadius: 10,
						hoverRadius: 10,
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
								return val;// + " C";
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
								return val;// + "%";
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
