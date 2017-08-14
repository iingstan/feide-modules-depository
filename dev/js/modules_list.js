/**
 * module列表
 */
var modal = require('../modules/modal/modal')


function get_module_list() {
  $.ajax({
    url: '/api/modules',
    type: 'GET',
    dataType: 'json',
    data: {
      search: search_name
    }
  })
  .done(function (json) {
    var html = Handlebars.compile($("#modulelist_template").html())(json);
    $('#modules_list').html(html);
  })
  .fail(function (error) {

  });  
}
get_module_list();

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
