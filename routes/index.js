var express = require('express');
var randomstring = require("randomstring");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/generate', function(req, res, next) {
  var rand = Math.round((Math.random() * 2) + 3);
  console.log(randomstring.generate({length: rand, charset: req.query.set}));
  res.json({sequence:randomstring.generate({length: rand,charset: req.query.set})});
});

module.exports = router;
