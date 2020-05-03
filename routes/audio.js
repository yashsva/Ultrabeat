var express = require('express');
var router = express.Router();
const {Readable}= require('stream');
const mongodb=require('mongodb');
var grid =require('gridfs-stream');
const multer=require('multer');

const ObjectID=require('mongodb').ObjectID;


const MongoClient=require('mongodb').MongoClient;
let db;
MongoClient.connect('mongodb://localhost/trackDB', { useNewUrlParser: true,useUnifiedTopology: true },(err,client)=>
               {
					if(err)
					{
						console.log('Mongodb Connection Error. Please make sure that MongoDB is Running.')
						process.exit(1);
					}
					
					db=client.db('audioDatabase');
					console.log('database is passed to db');
			   });


// Get/tracks/:trackName

router.get('/tracks/bolly/:trackName',(req,res)=>
	{
		
		
		db.collection('fs.files').findOneAndUpdate({"filename":req.params.trackName},{$inc:{"clicks":1}});
		/* db.collection('fs.files').findAndModify({
			query: { filename: req.params.trackName },
			sort: { rating: 1 },
			update: { $inc: { clicks: 1 } }
		}); */
		
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
		// db.collection('fs.chunks').find({files_id:{$exists:1}},{data:0}).forEach(removeChunkIfNoOwner);
	});

router.get('/tracks/holly/:trackName',(req,res)=>
	{
		
		db.collection('Hollywood.files').findOneAndUpdate({"filename":req.params.trackName},{$inc:{"clicks":1}});
		res.set('content-type','audio/mp3');
		res.set('accept-ranges','bytes');
		
		let bucket=new mongodb.GridFSBucket(db,{bucketName:'Hollywood'});
		
		let downloadStream= bucket.openDownloadStreamByName(req.params.trackName);
		
		downloadStream.on('data',(chunk)=>
		{
			res.write(chunk);
		})
		downloadStream.on('error',()=>{ res.sendStatus(404);});
		
		downloadStream.on('end',()=>{res.end();});
		
	});

/* router.get('/music/:trackName',(req,res)=>
{
	var db=new mongodb.Db('audioDatabase',new mongodb.Server("localhost",27017));
	
	//make sure the db instance is open before passing into grid
	
		var gfs=grid(db,mongodb);
	
	const readStream=gfs.createReadStream({
		filename:req.params.trackName,
	});
	readStream.on('error', function (error) {
		           console.log('Error in readStream');
                    res.sendStatus(500);
                });
				
	res.type('audio/mp3');
	readStream.pipe(res);
}) */

router.post('/addAudio/',(req,res)=>
{
	const storage=multer.memoryStorage();
	const upload=multer({storage:storage,limits:{fields:2,fileSize:15000000,files:1,parts:3}});
	upload.single('track')(req,res,(err)=>
	{
		//var collectionName=JSON.stringify(req.body.songType);
		//console.log(collectionName);
		if(err)
			return res.status(400).json({message:"Upload Request failed!"+err.message})
		else if(!req.body.name)
			return res.status(400).json({message:"No trackName in request body"})
		
		let trackName=req.body.name;
		
		//Convert Buffer to Readable streams
		const readableTrackStream=new Readable();
		readableTrackStream.push(req.file.buffer);
		readableTrackStream.push(null);
		
		let bucket=new mongodb.GridFSBucket(db,{bucketName:req.body.songType});
		let uploadStream=bucket.openUploadStream(trackName);
		let fileName=uploadStream.filename;
		readableTrackStream.pipe(uploadStream);
		
		
		uploadStream.on('error',()=>
		{
			return res.status(500).json({message:"Error in Uploading File"});
			
		});
		uploadStream.on('finish',()=>
		{
			return res.status(201).json({message:"File Uploaded Successfully,stored under name : "+ fileName});
		});
		
	});
});

//Get form page to add songs
router.get('/addAudio',(req,res,next)=>
{
	res.render('audioForm');
});


//For Deleting Bollywood Songs
router.delete('/deleteSong/bolly/:trackName',(req,res)=>
{
	db.collection('fs.files').deleteOne({filename:req.params.trackName},function(err)
		{
			res.send((err===null)?{msg:''}:{msg:'error: '+err});
		});
})

//For Deleting Hollywood Songs
router.delete('/deleteSong/holly/:trackName',(req,res)=>
{
	db.collection('Hollywood.files').deleteOne({filename:req.params.trackName},function(err)
		{
			res.send((err===null)?{msg:''}:{msg:'error: '+err});
		});
})


router.post('/modifyDuration/bolly/:trackName/:duration',(req,res)=>
{
	console.log(req.params.duration);
	db.collection('fs.files').updateOne({"filename":req.params.trackName},{ $set: {"duration" : req.params.duration}});
});

function removeChunkIfNoOwner(chunk)
{
	// console.log("Inside removeChunk");
	var parentCount=db.collection('fs.files').find({'_id':chunk.files_id}).count();
	if(parentCount===0)
	{
		res=db.collection('fs.chunks').remove({'files_id':chunk._id});
		console.log("item removed");
	}

}


module.exports = router;