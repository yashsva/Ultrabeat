var express = require('express');
var router = express.Router();
const {Readable}= require('stream');
const mongodb=require('mongodb');
const MongoClient=require('mongodb').MongoClient;

router.get('/temp',function(req,res){
	res.render('temp');
});
/* GET Bollywood audio list. */
router.get('/audiolist', function(req, res) {
   var db=req.db;
   var collection=db.get('fs.files');
	 collection.find( {},{sort: {uploadDate:-1},limit:0},function(err, docs)//clicks: -1,
	 {
		res.json(docs);  
    });
	
});

/* GET Hollywood audio list. */
router.get('/audiolist/holly', function(req, res) {
   var db=req.db;
   var collection=db.get('Hollywood.files');
   collection.find({},{sort: {clicks: -1,uploadDate:-1}},function(e,docs)
	   {
		 res.json(docs);  
	   });
});

// Get/tracks/:trackName

router.get('/tracks/:trackName',(req,res)=>
	{
		
		var db=req.db;
		res.set('content-type','audio/mp3');
		res.set('accept-ranges','bytes');
		
		let bucket=new mongodb.GridFSBucket(db,{bucketName:'fs'});
		
		let downloadStream= bucket.openDownloadStreamByName(req.params.trackName);
		
		downloadStream.on('data',(chunk)=>
		{
			res.write(chunk);
		})
		downloadStream.on('error',()=>{ res.sendStatus(404);});
		
		downloadStream.on('end',()=>{res.end();});
		
	});

module.exports = router;
