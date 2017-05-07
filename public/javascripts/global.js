window['_board'] = window['_board'] || {};

window['_board'].mod = angular.module('boardApp' , []);

window['_board'].mod
.filter('boardDT' , function(){
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
