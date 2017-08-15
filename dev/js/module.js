/**
 * 模块信息
 */

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
  $('#version_select').on('change', function(){
    self.location.href = '/modules/info/tt?version=' + $(this).val()
    return false
  })
})
.fail(function(error) {
  alert('获取模块信息失败')
})

