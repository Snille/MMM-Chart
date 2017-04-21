
````javascript
		{
			module: "MMM-Chart",
			position: "top_center",
			header: "Chart",
			config: {
				// URL that gives a json table back.
				// Like this {"Graph Line 1":["YYYY-MM-DD HH:mm",floatnumber],"Graph Line 2":["YYYY-MM-DD HH:mm",floatnumber]}
				// Example: {"graph1":["2017-04-18 23:00:02",-1.2],["2017-04-18 22:40:02",-0.7],["2017-04-18 22:20:03",-0.2],["2017-04-18 22:00:04",0.8],"graph2":[""2017-04-18 23:00:02",-1.2],["2017-04-18 22:40:02",-0.7],["2017-04-18 22:20:03",-0.2],["2017-04-18 22:00:04",0.8]}
				url: "http://your.json.url.here"
			}
		},
````
