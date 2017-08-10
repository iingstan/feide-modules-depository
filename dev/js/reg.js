/**
 * 注册
 */

$('#reg_form').on('submit', function(){
  var $username = $('#username')
  var username = $.trim($username.val())
  var $password = $('#password')
  var password = $.trim($password.val())
  var $password2 = $('#password2')
  var password2 = $.trim($password2.val())

  if(password !== password2){
    $('#password2_error').text('重复密码不一致！')
    return false
  }

  $.ajax({
    url: '/member/reg',
    type: 'POST',
    dataType: 'json',
    data: {
      username: username,
      password: password
    }
  })
  .done(function(json) {   
    if(json.re){
      self.location.href = '/'
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