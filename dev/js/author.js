/**
 * 授权
 */

$('#change_author').on('click', function(){
  var c_comfirm = confirm("更改授权字符串会使现有的授权失效，还要更改吗？")

  if (!c_comfirm) {
    return false
  }
  
  $.ajax({
    url: '/member/change_author',
    type: 'POST',
    dataType: 'json',
    data: {
      
    }
  })
  .done(function(json) {   
    if(json.re){
      self.location.reload()
    }
    else{
      alert(json.message)
    }
  })
  .fail(function(error) {
    alert(error.message)
  })

  return false
})

var clipboard = new Clipboard('#copy_author');

clipboard.on('success', function(e) {
  // console.info('Action:', e.action);
  // console.info('Text:', e.text);
  // console.info('Trigger:', e.trigger);
  $('#copy_author').tooltip('show')
  setTimeout(function() {
    $('#copy_author').tooltip('destroy')
  }, 2000);
  e.clearSelection();
});