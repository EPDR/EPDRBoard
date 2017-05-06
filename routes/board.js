var express = require('express');
var router = express.Router();

var Board = require('../DB/Models/Board.js');
// VIEW PAGING

router.get('/', function(req, res, next) {
    res.render('board/list');
});

router.get('/detail', function(req, res, next){
    var contentid = req.param('page');
    var sum = 1
    Board.findOne({
        where: {seq: contentid},
        attributes: ['Seq', 'Title', 'Content', 'Writer', 'View_count','Date'],
    }).then(function(data){
        console.log(data);
        Board.update(
            {View_count: (data.dataValues.View_count + 1) + '' },
            {where: {seq: contentid},returning: true})
        .then(function(result) {
            //res.send(data.dataValues);
            res.render('../views/board/detail' , { data : data.dataValues });
        } , function(err){
            res.redirect('/');
        });        
    });
});


// ROUTER API 
router.get('/list', function(req, res, next){
    var _state = {};
    
    var _offset = 0 ;
    var _limit = 20;
    var _attr = [];
    
    if(Object.keys(req.query).indexOf('PAGE') >= 0 ){
        var _tmp = parseInt(req.query['PAGE']);
        _offset = isNaN(_tmp) ? 0 : (_tmp - 1) * _limit;
    }
    
    if(req.query['TYPE'] === "LIST"){
        _attr.push('Seq');
        _attr.push('Title');
        _attr.push('Writer');
        _attr.push('Date');
        _attr.push('View_count');
        _state['attributes'] = _attr;
    }
    
    if(req.query['SEARCH_KEYWORD'] && req.query['SEARCH_TYPE']){
        switch(req.query['SEARCH_TYPE'])
        {
            case 'TITLE' :
                _state['where'] = {
                    Title : {
                        $like : '%'+ req.query['SEARCH_KEYWORD'] +'%'
                    }
                } 
                break;
            case 'CONTENT' :
                _state['where'] = {
                    Content : {
                        $like : '%'+ req.query['SEARCH_KEYWORD'] +'%'
                    }
                } 
                break;
            case 'WRITER' : 
                _state['where'] = {
                    Writer : req.query['SEARCH_KEYWORD']
                } 
                break;
        }
        
    }
    
    _state['offset'] = _offset;
    _state['limit'] = _limit;

    Board.findAndCountAll(_state).then(function(result){
        result['limit'] = _limit;
        
        res.json(result);
    }, function(err){
        res.send(err);
    })
});


module.exports = router;
