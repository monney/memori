var express = require('express');
var randomstring = require("randomstring");
var Parse = require('node-parse-api').Parse;
var bodyParser = require('body-parser'), parseURLEncoded = bodyParser.urlencoded({extended: false});
var router = express.Router();

var APP_ID = "Ox3Vn0LxOLOJ3AOeFLBrFR4EiNcmPI4IdQPP0pOc";
var MASTER_KEY = "NDfrYlzoWoRjUcvyYuWbHzYtWFBwgXZ8j6GiO0Zj";

var app = new Parse(APP_ID, MASTER_KEY);

router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/generate', function(req, res) {
  var rand = Math.round((Math.random() * 2) + 3);
  res.json({sequence:randomstring.generate({length: rand,charset: req.query.set})});
});

router.post('/record',function(req, res) {
  var data = req.body;
  app.insert('Trial',
  { age: parseFloat(data.age),
    score: parseFloat(data.score),
    time: parseFloat(data.time)},
  function (err, response) {
  });
});

router.get('/plot',function(req, res) {
app.find('Trial', '', function (error, response) {
      var arr = response[Object.keys(response)[0]];
      var data = new Array(arr.length+1);
      data[0] = ["Time","Score"];
      for(var i = 0; i<arr.length;i++) {
        data[i+1] = [Math.round(arr[i].time*100)/100,Math.round(arr[i].score*100)/100];
      }

      res.json({"data":data});
  });
});

module.exports = router;
