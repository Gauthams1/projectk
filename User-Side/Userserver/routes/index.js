var express = require('express'),path = require("path");;
var router = express();
var fs = require('fs');
var request = require('request');

var user={};
var URLIP="http://localhost:2013"

// Get Homepage
router.get('/', function(req, res){//
//res.cookie('connect.sid','s:hrD487xMzbxgR9vPEHjYWodkUiSp6Fa6.9g40bns5gKDikubZj8qpmtn3HZJCC8Y5y9D1/wysAHg')
  if(req.query.type=='store')
request(URLIP,{json:{user:user,query:req.query,path:'showfile'}}).pipe(res);
if(req.query.type=='process')
request(URLIP,{json:{user:user,query:req.query,path:'py'}}).pipe(res);
});
router.post('/', function(req, res){
//request(URLIP+'/'+req.body.query,{json:{user:user,query:req.body}}).pipe(res);
  var form={
  user:JSON.stringify(user),
  data:JSON.stringify(req.body)
  }
  // req.body.fsurl!= undefined?form['file']=fs.createReadStream(req.body.fsurl):""
  request.post({uri:URLIP+'/',formData:form}).pipe(res)
//  request.post({uri:URLIP+'/'+req.body.path,formData:form}).pipe(res)//.form().append('file', fs.createReadStream('./index2.html'));
});
//post from the home
router.post('/configure', function(req, res){
URLIP=req.body.urlip||URLIP;
console.log(URLIP);
});

router.post('/auth', function(req, res){
  var form={
  username:req.body.username,
  password:req.body.password
  }
request.post({uri:URLIP+'/users/login',formData:form},function optionalCallback(err, httpResponse, body) {
  if(body=="Unauthorized")
     res.json({status:"not done"});
  else {
    var result=JSON.parse(body);
    if(result.user){
      user=result.user;
       res.json({status:"done",user:result.user});
    }
    else {
       res.json({status:"not done"});
    }
  }
  })

});

module.exports = router;
