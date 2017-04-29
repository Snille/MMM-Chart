
Previews
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
				url: "http://your.json.url.here"
				graphLabel0: "Temp C",
				graphLabel1: "Humid %",
				xaxisTimeUnit: "hour",
				xaxisTimeFormatLabels: "HH",
			}
		},
````
