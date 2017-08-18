/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var user = __webpack_require__(2)

window.loginuser = ''

//nav登录状态
$.ajax({
  url: '/member/islogin',
  type: 'GET',
  dataType: 'json',
  data: {
    
  }
})
.done(function(json) {   
  if (json.re && json.result != null && json.result != '') {
    $('#nav_author').show();
    $('#nav_right_member').html('<li class="text_li">欢迎,' + json.result + '</li><li><a href="#" id="nav_logout">退出登录</li>');
    window.loginuser = json.result
  }
})
.fail(function(error) {
  
})

//绑定退出登录
$('body').on('click', '#nav_logout', function(){
  user.logOut()
  self.location.reload()
  return false
})

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * user
 */

var cookie = __webpack_require__(3)

module.exports = {
  /**
   * 退出登录
   */
  logOut: function(){
    cookie.del('fmd-token')
  }
}

/***/ }),
/* 3 */
/***/ (function(module, exports) {

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

/***/ })
/******/ ]);