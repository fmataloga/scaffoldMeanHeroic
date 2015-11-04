window.optimumModel = window.optimumModel || {} ;
window.optimumModel = ( function ( ) {
 "use strict" ;
 function optimumModel(){
 }
 var url = "";
 optimumModel.prototype.getAll = function(){	
 	var uri = this.url ;
 	return new Promise(function(resolve, reject) {
	    var xhr = new XMLHttpRequest();
	    xhr.onload = function() {
	      resolve(this.responseText);
	    };
	    xhr.onerror = reject;
	    xhr.open('GET', uri);
	    xhr.send();
	});
 	
 };

 return optimumModel;
 }()) ;

