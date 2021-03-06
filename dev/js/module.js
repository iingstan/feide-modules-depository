/**
 * 模块信息
 */

var modal_confirm = require('modal_confirm')
var modal_alert = require('../modules/modal_alert/modal_alert')

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
