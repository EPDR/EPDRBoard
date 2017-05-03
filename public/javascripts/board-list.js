window['_board'].mod
.factory("boardFac" , ['$http' , function($http){
    return {
        get : function(page){
            return $http({
                url : '/board/list',
                method : 'get',
                params : { 
                    "TYPE" : "LIST",
                    "PAGE" : page
                }
            });
        }
    }
}])
.controller('listCtrl' , ['$scope'  , 'boardFac' , function($s , fac){
    $s.UI = {
        load : false
    };

    $s.val = {
        data : [],
        cnt : 0,
        pg : {
            current : 1,        // 현재 페이지
            list : [],          // 페이징 숫자들
            limit : 0,          // 아이템 갯수
            total_max : 0,      // 총 페이지의 마지막 
            page_cnt : 10,       // 페이징 갯수
            first : 1,
            last : 10,
        }
    }

    $s.fn = {
        init : function(){
            $s.UI.load = true;

            return fac.get($s.val.pg.current).then(function(result){
                $s.val.data = result.data.rows;
                $s.val.cnt = result.data.count;
                $s.val.pg.limit = result.data.limit;
            }, function(err){
                alert('불러오는 중에 에러가 발생했다 이놈아 조금만 기다려');
                console.log('ERR OCCURED' , err);
            })
            .then(function(){
                $s.UI.load = false;
            })
        },
        pg : {
            init : function(){
                $s.val.pg.list.splice(0);

                $s.val.pg.total_max = ($s.val.cnt / $s.val.pg.limit);

                var _ceiled = Math.ceil($s.val.pg.current / $s.val.pg.page_cnt);
                $s.val.pg.first = _ceiled == 1 ? _ceiled : ((_ceiled - 1) * $s.val.pg.page_cnt) + 1;
                $s.val.pg.last = ($s.val.pg.first + 10) < $s.val.pg.total_max ? ($s.val.pg.first + 9) : $s.val.pg.total_max;
                
                for(var i = $s.val.pg.first ; i <= $s.val.pg.last ; i++){
                    $s.val.pg.list.push(i);
                }
            },
            move : function(page){
                $s.val.pg.current = page;
                this.init();
                $s.fn.init();
            },
            next : function(){
                var _tmp = $s.val.pg.current + 1;
                if(_tmp > $s.val.pg.total_max){ alert('마지막 페이지요'); }
                else{
                    this.move(_tmp);
                }
            },
            prev : function(){
                var _tmp = $s.val.pg.current - 1;
                if(_tmp < 1){ alert('이미 첫 페이지요'); }
                else{
                    this.move(_tmp);
                }
            }
        }
    }

    $s.fn.init().then($s.fn.pg.init);
}]).filter('board-date' , function(){
    return '';
});