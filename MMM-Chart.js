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
//		url: "http://10.0.0.20/housedata/multiindex.php?id=20,21&max=5&sort=desc",
//		url: "http://10.0.0.20/housedata/multiindex.php?id=20,21&max=5&sort=desc",
		url: "http://10.0.0.20/housedata/index.php?id=20&max=144&sort=desc",
		//unit: "day",
		unit: "hour",
		//unit: "month",
		//unit: "quarter",

	},

	// Get the Module CSS.
	getStyles: function() {
		return ["MMM-Chart.css"];
	},
	
	// Get the needed scripts to make graphs.
	getScripts: function() {
		return [
			this.file('js/moment.js'),
			this.file('js/chart.js')
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
		this.sendSocketNotification('GET_GRAPH_DATA', url);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "GRAPH_DATA_RESULT") {
			//Log.info('payload: ' + payload);

			payload = JSON.parse(payload);
			Log.info('JSON parsed payload: ' + payload);
//			Log.info('JSON parsed payload S20: ' + payload.s20);
//			Log.info('JSON parsed payload S21: ' + payload.s21);

//			Log.info('Value ' + JSON.stringify(payload.s21));
			
			// How can it be 10?!
//			le = payload.s21.length;
//			Log.info('Length: ' + le);


			this.chartData.datasets[0].data = [];
			//this.chartData.datasets[1].data = [];
			//this.chartData.labels = [];

			for (var i = 0, toI = payload.length; i < toI; i++) {
//			for (var i = 0, toI = payload.s20.length; i < toI; i++) {
//				Log.info(i + ' Data 20 = ' + payload.s20[i]);
//				Log.info(i + ' Data 21 = ' + payload.s21[i]);
				this.chartData.labels.push(payload[i][0]);
				this.chartData.datasets[0].data.push(payload[i][1]);
/*
				this.chartData.labels.push(payload.s20[i]);
//				this.chartData.labels.push(payload.s21[i]);
				this.chartData.datasets[0].data.push(payload.s20[i]);
				this.chartData.datasets[1].data.push(payload.s21[i]);
*/
			}
			this.updateChartData();
			//this.updateDom(self.config.fadeSpeed);
		}
	},
	
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

			Log.info('Data Length: ' + this.myChart.data.datasets.length);

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
					label: "Temp",
					yAxisID: "y-axis-0",
					borderColor: "rgba(255, 255, 255, 1)",
					backgroundColor: "rgba(255, 255, 255, 1)",
					fill: false,
					data: [],
				},

				{
					label: "Vet",
					yAxisID: "y-axis-1",
					borderColor: "rgba(153, 153, 153, 1)",
					backgroundColor: "rgba(153, 153, 153, 1)",
					fill: false,
					data: []
				}

				]
			},
			options: {
				responsive: true,
				legend: {
					display: false
				},
				tooltips: {
					mode: "x",
					callbacks: {
						title: function(ti, data) {
							return moment(ti[0].xLabel).format("HH:mm:ss");
						},
						label: function(ti, data) {
							if (ti.datasetIndex == 0) {
								return data.datasets[ti.datasetIndex].data[ti.index] + " C";

							} else if(ti.datasetIndex == 1) {
								return data.datasets[ti.datasetIndex].data[ti.index] + " %";

							} else {
								return data.datasets[ti.datasetIndex].data[ti.index].toString();
							}
						}
					}
				},
				elements: {
					point: {
						radius: 0,
						hitRadius: 6,
						hoverRadius: 6,
					}
				},
				scales: {
					xAxes: [{
						type: "time",
						time: {
							unit: this.config.unit,
							displayFormats: {
								hour: "HH:mm"
							},
						},
						gridLines: {
							color: "rgba(255, 255, 255, 0.1)"
						}
					}],
					yAxes: [{
						position: "left",
						id: "y-axis-0",
						scaleLabel: {
							display: false,
							labelString: "C"
						},
						gridLines: {
							color: "rgba(255, 255, 255, 0.1)"
						},
						ticks: {
							fontColor: "rgba(255, 255, 255, 1)",
							callback: function(val) {
								return val + " C";
							}
						}
					},

					{
						position: "right",
						id: "y-axis-1",
						scaleLabel: {
							display: false,
							labelString: "vet"
						},
						gridLines: {
							color: "rgba(255, 255, 255, 0.1)"
						},
						ticks: {
							fontColor: "rgba(255, 255, 255, 0.6)",
							callback: function(val) {
								return val + "%";
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
