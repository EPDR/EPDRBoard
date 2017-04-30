var express = require('express');
var router = express.Router();

var Board = require('../DB/Models/Board.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    Board.findAll().then(function(data , err){
        res.render('board/list' , { title :'hello list page' , data : data });    
    } , function(){
        res.render('../error.jade');
    })
    
});



module.exports = router;
