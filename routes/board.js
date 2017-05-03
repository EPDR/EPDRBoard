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
    var currentPage = 1;
    if(Object.keys(req.query).length > 0 && req.query['page']){
        currentPage = parseInt(req.query['page']);
    }

    Board.findAndCountAll({
        limit : 20,
        offset : !isNaN(currentPage) ? (currentPage - 1) *  20 : 1
    }).then(function(result){
        res.render('board/list' , {title : 'hello list page' , data : result.rows, count : result.count});
    }, function(error){
        console.log('ERROR OCCURRED');
        console.log(error);
        res.redirect('../');
    });
});

// ROUTER API 

router.get('/list', function(req, res, next){
    var _offset = 0 ;
    var _cnt = 0 ;
    var _limit = 20;

    if(Object.keys(req.query).indexOf('page') >= 0 ){
        var _tmp = parseInt(req.query['page']);
        _offset = isNaN(_tmp) ? 0 : (_tmp - 1) * _limit;
    }

    Board.findAndCountAll({
        limit : _limit,
        offset : _offset
    }).then(function(result){
        res.render('../views/board/list.jade' , {title : 'HELLO FUCKIN WORLD' , data : result.rows , cnt : result.count});
    }, function(err){
        res.render('../views/board/list.jade' , {title : 'FUCK ERROR OCCURRED' , error : err});
    })
});


module.exports = router;
