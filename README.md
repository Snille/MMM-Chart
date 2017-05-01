
Previews:

https://youtu.be/BF3O1WppKyg

https://youtu.be/-py3-ztZrOw

https://youtu.be/yZVpO0qaxCI

This is a work in progress!

````javascript
		{
			module: "MMM-Chart",
			position: "top_center",
			header: "Chart",
			config: {
				// URL that gives a json table back.
				// Like this [["YYYY-MM-DD HH:mm",floatnumber,floatnumber],["YYYY-MM-DD HH:mm",floatnumber,floatnumber]] Gives two graphs.
				// Example: [["2017-04-21 15:58:00",8.3,95.5],["2017-04-21 14:55:00",9.3,90.5],["2017-04-21 12:56:00",10.7,87.7],["2017-04-21 11:53:00",10.5,87.7],["2017-04-21 11:01:00",10.6,88.8]]

				// For realtime Graphs use data like this:
				// Example: [["2017-04-21 15:58:00",8.3,95.5]] <- This will create a two line realtime graph.
				// And specify the option "additiveGraph: true"
				
				name: "my-chart",
				url: "http://your.json.url.here",
				graphLabel0: "Temp C",
				graphLabel1: "Humid %",
				xaxisTimeUnit: "hour",
				xaxisTimeFormatLabels: "HH",
			}
		},
````
Also, you have to set the width of the graph (with your name) in the custom.css file, otherwise you will not see anything.

````css
.my-chart {
	width: 355px;
}
````

Here are two examples using JSON tables with two graphs each.
A JSON table like this is used: [["2017-04-21 15:58:00",8.3,95.5],["2017-04-21 14:55:00",9.3,90.5],["2017-04-21 12:56:00",10.7,87.7],["2017-04-21 11:53:00",10.5,87.7],["2017-04-21 11:01:00",10.6,88.8]]
I'm pulling this table form a database every minute.

````javascript
		{
			module: 'MMM-Chart',
			position: 'middle_center',
			header: 'Inside temprature over 24 hours',
			config: {
				name: "livingroom",
				url: "http://10.0.0.20/housedata/index2.php?id=3,5&max=24&sort=desc",
				xaxisLabelTicks: true,
				maintainAspectRatio: false,
				graphLabel0: "Inside Temp C",
				graphLineColor0: "rgba(200, 200, 200, 1)",
				graphTickColor0: "rgba(200, 200, 200, 0.8)",
				graphFillColor0: "rgba(200, 200, 200, 0.4)",
				graphLabel1: "Inside Humid %",
				graphLineColor1: "rgba(100, 100, 100, 1)",
				graphTickColor1: "rgba(100, 100, 100, 0.8)",
				graphFillColor1: "rgba(100, 100, 100, 0.4)",
				xaxisTimeUnit: "hour",
				xaxisTimeFormatLabels: "HH:mm",
			}
		},
		{
			module: 'MMM-Chart',
			position: 'middle_center',
			header: 'Outside temprature over 24 hours',
			config: {
				name: "Outside-Month",
				url: "http://10.0.0.20/housedata/index2.php?id=9,10&max=24&sort=desc",
				graphStyle: "line",
				xaxisLabelTicks: true,
				maintainAspectRatio: false,
				graphLabel0: "Out Temp C",
				graphLineColor0: "rgba(200, 200, 200, 1)",
				graphTickColor0: "rgba(200, 200, 200, 0.8)",
				graphFillColor0: "rgba(200, 200, 200, 0.4)",
				graphLabel1: "Out Humid %",
				graphLineColor1: "rgba(100, 100, 100, 1)",
				graphTickColor1: "rgba(100, 100, 100, 0.8)",
				graphFillColor1: "rgba(100, 100, 100, 0.4)",
				xaxisTimeUnit: "hour",
				xaxisTimeFormatLabels: "HH:mm",
			}
		},
````
Here is an example using a JSON source with three graphs for realtime graphs.
The JSON data looks like this: [["2017-04-21 15:58:00",48.3,95.5,31]]
It's refreshed every other second from the firewall.

````javascript
		{
			module: 'MMM-Chart',
			position: 'middle_center',
			header: 'Traffic on Firewall WAN Interface Last minute',
			config: {
				name: "pFSense",
				url: "http://10.0.0.20/housedata/firewall.php?interface=wan&in=1&out=1&delay=1",
				graphStyle: "line",
				additiveGraph: true,
				updateInterval: 2000,
				xaxisLabelTicks: false,
				xaxisTimeUnit: "second",
				graphPoints: 30,
				graphLabel0: "In kbps",
				graphFill0: true,
				graphTicksZero0: true,
				graphLineColor0: "rgba(200, 200, 200, 1)",
				graphTickColor0: "rgba(200, 200, 200, 0.8)",
				graphFillColor0: "rgba(200, 200, 200, 0.4)",
				graphLabel1: "Out kbps",
				graphFill1: true,
				graphTicksZero1: true,
				graphLineColor1: "rgba(100, 100, 100, 1)",
				graphTickColor1: "rgba(100, 100, 100, 0.8)",
				graphFillColor1: "rgba(100, 100, 100, 0.4)",
				graphLabel2: "Delay ms",
				graphLineColor2: "rgba(80, 80, 80, 1)",
				graphTickColor2: "rgba(80, 80, 80, 0.8)",
				graphFillColor2: "rgba(80, 80, 80, 0.4)",
			}
		},