const shortid = require('shortid');
var db = require('../db');


module.exports.index = (req, res) => {	
	res.render('users/index', {
		users: db.get('users').value() 
	});
}

module.exports.search = (req, res) => {
	var q = req.query.q;

	var matchedUsers = db.get('users').value().filter((user) => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('users/index', {
		users: matchedUsers,
		name: q
	});
}

module.exports.create = (req, res) => {
	res.render('users/create');
}

module.exports.postCreate = (req, res) => {
	var errors = [];
	if (!req.body.name) {
		errors.push('Name is required!');
	}

	if (!req.body.phone) {
		errors.push('Phone is required!');
	}

	if (errors.length) {
		res.render('users/create', {
			errors: errors,
			values: req.body
		});
	}
	req.body.id = shortid.generate();
	// Add a post
	db.get('users').push(req.body).write();
	res.redirect('/users');
}

module.exports.get = (req, res) => {
	var id = req.params.id;

	var user = db.get('users').value().find((user) => {
		return user.id === id;
	});

	res.render('users/viewUser', {
		user: user
	});
}
