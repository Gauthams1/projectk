var express = require('express'),path = require("path");;
var router = express();
var fs = require('fs');
var mime = require('mime-types')


// Get Homepage
router.get('/',ensureAuthenticated, function(req, res){
res.render('index',{user:req.user})
	});
  //filedir
router.get('/showfile',ensureAuthenticated,function(req, res){
   res.setHeader('Content-type',mime.lookup(req.body.query.file) );
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    fs.createReadStream('./CloudStorage/'+req.body.user._id+"/"+req.body.query.file).pipe(res);
});
//
router.get('/auth',ensureAuthenticated,function(req, res){
  if(req.user)
    {  //console.log(Date());
      res.json({user:req.user})
    }
  else {
    //console.log("no user ");
    res.json({status:"incomplete"})
  }
});

//Post files
router.post('/auth',function(req, res){
  console.log(req.files);
  //console.log(req.body.data.replace(/\s/g, '').split('/').join('/'));
  res.json({status:"completed"})
  });

router.post('/upload',ensureAuthenticated,function(req, res){
  if(req.files.file&&req.body.directory)
  {
    var file=req.files.file;
    var filename=file.name;var mime = require('mime-types')
    var dir='./CloudStorage/'+req.user._id+"/"+req.body.data;
    if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
    }
    file.mv('./CloudStorage/'+req.user._id+'/'+req.body.data+"/"+filename,function(err){
      if(err)
      console.log(err);
    })
    }
  res.json({status:"done"})
  });

//filedir
router.post('/filedir',ensureAuthenticated,function(req, res,next){
  var files=[];
  fs.readdir('./CloudStorage/'+req.user._id+"/"+JSON.parse(req.body.data).replace(/\s/g, '').split('/').join('/'), function(err, items) {
    if(err)
    console.log(err);
    else {
      items.map(function (file) {
        return path.join('./CloudStorage/'+req.user._id+"/"+JSON.parse(req.body.data).replace(/\s/g, '').split('/').join('/'), file);
    }).forEach(function (file) {
        files.push({file:file.split('/').slice(-1).pop(),type:fs.statSync(file).isDirectory()?'folder':path.extname(file),mime:mime.lookup(file.split('/').slice(-1).pop())})
    });
      res.json({files:files,directory:JSON.parse(req.body.data).replace(/\s/g, '').split('/').join('/')})
    }
  });
});
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
