var express = require('express');
var router = express.Router();
//var document=require('document');
var fs = require('fs');
var bodyParser = require('body-parser');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
//Requiring mongoose
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mongodbtest", { useNewUrlParser: true });
//defining schema
var nameSchema = new mongoose.Schema({
  game: String,
  publisher: String,
  released: Date,
  rating: Number,
  score: Number
});
var User = mongoose.model("User", nameSchema);
//Inserting data in database,after insert check in the gamelist
router.post("/adddetails", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      // res.send("item saved to database");
      res.redirect('/list');
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    })

});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index.html');
});
router.get('/insert', function (req, res, next) {
  res.render('../public/reg.html');


});

router.get('/search', function (req, res, next) {
  res.render('../public/search.html');
});
router.get('/gamelist', function (req, res, next) {
  User.find(function (err, data) {
    res.json(data);

  });

})
//Rendering Listing page
router.get('/list', function (req, res, next) {
  res.render('../public/list.html');
})

//Reading data from database
router.get('/findgames', function (req, res, next) {
  var game = req.param('game');
  console.log('Game Name ' + game);

  var mongoose = require("mongoose");
  mongoose.Promise = global.Promise;
  mongoose.connect("mongodb://localhost:27017/mongodbtest", { useNewUrlParser: true }, function (err, db) {
    if (err) {
      console.log("Error in connecting with db")
    } else {
      User.find({ "game": game }, function (err, data) {
        res.json(data);

        //res.render('../public/searchres.html');

      })

    }
  });
  console.log("findgames calling...");



});

//Deleting Record from database after deletion refresh the game list options You can see that record is deleted.
router.get('/delet', function (req, res, next) {
  var id = req.param('id');
  console.log(id);
  User.remove({ "_id": id }, function (err, data) {
    console.log("Data deleted:" + JSON.stringify(data));
   

  });
  res.redirect('/list');
});
//Updating records in the database
router.get('/edit', function (req, res, next) {
  var id = req.param('id');

  //console.log(JSON.stringify(data));
  console.log(id);
  //console.log(ugame);
  //console.log(upublisher);
});

module.exports = router;
