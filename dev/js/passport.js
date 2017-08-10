/**
 * 修改密码
 */

$('#passport_form').on('submit', function () {
  var $opassword = $('#opassword')
  var opassword = $.trim($opassword.val())
  var $password = $('#password')
  var password = $.trim($password.val())
  var $password2 = $('#password2')
  var password2 = $.trim($password2.val())

  if (password !== password2) {
    $('#password2_error').text('重复密码不一致！')
    return false
  }

  $.ajax({
    url: '/member/passport',
    type: 'POST',
    dataType: 'json',
    data: {
      opassword: opassword,
      password: password
    }
  })
    .done(function (json) {
      if (json.re) {
        alert('修改成功！')
        self.location.reload()
      }
      else {
        alert(json.message)
      }
    })
    .fail(function (error) {
      alert(error.message)
    })
  return false
})