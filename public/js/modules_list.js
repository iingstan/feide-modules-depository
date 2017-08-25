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
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports) {

/**
 * modal alert
 */


function modal_alert(options, onClose) {
    var options_obj = {}
    if( typeof options == "string"){
        options_obj.content = options
        if(onClose != undefined && typeof onClose == 'function'){
            options_obj.onClose = onClose
        }        
    }
    if(typeof options == 'object'){
        options_obj = options
    }
    
    this.options = $.extend({
        title: '提示',
        content: '',
        onClose: null
    }, options_obj);
}

modal_alert.prototype.show = function () {
    var html = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' + this.options.title + '</h4></div><div class="modal-body"><p>' + this.options.content + '</p></div><div class="modal-footer"><button type="button" class="btn btn-primary">确定</button></div></div></div></div>');
    $("body").append(html);
    html.modal('show');

    html.on('click', '.btn-primary', function(){
        html.modal('hide');
    });

    html.on('hidden.bs.modal', function (e) {
        html.remove();
        if(this.options.onClose){
            this.options.onClose();
        }
    }.bind(this));
};

module.exports = function(options, onClose){
    var new_modal_alert = new modal_alert(options, onClose);
    new_modal_alert.show();
};

/***/ }),

/***/ 13:
/***/ (function(module, exports) {

/**
 * 分页
 */


var pager = (function () {
  function pager(options) {
      var defaultoptions = {
          element_id: null,
          count: 500,
          pagesize: 20,
          pageindex: 1
      }
      this.options = $.extend(defaultoptions, options);
  }

  pager.prototype.show = function () {
      if (this.options.count == 0) {
          $('#' + this.options.element_id).html('');
          return false;
      }
      var count = Math.ceil(this.options.count / this.options.pagesize);
      var html = [];
      var pageindex = this.options.pageindex;

      // 上一页页码
      var prev_num = 1;
      if(pageindex > 1){
          prev_num = pageindex - 1;
      }
      // 下一页页码
      var next_num = count;
      if(pageindex < count){
          next_num = pageindex + 1;
      }

      html.push('<a href="javascript:;" data-page="1" class="btn btn-default"><span class="glyphicon glyphicon-fast-backward"></span> 首页</a><a href="javascript:;" class="btn btn-default" data-page="' + prev_num + '"><span class="glyphicon glyphicon-backward"></span> 上一页</a>');

      if (pageindex < 4) {
          //前五个
          for (var i = 1; i <= count; i++) {
              if(i > 5){
                  break;
              }
              html.push('<a href="javascript:;" class="btn btn-');
              if (i == pageindex) {
                  html.push('primary"');
              }
              else{
                html.push('default"');
              }
              html.push('" data-page="' + i + '">' + i + '</a>');
          };
      }
      else if(pageindex > count - 3){
          for (var i = (count - 4 > 0) ? count - 4 : 1; i <= count; i++) {
              html.push('<a href="javascript:;" class="btn btn-');
              if (i == pageindex) {
                html.push('primary"');
              }
              else{
                html.push('default"');
              }
              html.push('" data-page="' + i + '">' + i + '</a>');
          };
      }
      else{
          for (var i = pageindex -2; i <= pageindex + 2; i++) {
              html.push('<a href="javascript:;" class="btn btn-default" data-page="' + i + '"');
              if (i == pageindex) {
                  html.push(' class="on"');
              };
              html.push('>' + i + '</a>');
          };
      }

      html.push('<a href="javascript:;" class="btn btn-default" data-page="' + next_num + '"><span class="glyphicon glyphicon-forward"></span> 下一页</a><a href="javascript:;" class="btn btn-default" data-page="' + count + '"><span class="glyphicon glyphicon-forward"></span> 尾页</a>');

      $('#' + this.options.element_id).html(html.join(''));
  };
  return pager;
})();

module.exports = pager;

/***/ }),

/***/ 7:
/***/ (function(module, exports, __webpack_require__) {

/**
 * module列表
 */
var modal = __webpack_require__(8)
var modal_alert = __webpack_require__(12)
var pager = __webpack_require__(13)

function get_module_list(index) {
  if(index == undefined){
    index = 1
  }
  var pagesize = 12
  $.ajax({
    url: '/api/modules',
    type: 'GET',
    dataType: 'json',
    data: {
      search: search_name,
      username: username,
      pageindex: index,
      pagesize: pagesize
    }
  })
  .done(function (json) {
    if(json.re){
      var html = Handlebars.compile($("#modulelist_template").html())(json.result.modules);
      $('#modules_list').html(html);
      if(json.result.count <= pagesize){
        return false
      }
      var newpager = new pager({
        element_id: 'cpager',
        count: json.result.count,
        pagesize: pagesize,
        pageindex: index
      })
      newpager.show()
    }
    else{
      modal_alert(json.message)
    }

  })
  .fail(function (error) {
    modal_alert(error.message)
  });  
}
get_module_list();

$('#cpager').on('click', 'a', function(){
  var pageindex = $(this).data('page')
  get_module_list(pageindex)
})

// $('#modules_list').on('click', '.panel', function(){
//   var module = $(this).data('module');
//   window.open
//   // modal({
//   //   title: module,
//   //   content: Handlebars.compile($("#module_template").html())()
//   // })
// })

if(search_name != ""){
  $('#search_key').val(search_name)
}

$('#search_btn').click(function(){
  var search_key = $.trim($('#search_key').val())
  self.location.href = '/modules/?name=' + search_key
  return false
})


/***/ }),

/***/ 8:
/***/ (function(module, exports) {

/**
 * 模态框
 */


function modal(options) {
    this.options = $.extend({
        title: '提示',
        content: '',
        onClose: null
    }, options);
}

modal.prototype.show = function () {
    var html = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' + this.options.title + '</h4></div><div class="modal-body"><p>' + this.options.content + '</p></div><div class="modal-footer"><button type="button" class="btn btn-primary">确定</button></div></div></div></div>');
    $("body").append(html);
    html.modal('show');

    html.on('click', '.btn-primary', function(){
        html.modal('hide');
    });

    html.on('hidden.bs.modal', function (e) {
        html.remove();
        if(this.options.onClose){
            this.options.onClose();
        }
    }.bind(this));
};

module.exports = function(options){
    var new_modal_alert = new modal(options);
    new_modal_alert.show();
};

/***/ })

/******/ });