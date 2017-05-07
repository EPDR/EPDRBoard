var express = require('express');
var router = express.Router();

var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/test' , function(req , res , next){
  console.log(__rootdirname);
  res.sendFile(path.join(__dirname + '/docs/index.html'))
})

module.exports = router;
