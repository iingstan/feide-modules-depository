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
  set: function (key, value, expiredays, domain) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = key + "=" + escape(value) + ";expires=" + exdate.toGMTString() + ";path=/;domain=" + domain;
  },
  del: function (key) {
    document.cookie = key + '=aa;path=/;expires=' + (new Date(0)).toGMTString();
  }
};

module.exports = cookie;