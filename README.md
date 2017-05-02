
# MMM-Chart

!!This is a work in progress!!

This an extension for the [MagicMirror²](https://magicmirror.builders/).

This Module adds graphs to your mirror using your JSON source(s).

### Screen shots

Module with three graphs in traditional MagicMirror colors:

![MMM-Chart 3 Graphs(https://github.com/Snille/MMM-Chart/blob/master/.github/graph00.png)](https://youtu.be/BF3O1WppKyg)

Module two filled graps and a regular line graph in non traditional MM colors:

![Modulebar Column Symbols](https://github.com/Snille/MMM-Chart/blob/master/.github/graph02.png)

Module two line graps in non traditional MM colors:

![Modulebar Column Symbols](https://github.com/Snille/MMM-Chart/blob/master/.github/graph01.png)

Another vidoe preview:

https://youtu.be/-py3-ztZrOw

### Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/Snille/MMM-Chart.git
````

### Using the module

See some examples below.
 
There are ALOT of configuration options for this module. You can read inside the MMM-Chart.js file to find out more.

I will add a table here in time. :)

OBS: You have to set the width of the graph (with your graph name) in the custom.css file, otherwise you will not see anything!

Like so:

````css
.my-chart {
	width: 355px;
}
````

### Examples

Here are two examples using JSON tables with two graphs each.
A JSON table like this is used: [["2017-04-21 15:58:00",8.3,95.5],["2017-04-21 14:55:00",9.3,90.5],["2017-04-21 12:56:00",10.7,87.7],["2017-04-21 11:53:00",10.5,87.7],["2017-04-21 11:01:00",10.6,88.8]]
I'm pulling this table form a database every minute.

````javascript
		{
			module: 'MMM-Chart',
			position: 'middle_center',
			header: 'Inside temprature over 24 hours',
			config: {
				name: "inside",
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
				name: "outside",
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
				name: "firewall",
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
````

And to set the size, add in your custom.css file for the above graps.

````CSS
.inside {
	width: 1060px;
	height: 180px;
}
.outside {
	width: 1060px;
	height: 180px;
}
.firewall {
	width: 355px;
}
````

More information will come...
