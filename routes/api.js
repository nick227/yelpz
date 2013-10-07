
/********************************************************/
/* Server API */

var yelp = require("yelp").createClient({
  consumer_key: "h5a-LThMlFTJivtXNJIjQQ", 
  consumer_secret: "GOza2lCRzq0MBaDOwOE0FYDJW9s",
  token: "HxhedpuftOB7yEQsZyW3egxlCuz7lqSb",
  token_secret: "hcWKmwdKr29HWA2u8s4FQxWxHgo"
});

exports.yelp = function (req, res) {
	var activityResults, diningResults, results={};
	yelp.search({category_filter: req.query.activityTerm, location: req.query.city, limit:10}, function(error, activityData) {
		yelp.search({category_filter: req.query.diningTerm, location: req.query.city, limit:10}, function(error, diningData) {
			results = {activity:activityData, dining:diningData};

			res.json(results);
		});
	});
};