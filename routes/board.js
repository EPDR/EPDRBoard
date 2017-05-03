var express = require('express');
var router = express.Router();

var Board = require('../DB/Models/Board.js');

// VIEW PAGING

router.get('/', function(req, res, next) {
    res.render('board/list');
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
