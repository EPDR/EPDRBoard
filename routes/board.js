var express = require('express');
var router = express.Router();

var Board = require('../DB/Models/Board.js');

/* GET users listing. */
router.get('/', function(req, res, next) {
    //Board.findAll().then(function(data , err){
    //    res.render('board/list' , { title :'hello list page' , data : data });    
    //} , function(){
    //    res.render('../error.jade');
    //})
    //
    
    // GET PAGES
    var currentPage = 0;
    if(Object.keys(req.query).length > 0 && req.query['page']){
        currentPage = parseInt(req.query['page']);

    }

    Board.findAndCountAll({
        limit : 20,
        offset : !isNaN(currentPage) ? (currentPage-1) *  20 : 1
    }).then(function(result){
        res.render('board/list' , {title : 'hello list page' , data : result.rows, count : result.count});
    }, function(){
        res.redirect('../');
    });
});



module.exports = router;
