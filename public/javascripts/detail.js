window['_board'].mod
.factory('detailFac' , ['$http' , function($http){
    return {
        get : function(){
            return $http({
                url : '/board/detail',
                method : 'get',
                params : {
                    page : '0'
                }
            });
        }
    }
}])
.controller('detailCtrl' , ['$scope' , function($s){
    $s.UI = {
        load : false
    };

    $s.val = {
        item : {}
    }

    $s.fn = {
        init : function(){
            if(window.foo){
                var _tmp = document.createElement('textarea');
                _tmp.innerHTML = window.foo;
                $s.val.item = JSON.parse(_tmp.innerText);
            }
            else{
                // factory에서 HTTP실행
            }
            
        }
    }


    $s.fn.init();
}]);