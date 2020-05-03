var express=require('express');
var mongodb=require('mongodb');
var router=express.Router();
var MongoClient=mongodb.MongoClient();

router.get('/bolly/latest/:number',function(req,res)
{
    var numberOfSongs=parseInt(req.params.number);
    
    var db=req.db;
    var collection=db.collection('fs.files');
    collection.find({},{ sort : {uploadDate : -1}, limit : numberOfSongs},function(err,docs){
        res.json(docs);

    });

});

router.get('/bolly/top/:number',function(req,res)
{
    var numberOfSongs=parseInt(req.params.number);
    
    var db=req.db;
    var collection=db.collection('fs.files');
    collection.find({},{ sort : {clicks: -1}, limit : numberOfSongs},function(err,docs){
        res.json(docs);

    });

});

router.get('/bollyHotReleases',function(req,res)
{
    res.render('Playlist-BollywoodHotReleases', { title: 'UltraBeat' });
});

router.get('/bollyTop',function(req,res)
{
    res.render('Playlist-BollywoodTop', { title: 'UltraBeat' });
});


module.exports=router;