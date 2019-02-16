window.onload=function(){
tools.$("#Form").onsubmit=function(e){
e= e || window.event;

if(tools.$("#username").value ===""){
alert('用户名不能为空');
return;
} 
tools.ajax({
method:"post",
url:"api/v1/Insert.php",
params:{
"username":tools.$("#username").value.trim(),
"password":tools.$("#password").value,
"email":tools.$("#email").value.trim()
},
cbSucc:function(res){
if(res.res_code){
if(confirm("注册成功，去登陆")){
window.location.href="http://localhost/project4/index2.html";
}
}else{
alert("注册失败，重新注册");
window.location.href="http://localhost/project4/index.html";
}
}
});
e.preventDefault();
return false;
}	
	
	
	
	




	
}