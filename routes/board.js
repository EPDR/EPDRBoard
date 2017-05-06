var express = require('express');
var sequelize = require('sequelize');
var router = express.Router();

var Board = require('../DB/Models/Board.js');

// VIEW PAGING

router.get('/', function(req, res, next) {
    res.render('board/list');
});

router.get('/detail', function(req, res, next){
    
    res.render('board/detail');
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

router.post('/delete' , function(req , res , next){
    if(Object.keys(req.body).indexOf('SEQ') < 0 ||
        Object.keys(req.body).indexOf('PW') < 0){
        res.json({
            isSuccess : false,
            mesg : '비밀번호 혹은 글 번호가 누락되었습니다.'
        });
    }
    // 1. 패스워드 확인 
    Board.findOne({
        attributes : ['Password'],
        where : {
            Seq : req.body.SEQ
        }
    })
    .then(function(result){
        var _pw = result.dataValues.Password

        if(_pw != req.body.PW){
            res.json({
                isSuccess : false, 
                mesg : '비밀번호가 올바르지 않습니다' 
            });

            console.log(_pw)
        }
        else{
            Board.destroy({
                where : {Seq : req.body.SEQ}
            } )
            .then(function(result){
                console.log(result);
                res.json({isSuccess : true});
            } , function(result){
                console.log(result);
                res.json({isSuccess : false});
            });
        }
    } , function(err){
        console.log('ERR OCCURRED' , err);
        res.json({ success : 200 })
    })
    // 2. 삭제 프로세스 실행 
    // 3. 값 던져줌

})

module.exports = router;
