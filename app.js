var express  = require("express"),
    app      = express(),
    http     = require("http"),
    server   = http.createServer(app),
    cors     = require('cors'),
    mongoose = require('mongoose'); 

app.configure(function () {
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(cors({
    origin: 'http://localhost:4200'
  }));
});

var allowedOrigins = ['http://localhost:3000',
                      'http://localhost:4200'];
app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin 
    // (like mobile apps or curl requests)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));


app.get('/', function(req, res) {
  res.send("Hello world!");
});

routes = require('./routes/infoUser')(app);

mongoose.connect('mongodb://localhost/infoUser', function(err, res) {
	if(err) {
		console.log('ERROR: connecting to Database. ' + err);
	} else {
		console.log('Connected to Database');
	}
});

server.listen(3000, function() {
  console.log("Node server running on http://localhost:3000");
});