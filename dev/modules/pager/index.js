/**
 * 分页
 */


var pager = (function () {
  function pager(options) {
      var defaultoptions = {
          element_id: null,
          count: 500,
          pagesize: 20,
          pageindex: 1
      }
      this.options = $.extend(defaultoptions, options);
  }

  pager.prototype.show = function () {
      if (this.options.count == 0) {
          $('#' + this.options.element_id).html('');
          return false;
      }
      var count = Math.ceil(this.options.count / this.options.pagesize);
      var html = [];
      var pageindex = this.options.pageindex;

      // 上一页页码
      var prev_num = 1;
      if(pageindex > 1){
          prev_num = pageindex - 1;
      }
      // 下一页页码
      var next_num = count;
      if(pageindex < count){
          next_num = pageindex + 1;
      }

      html.push('<a href="javascript:;" data-page="1" class="btn btn-default"><span class="glyphicon glyphicon-fast-backward"></span> 首页</a><a href="javascript:;" class="btn btn-default" data-page="' + prev_num + '"><span class="glyphicon glyphicon-backward"></span> 上一页</a>');

      if (pageindex < 4) {
          //前五个
          for (var i = 1; i <= count; i++) {
              if(i > 5){
                  break;
              }
              html.push('<a href="javascript:;" class="btn btn-');
              if (i == pageindex) {
                  html.push('primary"');
              }
              else{
                html.push('default"');
              }
              html.push('" data-page="' + i + '">' + i + '</a>');
          };
      }
      else if(pageindex > count - 3){
          for (var i = (count - 4 > 0) ? count - 4 : 1; i <= count; i++) {
              html.push('<a href="javascript:;" class="btn btn-');
              if (i == pageindex) {
                html.push('primary"');
              }
              else{
                html.push('default"');
              }
              html.push('" data-page="' + i + '">' + i + '</a>');
          };
      }
      else{
          for (var i = pageindex -2; i <= pageindex + 2; i++) {
              html.push('<a href="javascript:;" class="btn btn-default" data-page="' + i + '"');
              if (i == pageindex) {
                  html.push(' class="on"');
              };
              html.push('>' + i + '</a>');
          };
      }

      html.push('<a href="javascript:;" class="btn btn-default" data-page="' + next_num + '"><span class="glyphicon glyphicon-forward"></span> 下一页</a><a href="javascript:;" class="btn btn-default" data-page="' + count + '"><span class="glyphicon glyphicon-forward"></span> 尾页</a>');

      $('#' + this.options.element_id).html(html.join(''));
  };
  return pager;
})();

module.exports = pager;