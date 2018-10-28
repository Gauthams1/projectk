var express = require('express');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var User = require('../models/user');
var LocalStrategy = require('passport-local').Strategy;
var router = express.Router();
var ObjectID = require('mongodb').ObjectID;
// Register
router.get('/register', function(req, res){
	res.render('register');
});
//login get method
router.get('/login', function(req, res){
	if(req.isAuthenticated())
	res.redirect('/');
	else {
		res.render('login');
	}

});
//logout
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success_msg', 'You are logged out');
	res.redirect('/users/login');
});
// post----------------------------------------------------------------------------------------------------------------------------------------
//login post
router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true})
  );
passport.use(new LocalStrategy(
  function(username, password, done) {
         User.getUserByUsername(username, function(err, user){
     	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}

   	User.comparePassword(password, user.password, function(err, isMatch){
    	if(err) throw err;
   		if(isMatch){
        console.log(username+"   "+password);
   			return done(null, user);

 		} else {
   			return done(null, false, {message: 'Invalid password'});
  		}
   	});
   });
  }));

  passport.serializeUser(function(user, done) {
  done(null, user.id);
  });
  passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
  });
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		res.redirect('/users/login');
	}
  }

module.exports = router;
