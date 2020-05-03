var express=require('express');
var router=express.Router();
const mongodb=require('mongodb');
const multer=require('multer');
const MongoClient=require('mongodb').MongoClient;
const fs=require('fs-extra');
let db;
//Connect to Database
MongoClient.connect('mongodb://localhost:27017/',{useNewUrlParser:true,useUnifiedTopology: true},(error,client)=>
	{
		if(error)
		{
			console.log('MongoDb Connection Error !!');
			process.exit(1);
		}
		db=client.db('audioDatabase');
		console.log('database is passed to db');
	});

	const upload=multer({limits:{fields:1,fileSize:6000000,files:1},dest:'uploads/'});
//Adding image to Database
router.post('/',upload.single('imageFile'),(req,res)=>
{
	//console.log(req.body);
	//console.log((req.file));
	
/* 		if(err)
		{
			return res.status(400).json({message:"Upload Request failed!"+err});
		}
		else  */if(req.file==null)
		{	
			return res.status(400).json({message:"No Image !!"});
		}
	
	
	//console.log((req.file.filename));
	var img=fs.readFileSync(req.file.path);
	var encode_image=img.toString('base64');
	
	//Define a JSON object for the image attributes for saving to database
	var finalImg={
		contentType:req.file.mimetype,
		image:new Buffer(encode_image,'base64'),
		filename:req.body.name
	};
	
	db.collection('audioImg').insertOne(finalImg,(err,result)=>
	{
		
		if(err)
			return res.status(400).json({message:err});
		
		return res.status(201).json({message:"File Saved to Database"});
		
	});
	
	
})

router.get('/getImage/:imageName',(req,res)=>
{
	
	db.collection('audioImg').findOne({filename:req.params.imageName},function(error,data)
	   {
		   if(error)
			   return res.status(400).json(error);
		   res.set('content-type','image/jpeg');
		 res.send(data.image.buffer);  
	   });
});

router.get('/addImage',(req,res)=>
{
	res.render('imageForm');
});

module.exports=router;