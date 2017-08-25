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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ({

/***/ 11:
/***/ (function(module, exports) {

/**
 * modal 确认框
 */


function modal_confirm(options) {
    this.options = $.extend({
        title: '提示',
        content: '',
        onCancel: null,
        onConfirm: null
    }, options);
}

modal_confirm.prototype.show = function () {
    var html = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">' + this.options.title + '</h4></div><div class="modal-body"><p>' + this.options.content + '</p></div><div class="modal-footer"><button type="button" class="btn btn-default" data-dismiss="modal">取消</button> <button type="button" class="btn btn-primary">确定</button></div></div></div></div>');
    $("body").append(html);
    html.modal('show');

    html.on('click', '.btn-primary', function(){
        html.modal('hide');
        if(this.options.onConfirm){
            this.options.onConfirm();
        }
    }.bind(this));

    html.on('hidden.bs.modal', function (e) {
        html.remove();
        if(this.options.onCancel){
            this.options.onCancel();
        }
    }.bind(this));
};

module.exports = function(options){
    var new_modal_confirm = new modal_confirm(options);
    new_modal_confirm.show();
};

/***/ }),

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

/***/ 5:
/***/ (function(module, exports, __webpack_require__) {

/**
 * 模块信息
 */

var modal_confirm = __webpack_require__(11)
var modal_alert = __webpack_require__(12)

function getModuleInfo() {
  $.ajax({
    url: '/api/module/' + modulename + '?version='+ version,
    type: 'GET',
    dataType: 'json',
    data: {
      
    }
  })
  .done(function(json) {
    var html = Handlebars.compile($("#module_info_template").html())(json);
    $('#module_info').html(html);
    $('#version_select').val(json.packageinfo.version)
    version = json.packageinfo.version
    $('#version_select').on('change', function(){
      self.location.href = '/modules/info/' + modulename + '?version=' + $(this).val()
      return false
    })
    module_operate_bind(json.baseinfo.username)
    //readme.md
    if(json.files.some(function(v){
      return v.toLowerCase() == 'readme.md'
    })){
      $.ajax({
        url: '/file/' + modulename + '/' + json.packageinfo.version + '/README.md',
        type: 'GET',
        dataType: 'html',
        data: {
          
        }
      })
      .done(function(content) {   
        $('#readme').show().html(markdown.toHTML(content))      
      })
      .fail(function(error) {
        
      })
      //
    }

  })
  .fail(function(error) {
    modal_alert('获取模块信息失败')
  })  
}

getModuleInfo()


function module_operate_bind(username) {
  if (loginuser != username) {
    return false
  }
  $('#module_operate').show()
  $('#delete_version').on('click', function(){
    modal_confirm({
      content: '确定删除此版本模块？删除之后无法恢复！',
      onConfirm: function(){
        deleteVersion(modulename, version)
      }
    })
    return false;
  })
  $('#delete_module').on('click', function(){
    modal_confirm({
      content: '确定删除整个模块？删除之后无法恢复！',
      onConfirm: function(){
        deleteModule(modulename)
      }
    })    
    return false;
  })  
}

function deleteVersion(modulename, version) {
  $.ajax({
    url: '/modules/delete_version',
    type: 'POST',
    dataType: 'json',
    data: {
      module_name: modulename,
      module_version: version
    }
  })
  .done(function(json) {   
    if(json.re){
      modal_alert('删除成功', function(){
        self.location.href = '/modules/info/' + modulename
      })
    }
    else{
      modal_alert(json.message)
    }
  })
  .fail(function(error) {
    modal_alert(error.message)
  })
}

function deleteModule(modulename) {
  $.ajax({
    url: '/modules/delete_module',
    type: 'POST',
    dataType: 'json',
    data: {
      module_name: modulename
    }
  })
  .done(function(json) {   
    if(json.re){
      modal_alert('删除成功', function(){
        self.location.href = '/modules/'
      })
    }
    else{
      modal_alert(json.message)
    }
  })
  .fail(function(error) {
    modal_alert(error.message)
  })
}


/***/ })

/******/ });