
# MMM-Chart

!!This is a work in progress!!

This an extension for the [MagicMirror²](https://magicmirror.builders/).

This Module adds graphs to your mirror using your JSON source(s).

### Screen shots

Three instanses of the module with multiple graphs in traditional MagicMirror colors (click for short video of graphs updaing):

[![MMM-Chart 3 Graphs](https://github.com/Snille/MMM-Chart/blob/master/.github/graph08.png)](https://youtu.be/BF3O1WppKyg)

Module two line graps in traditional MM colors:

![MMM-Chart Line Graphs 1](https://github.com/Snille/MMM-Chart/blob/master/.github/graph10.png)

Module two line graps in non traditional MM colors:

![MMM-Chart Line Graphs 2](https://github.com/Snille/MMM-Chart/blob/master/.github/graph01.png)

Module two filled graps and a regular line graph in non traditional MM colors:

![MMM-Chart Filled Graphs](https://github.com/Snille/MMM-Chart/blob/master/.github/graph02.png)

Another preview with three instanses of the module in non traditional MagicMirror colors (click for short video of graphs updaing):

[![MMM-Chart 3 smaller Graphs 1](https://github.com/Snille/MMM-Chart/blob/master/.github/graph07.png)](https://youtu.be/-py3-ztZrOw)

The same preview in traditional MagicMirror colors (click for short video of graphs updaing):

[![MMM-Chart 3 smaller Graphs 2](https://github.com/Snille/MMM-Chart/blob/master/.github/graph11.png)](https://youtu.be/2q3GE2t0ePI)

### Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/Snille/MMM-Chart.git
````

Run npm install:
````
cd MMM-Chart
npm install
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

### Configuration Options

Default in the config I have "pre defined" 4 "Dummy Graphs lines". If you don't specify antthing, that information will be used.
However, I recomend you to specify your own "look". :)

| Option | Description |
|---|---| 
|`url`|**Required** The URL to the graph JSON data source. You HAVE to set this!<br><br>**Default value:** `none`|
|`name`|Graph CSS class ID (name) Needs to be uniqe if you want to be able to set different sizes / module instance.<br><br>**Default value:** `my-chart`|
|`maintainAspectRatio`|Maintain aspect ratio or not. If set to false you have to provide both width and height in the custome.css (otherwise only width).<br><br>**Default value:** `true`|
|`updateInterval`|How long in millisecs between updates.<br><br>**Default value:** `60000` (one minute)|
|`graphStyle`|Type of graph. Warning, I have only really tested with "line" and "bar" graphs! For mor information checkout: [Chartjs.org](http://www.chartjs.org/docs/)<br><br>**Default value:** `line`|
|`xaxisTimeUnit`|X Axis time unit the graphs should be ploted in.<br><br>**Default value:** `hour`|
|`xaxisTimeFormatLabels`|Format for the unit above.<br>Checkout [momentjs.com](http://momentjs.com/docs/#/displaying/format/) for more information.<br><br>**Default value:** `H`|
|`xaxisType`|Available: "category", "linear", "logarithmic", "time", "radialLinear" (you have to use one that works with your data).<br>[Chartjs.org](http://www.chartjs.org/docs/) for more information.<br><br>**Default value:** `time`|
|`xaxisLabelTicks`|Display X-Axis ticks.<br><br>**Default value:** `true`|
|`xaxisLabelsPosition`|Position of the horizontal scale labels (top, left, bottom and right).<br><br>**Default value:** `bottom`|
|`additiveGraph`|Add to the graph continuously. Set to true if you want a "real time" updateing graph. Your JSON source should look something like this: [["2017-04-21 15:58:00",48.3,95.5,31]]<br><br>**Default value:** `false`|
|`graphPoints`|Max number of graph data points. If you use a "real time" graph, you should define how many points you want to see in the graph. If you update once every 5 second and you want 5 minutes of data to be shown it's 60. (60 secs * 5 minutes / 5 secs) :)<br><br>**Default value:** `10000`|
|`showGraphLabels`|Show information lables.<br><br>**Default value:** `true`|
|`showGraphLabelsPosition`|Position of information lables (top, left, bottom and right).<br><br>**Default value:** `top`|
|`boxFontColor`Box before text. R G B Weight.<br><br>**Default value:** `rgba(153, 153, 153, 0.6)`|
|`boxWidth`|Width of the box (before the label).<br><br>**Default value:** `2`|
|`xaxisColor`|Axis color. R G B Weight.<br><br>**Default value:** `rgba(255, 255, 255, 0.1)`|
|`lineTension`| Default line bezier curve tension (recommended 0 - 0.4). Set to 0 for no bezier curves.<br><br>**Default value:** `0.2`|
|`tooltipEnabeld`|Tooltips enebeld/disabeld (displays if hoovering over tha graph points).<br><br>**Default value:** `true`|
|`tooltipBackgroundColor`|Tooltip background. R G B Weight.<br><br>**Default value:** `rgba(0, 0, 0, 0.8)`|
|`tooltipBodyFontColor`|Tooltip body font color. R G B Weight.<br><br>**Default value:** `rgba(255, 255, 255, 1)`|
|`tooltipTitleFontColor`|Tooltip title font color. R G B Weight.<br><br>**Default value:** `rgba(255, 255, 255, 1)`|
|`tooltipDisplayColorsBoxes`|Display color boxes infront of the tooltip text.<br><br>**Default value:** `true`|

All graph lines uses this set of configureation values. It's only the number at the end of each option that changes for the "next" graph line.

| Graph line x | Options description |
|---|---| 
|`graphGridColor0`|Dummy Graph 1 Grid color. R G B Weight.<br><br>**Default value:** `rgba(255, 255, 255, 0.1)`|
|`graphTickColor0`|Dummy Graph 1 Tick color (text on the "sides"). R G B Weight.<br><br>**Default value:** `rgba(120, 120, 255, 0.8)`|
|`graphLineColor0`|Dummy Graph 1 Line color. R G B Weight.<br><br>**Default value:** `rgba(80, 80, 255, 1)`|
|`graphFillColor0`|Dummy Graph 1 Fill color. R G B Weight.<br><br>**Default value:** `rgba(80, 80, 255, 0.4)`|
|`graphFill0`|Fill Graph 1 or not.<br><br>**Default value:** `false`|
|`graphBorderWidth0`|Line border width.<br><br>**Default value:** `2`|
|`graphScalePos0`|Scale position (ticks) "left" or "right".<br><br>**Default value:** `left`|
|`graphLabelTicks0`|Display Y-Axis ticks.<br><br>**Default value:** `true`|
|`graphScaleStepSize0`|Size of the value steps on the scale (ticks) (0 = Auto).<br><br>**Default value:** `0`|
|`graphTicksZero0`|Always begin ticks at zero.<br><br>**Default value:** `false`|
|`graphLabel0`|Text after the graph example box.<br><br>**Default value:** `Dummy A`|
|`graphShowScaleLabel0`|Show vertical side label on the scale (beside the ticks).<br><br>**Default value:** `false`|
|`graphTextScaleLabel0`|The text on the vertical label.<br><br>**Default value:** `Dummy A`|
|`graphstacked0`|Stack the graphs.<br><br>**Default value:** `false`|

The dummy graph lines has just minor differences in the options, ex. color, where to put the ticks (left or right) and the labels. You have to configure the set of options for each graph line that you want to use for your graph.
