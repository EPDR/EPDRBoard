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
        },
        search : function(opt){
            return $http({
                url : '/board/list',
                method : 'get',
                params : {
                    'TYPE' : 'LIST',
                    'PAGE' : opt.page,
                    'SEARCH_KEYWORD' : opt.keyword,
                    'SEARCH_TYPE' : opt.type
                }
            })
        },
        del : {
            proc : function(params){
                return $http({
                    url : '/board/delete',
                    method : 'post',
                    data : {
                        'SEQ' : params.seq,
                        'PW' : params.pw
                    }
                })
            }
        }
    }
}])
.controller('listCtrl' , ['$scope' , '$q' , 'boardFac' , function($s,$q , fac){
    $s.UI = {
        load : false,
        bg : false,
        layer : {
            del : false
        },
        fn : {
            layer : {
                del : function(isVisible){
                    $s.UI.bg = isVisible;
                    $s.UI.layer.del = isVisible;
                }
            }
        }
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
        },
        search : {
            type : 'TITLE',
            keyword : ''
        },
        del :{
            seq : 0,
            pw : ''
        }
    }

    $s.fn = {
        set : function(data){
            console.log(data);
            $s.val.data = data.rows;
            $s.val.cnt = data.count;
            $s.val.pg.limit = data.limit;
        },
        init : function(){
            $s.UI.load = true;

            return fac.get($s.val.pg.current).then(function(result){
                $s.fn.set(result.data);
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
                if($s.val.search.keyword.trim() === ""){    
                    $s.fn.init()
                    .then($s.fn.pg.init);
                }
                else{
                    $s.fn.search();
                }
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
        },
        search : function(page){
            $s.val.pg.current = page ? page : $s.val.pg.current;

            $s.UI.load = true;
            return fac.search({
                page : $s.val.pg.current,
                keyword : $s.val.search.keyword,
                type : $s.val.search.type
            })
            .then(function(result){
                $s.fn.set(result.data);
                $s.UI.load = false;
                if(result.count == 0){ alert('검색 결과가 없는디'); }
            })
            .then($s.fn.pg.init);
        },
        del : {
            init : function(){
                $s.val.del.pw = "";
                $s.UI.fn.layer.del(false);
            },
            confirm : function(seq){
                // 1. 현재 seq 저장
                $s.val.del.seq = seq;
                // 2. 비밀번호 입력 레이어 출력
                $s.UI.fn.layer.del(true);
            },
            proc : function(){ 
                if(!confirm('정말 삭제할까요?')){ return; }
                // 삭제 프로세스 실행
                fac.del.proc($s.val.del)
                .then(function(result){
                    console.log(data);
                    if(!result.data.isSuccess){
                        alert(result.data.mesg);
                        $s.val.del.pw = "";
                    }
                    else{ 
                        $s.fn.del.init();
                        alert('삭제 되었습니다.');
                        location.reload();
                    }
                } , function(err){
                    alert(err.mesg)
                });
            }
        }
    }

    $s.fn.init().then($s.fn.pg.init);
}]).filter('boardDT' , function(){
    return function(obj){
        var _tmp = new Date(obj);
        return window['_board'].getTimeStamp(_tmp);
    }
});

// angular외에 네이티브 스크립트 
window['_board'].getTimeStamp = function(d){
    // getTimeStamp
    function ts(d) {
        var s =
            lz(d.getFullYear(), 4) + '-' +
            lz(d.getMonth() + 1, 2) + '-' +
            lz(d.getDate(), 2) + ' ' +

            lz(d.getHours(), 2) + ':' +
            lz(d.getMinutes(), 2) + ':' +
            lz(d.getSeconds(), 2);

        return s;
    }
    // loadingZeros
    function lz(n, digits) {
        var zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (i = 0; i < digits - n.length; i++)
            zero += '0';
        }
        return zero + n;
    }

    return ts(d);
}