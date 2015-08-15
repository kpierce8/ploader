var errorHandler = require('errorhandler'),
path = require('path'),
bodyParser = require('body-parser'),
morgan = require('morgan'),
express = require('express'),
cookieParser = require('cookie-parser'),
methodOverride = require('method-override'),
routes = require('./routes'),
moment = require("moment"),
exphbs = require('express3-handlebars');

module.exports = function(app) {

app.engine('handlebars',exphbs.create({
	defaultLayout: 'main',
	layoutsDir: app.get('views') + '/layouts',
	partialsDir: [app.get('views') + '/partials'],
	helpers: {
		timeago:function(timestamp){
		return moment(timestamp).startOf('minute').fromNow();
			
		}
		}
	}).engine);
	app.set('view engine', 'handlebars');

app.use(morgan('dev'));
app.use(bodyParser({
		uploadDir:path.join(__dirname, '../public/upload/temp')
		}));
//app.use(connect.json());
//app.use(connect.urlencoded());
app.use(methodOverride());
app.use(cookieParser('some-secret-value-here'));
app.use(app.router);
app.use('/public/', express.static(path.join(__dirname, '../public')));

if('development' === app.get('env')) {
	app.use(errorHandler());
}
	
routes.initialize(app, new express.Router());
return app;

};

