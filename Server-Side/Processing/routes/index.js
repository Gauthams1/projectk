var express = require('express'),path = require("path");;
var router = express();
var fs = require('fs');
var mime = require('mime-types')
const spawn = require('child_process').spawn;
var request = require('request');
var storageserver='http://localhost:3013';


// Get Homepage
router.get('/',ensureAuthenticated, function(req, res){
res.render('index',{user:req.user})
	});
router.get('/py',ensureAuthenticated,function(req,res){
  res.writeHead(200, {
  'Content-Type': 'text/plain'
    });
  var link =['./CloudStorage/'+req.user._id+req.body.query.file];
request(storageserver+'/showfile',{json:{user:req.body.user,query:req.body.query}}).pipe(fs.createWriteStream('./CloudStorage/'+req.user._id+req.body.query.file))
const child = spawn('python',link);
child.stdout.on('data', (data) => {
  res.write(data);
  });

child.stderr.on('data', (data) => {
res.write(data)
});
child.on('exit', function (code, signal) {
  res.end();
  fs.unlinkSync('./CloudStorage/'+req.user._id+req.body.query.file, (err) => {
        if (err) {
            console.log("failed to delete local image:"+err);
        } else {
            console.log('successfully deleted local image');
        }
});
});

})
//post from the home
function ensureAuthenticated(req, res, next){
if(req.isAuthenticated()||req.body.user._id||JSON.parse(req.body.user)._id){
    req.user=req.user||(typeof req.body.user=='string'?JSON.parse(req.body.user):req.body.user);
		return next();
	} else {
		res.json({status:"no user"});
	}

}

module.exports = router;
