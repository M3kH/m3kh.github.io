define(["jquery"], function($){
	var st = {
		urlParam : function(key){
			var result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
			return result && unescape(result[1]) || false;
		},
		appendSound: function(song){
			var iframe = $('<iframe width="0" height="0" src="//www.youtube.com/embed/'+song+'?autoplay=1&loop=1" frameborder="0" />');
			$("body").append(iframe);
		},
		init: function(){
			var bgSound = st.urlParam("sound");
			if(bgSound != false){
				st.appendSound(bgSound);
			}
		}
	};

	return st;
});
