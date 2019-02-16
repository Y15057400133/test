
window.onload=function(){	
//表单绑事件	
tools.$("#Form").onsubmit=function(e){
e =e || window.event;
//提交ajax异步请求
tools.ajax({
method:"post",
url:"api/v1/select.php",
params:{
"username":tools.$("#username").value.trim(),
"password":tools.$("#password").value
},
//回调函数，，判断是否成功
cbSucc:function(res){
//res.res_code 1 成功，，0失败,
if(res.res_code){
console.log(res.res_body);
//判断checkbox是否选中，选中保存三天
if(tools.$("input",tools.$(".checkbox")[0])[0].checked){
tools.cookie("shuju",JSON.stringify({id:res.res_body.id,name:res.res_body.username}),{expires:2});
window.location.href="http://localhost/project4/index3.html";
}else{
tools.cookie("shuju",JSON.stringify({id:res.res_body.id,name:res.res_body.username}));	
window.location.href="http://localhost/project4/index3.html";
}
}else{
alert('登录失败，重新登录');
}
}
});
//组织默认事件
e.preventDefault();
return false;
}	

}