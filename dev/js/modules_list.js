/**
 * module列表
 */
var modal = require('../modules/modal/modal')
var modal_alert = require('../modules/modal_alert/modal_alert')
var pager = require('../modules/pager')

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
