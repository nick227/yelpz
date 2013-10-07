/**
App URL
    http://yelpz.herokuapp.com/ 
Git URL
    git@heroku.com:yelpz.git 

Use the following code to set up your app for local development.
git clone git@heroku.com:yelpz.git -o heroku
-------------------------------------------------
YELP API Access
YELP API v1.0
YWSID
Bgba5eW-hgI1Y_AHhvpqcg

YELP API v2.0
Consumer Key 	h5a-LThMlFTJivtXNJIjQQ
Consumer Secret 	GOza2lCRzq0MBaDOwOE0FYDJW9s
Token 	HxhedpuftOB7yEQsZyW3egxlCuz7lqSb
Token Secret 	hcWKmwdKr29HWA2u8s4FQxWxHgo

 */

var express = require('express'),
  routes = require('./routes'),
  api = require('./routes/api'),
  http = require('http'),
  path = require('path');

var app = module.exports = express();

/**
* Configuration
*/

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if (app.get('env') === 'development') {
   app.use(express.errorHandler());
};

// production only
if (app.get('env') === 'production') {
  // TODO
}; 

// Routes
app.get('/', routes.index);
app.get('/partial/:name', routes.partial);

// JSON API
app.get('/api/yelp', api.yelp);

// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

/**
* Start Server
*/

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});