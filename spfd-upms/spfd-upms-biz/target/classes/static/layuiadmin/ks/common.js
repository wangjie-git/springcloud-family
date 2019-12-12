function htmlTpl(data, getid, toid, fun) {
  layui.use('laytpl', function(){
    var $=layui.$;
    var laytpl = layui.laytpl;
    var getTpl = $(getid).html();
    laytpl(getTpl).render(data, function(html){
      $(toid).html(html);
      if (typeof fun == 'function') {
        fun();
      }
    });
  }); 
}
function ischecked(data,val){
  return data==val?'checked':'';
}
function ischeckbox(data,val){
  var arr=data.split(',');
  for (var i = 0; i < arr.length; i++) {
    if(arr[i]==val){
      return 'checked';
    }
  }
  return '';
}
function isundefined(val){
  if (typeof val == 'undefined') {
    return '';
  }
  return val;
}
