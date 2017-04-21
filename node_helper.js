var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create ({
	start: function () {
		console.log('MMM-Chart helper started...');
	},
	getData: function (url) {
		var self = this;
		request({ url: url, method: 'GET' }, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				//console.log('Data: ' + body);
				self.sendSocketNotification('GRAPH_DATA_RESULT', body);
			}
      });
	},

	//Subclass socketNotificationReceived received.
	socketNotificationReceived: function(notification, payload) {
		if (notification === 'GET_GRAPH_DATA') {
			//console.log('Id: ' + this.id);
			this.getData(payload);
		}
	}
});
