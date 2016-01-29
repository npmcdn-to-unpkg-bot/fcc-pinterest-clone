var express = require('express');
var router = express.Router();
var pincontroller = require('../controllers/pincontroller');

module.exports = function(passport) {
	/* GET home page. */
	router.get('/', function(req, res, next) {
	 	res.render('index', { user: req.user, message: req.flash('message'), success: req.flash('success') });
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/',
		failureFlash : true  
	}));

	router.get('/logout', function(req, res, next) {
	    req.logout();
	  	res.redirect('/');
	});

	router.get('/mypins', isAuthenticated, pincontroller.myPins);

	router.get('/add', isAuthenticated, function(req, res, next) {
	 	res.render('add', { user: req.user, message: req.flash('message'), success: req.flash('success') });
	});

	router.post('/add', isAuthenticated, pincontroller.addPin);

	router.get('/delete/:id', isAuthenticated, pincontroller.deletePin);

	router.get('/password', function(req, res, next) {
	 	res.render('password', { user: req.user, message: req.flash('message'), success: req.flash('success') });
	});

	router.post('/password', function(req, res, next) {
	 	res.render('index', { user: req.user, message: req.flash('message'), success: req.flash('success') });
	});

	return router;
}

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
}