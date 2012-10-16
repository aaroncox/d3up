String.prototype.capitalize = function(){
   return this.replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase(); } );
};
window.d3up = (function() {
	return {
	   log: function() { if ( window.console ) { console.log.apply(console, arguments); } }
	};
})();