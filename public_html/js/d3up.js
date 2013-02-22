String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};

$.fn.delayKeyup = function(callback, ms){
    var timer = 0;
    var el = $(this);
    $(this).keyup(function(){                   
    clearTimeout (timer);
    timer = setTimeout(function(){
        callback(el)
        }, ms);
    });
    return $(this);
};

window.d3up = (function() {
	return {
	   log: function() { if ( window.console ) { console.log.apply(console, arguments); } }
	};
})();