/**
 * cookie
 */

var cookie = {
	get: function (name) {
		var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
		if (xarr != null)
			return decodeURIComponent(xarr[2]);
		return null;
	},
	set: function(key,value,expiredays,domain){
		var exdate = new Date();
		exdate.setDate(exdate.getDate() + expiredays);
		document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/;domain=" + domain;
	},
	del: function (key) {
		var value = getCookie(key),
			exdate = new Date();
		exdate.setDate(exdate.getTime() - 1);
		if (value && value != '') {
			document.cookie = key + '=' + escape(value) + ';path=/;expires=' + exdate.toGMTString();
		}
	}
};

module.exports = cookie;