var user = require('../modules/user')


//nav登录状态
$.ajax({
  url: '/member/islogin',
  type: 'GET',
  dataType: 'json',
  data: {
    
  }
})
.done(function(json) {   
  if (json.re && json.result != null && json.result != '') {
    $('#nav_author').show();
    $('#nav_right_member').html('<li class="text_li">欢迎,' + json.result + '</li><li><a href="#" id="nav_logout">退出登录</li>');
  }
})
.fail(function(error) {
  
})

//绑定退出登录
$('body').on('click', '#nav_logout', function(){
  user.logOut()
  self.location.reload()
  return false
})