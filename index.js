const express = require('express');

var db = require('./db');

const app = express();

const port = 8000;



var bodyParser = require('body-parser');

var userRoute = require('./routes/user.routes');


app.use(express.static('public'));


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// view engine setup
app.set('view engine', 'pug');
app.set('views', './views');

var users = [];

app.get('/', (req, res) => {
	res.render('index', {
		name: "AAA"
	});
});


app.use('/users', userRoute);

app.listen(port, function() {
	console.log(`Example app listening on ${port}!`);
});