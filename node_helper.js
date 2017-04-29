var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create ({
	start: function () {
		console.log('MMM-Chart helper started...');
	},
	getData: function (data) {
		var self = this;
		request({ url: data.url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				//console.log(JSON.stringify(data));
				data.body = body;
				self.sendSocketNotification('GRAPH_DATA_RESULT', data);
			} else {
				console.log("MMM-Chart: The URL is not correct...");
			}
      });
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET_GRAPH_DATA') {
			this.getData(payload);
		}
	}
});
