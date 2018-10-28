var express = require('express');
var router = express.Router();

// Get Homepage
router.get('/',ensureAuthenticated, function(req, res){
  if(req.user.admin)
  res.render('admin',{user:req.user})
  else {
    res.redirect('/');
  }
  console.log(req.connection.remoteAddress.substr(7) );
	});
//Get Userlist
router.get('/user',ensureAuthenticated, function(req, res){
  if(req.user.admin)
  res.render('Useradmin',{user:req.user})
  else {
    res.redirect('/');
  }
  console.log(req.connection.remoteAddress.substr(7) );
	});
//get Serverlist
router.get('/server',ensureAuthenticated, function(req, res){
  if(req.user.admin)
  res.render('ServerAdmin',{user:req.user})
  else {
    res.redirect('/');
  }
  console.log(req.connection.remoteAddress.substr(7) );
	});
//get Programlist
router.get('/program',ensureAuthenticated, function(req, res){
  if(req.user.admin)
  res.render('Programsadmin',{user:req.user})
  else {
    res.redirect('/');
  }
  console.log(req.connection.remoteAddress.substr(7) );
});


//post from the home
function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
			return next();
	} else {
		res.redirect('/users/login');
	}

}

module.exports = router;
