var express = require('express'),path = require("path");;
var router = express();
var fs = require('fs');
var mime = require('mime-types')
var request = require('request');


// Get Homepage
router.get('/',ensureAuthenticated, function(req, res){
//res.render('index',{user:req.user})
if(!req.body.query)
res.render('index',{user:req.user})
else if(req.body.query.type=='store')
request(req.user.storage+(req.body.path[0]!='/'?'/'+req.body.path:req.body.path),{json:{user:req.body.user,query:req.body.query}}).pipe(res);
else if(req.body.query.type=='process')
request(req.user.processing+(req.body.path[0]!='/'?'/'+req.body.path:req.body.path),{json:{user:req.body.user,query:req.body.query}}).pipe(res);
//res.json({yo:"you"});
	});

router.get('/auth',ensureAuthenticated,function(req, res){
  if(req.user)
    {    res.json({user:{_id:req.user._id,storage:'http://localhost:3013',processing:'http://localhost:4013'}})
    }
  else {
    res.json({status:"incomplete"})
  }
});
router.post('/',ensureAuthenticated,function(req, res){
  data=JSON.parse(req.body.data);
  var form={
  user:req.body.user,
  data:JSON.stringify(data.data)
  }
  request.post({uri:req.user.storage+'/'+data.path,formData:form}).pipe(res)
});

//post from the home
function ensureAuthenticated(req, res, next){
  req.user=req.user||(typeof req.body.user=='string'?JSON.parse(req.body.user):req.body.user);
if(req.isAuthenticated()){
    return next();
	} else {
		res.json({status:"no user"});
	}

}

module.exports = router;
