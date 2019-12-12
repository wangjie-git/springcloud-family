function abnormalTpl(v){
  var str=''
  if (v==1) {
    str='未见异常'
  }else if (v==2) {
    str='异常'
  }else  {
    
  }
  return str;  
}
function ornotTpl(v){
  var str=''
  if (v==1) {
    str='无'
  }else if (v==2) {
    str='有'
  }else  {
    
  }
  return str;  
}









function childrenGenderTpl(v){
  var str=''
  if (v==1) {
    str='男'
  }else if (v==2) {

    str='女'
  }else if (v==9) {
    
    str='未说明的性别'
  }else if (v==0) {
    
    str='未知的性别'
  }else  {
    
  }
  return str;
}
function pregnantDiseaseCodeTpl(v){
  var str=''
  if (v==1) {
    str='无'
  }else if (v==2) {

    str='糖尿病'
  }else if (v==3) {
    
    str='妊娠期高血压'
  }else if (v==4) {
    
    str='其他'
  }else  {
    
  }
  return str;  
}
function bornOrgNoTpl(v){
  var str=''
  if (v==1) {
    str='顺产'
  }else if (v==2) {

    str='胎头吸引'
  }else if (v==3) {
    
    str='产钳'
  }else if (v==4) {
    
    str='剖宫'
  }else if (v==5) {
    
    str='双多胎'
  }else if (v==6) {
    
    str='臀位'
  }else if (v==7) {
    
    str='其他'
  }else  {
    
  }
  return str;  
}
function apgarScoreTypeTpl(v){
  var str=''
  if (v==1) {
    str='1min'
  }else if (v==2) {

    str='5min'
  }else if (v==3) {
    
    str='不详'
  }else  {
    
  }
  return str;  
}
function childrenHearingCheckTpl(v){
  var str=''
  if (v==1) {
    str='通过'
  }else if (v==2) {
    str='未通过'
  }else if (v==3) {    
    str='未筛查'
  }else if (v==4) {    
    str='不详'
  }else  {
    
  }
  return str;  
}
function feedTypeTpl(v){
  var str=''
  if (v==1) {
    str='纯母乳'
  }else if (v==2) {
    str='混合'
  }else if (v==3) {    
    str='人工'
  }else  {
    
  }
  return str;  
}
function childrenStoolTpl(v){
  var str=''
  if (v==1) {
    str='红润'
  }else if (v==2) {
    str='黄染'
  }else if (v==3) {    
    str='其他'
  }else  {
    
  }
  return str;  
}
function childrenFaceNoTpl(v){
  var str=''
  if (v==1) {
    str='糊状'
  }else if (v==2) {
    str='稀'
  }else if (v==3) {    
    str='其他'
  }else  {
    
  }
  return str;  
}
function childrenBregmaticNoTpl(v){
  var str=''
  if (v==1) {
    str='正常'
  }else if (v==2) {
    str='膨隆'
  }else if (v==3) {    
    str='凹陷'
  }else if (v==4) {    
    str='其他'
  }else  {
    
  }
  return str;  
}

function childrenSkinNoTpl(v){
  var str=''
  if (v==1) {
    str='无'
  }else if (v==2) {
    str='湿疹'
  }else if (v==3) {
    str='糜烂'
  }else if (v==4) {
    str='其他'
  }else  {
    
  }
  return str;  
}
function childrenFunicleNoTpl(v){
  var str=''
  if (v==1) {
    str='未脱'
  }else if (v==2) {
    str='脱落'
  }else if (v==3) {
    str='脐部有渗出'
  }else if (v==4) {
    str='其他'
  }else  {
    
  }
  return str;  
}
function childrenGuideTpl(v){
  var str=''
  if (v==1) {
    str='喂养指导'
  }else if (v==2) {
    str='发育指导'
  }else if (v==3) {
    str='防病指导'
  }else if (v==4) {
    str='预防伤害指导'
  }else if (v==5) {
    str='口腔保健指导'
  }else if (v==6) {
    str='其他'
  }else  {
    
  }
  return str;  
}


function childrenJaundicePositionTpl(v){
  if (typeof v == 'undefined') {
    return '';
  }
  var arr=v.split(',')
  var str=''
  for (var i = 0; i < arr.length; i++) {
    str += checkboxhtm(childrenJaundicePositionget(arr[i]))
  }
  return str;
}
function childrenJaundicePositionget(v){
  var str=''
  if (v==1) {
    str='无'
  }else if (v==2) {
    str='面部'
  }else if (v==3) {    
    str='躯干'
  }else if (v==4) {    
    str='四肢'
  }else if (v==5) {    
    str='手足'
  }else  {
    
  }
  return str;    
}














/*
  checkbox Tpl
 */
function checkboxhtm(v){
  return '<span class="ml5">'+v+'</span>'
}
function childrenDiseaseCheckget(v){
  var str=''
  if (v==1) {
    str='未进行'
  }else if (v==2) {
    str='检查均阴性'
  }else if (v==3) {    
    str='甲低'
  }else if (v==4) {    
    str='苯丙酮尿症'
  }else if (v==5) {    
    str='其他遗传代谢病'
  }else  {
    
  }
  return str;   
}
function childrenDiseaseCheckTpl(v){
  if (typeof v == 'undefined') {
    return '';
  }  
  var arr=v.split(',')
  var str=''
  for (var i = 0; i < arr.length; i++) {
    str += checkboxhtm(childrenDiseaseCheckget(arr[i]))
  }
  return str;
}

