/**
 * login
 */

 $('#login_form').on('submit', function(){
  var $username = $('#username')
  var username = $.trim($username.val())
  var $password = $('#password')
  var password = $.trim($password.val())


  $.ajax({
    url: '/member/login',
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