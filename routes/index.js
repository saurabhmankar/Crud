var express = require('express');
var router = express.Router();
var fs=require('fs');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
//Requiring mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/regdb",{ useNewUrlParser: true });
//defining schema
var nameSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
   Address:String,
   MobileNo:Number
  });
  var User = mongoose.model("User", nameSchema);
  router.post("/adddetails", (req, res) => {
    var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
})
 
  });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index.html');
});
router.get('/home', function (req, res, next) {
  res.render('../public/form.html');


});
router.get('/register', function (req, res, next) {
  res.render('../public/reg.html');


});
router.get('/productlist',function(req,res,next){
  fs.readFile('Store.txt',data);
 res.send(data);
  res.render('../public/list.html');
})

router.post('/submitform',function (req, res, next) {
   var data = req.body;
   
   console.log(JSON.stringify(data));
   var id=makeid();
   data['id']=id;
   fs.appendFile('Store.txt',JSON.stringify(data));
   
  
   
  
})
router.post("/adddetails", (req, res) => {
  // var myData = new User(req.body);
  // console.log(myData);
  // myData.save()
  //     .then(item => {
  //         res.send("item saved to database");
  //     })
  //     .catch(err => {
  //         res.status(400).send("unable to save to database");
  //     })
  console.log("Working...");
  
});

router.get('/delet',function(req,res,next){
  var id=req.param('id');
  console.log(id);
  
  //fs.unlink('Store.json'+id);
})

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}


module.exports = router;
