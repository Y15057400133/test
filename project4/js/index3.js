
//判断cookie是否存在，，不存在说明没有登录，无法进入首页，返回登录
if(!tools.cookie("shuju")){
window.location.href="http://localhost/project4/index2.html";
}

window.onload=function(){
tools.$("#lastA").innerHTML=JSON.parse(tools.cookie("shuju")).name;

//按钮生成点击思想，向后台提交当前页页码，，商量规定每页数据量，后台查询所有数据，求出并返回总页码，与请求当前页的数据
//根据数据生成按钮，，，生成前清除之前的按钮，，利用className，选中清除，否则会重复生成按钮
var paginationUl = tools.$("#paginationUl");
var Li =paginationUl.children;
var befor=tools.$("#next");
var num = 5;//假设与后台商定每页5条数据；
var index =1;//默认第一页；
var bgpage;//得到最大后台返回的页码值

function creatTr(){
tools.ajax({
method:"get",
url:"api/v1/Selectrow.php",
params:{
pageindex:index,//向后台提交当前页码
page:num         //向后台提交每页数据量
},
cbSucc:function(res){
bgpage = res.page;//得到返回的最大页码；
//得到数据，循环取值，创建li ,得到page页码，分页
if(res.res_code){
var str="";	
var data = res.res_body;//接收res_body数组中的 json数据，
//循环取值，
for(let value of data){	
//字符串模板拼接	
str+=`<tr class="">
	<td>
	${value.id}
	</td>	
	<td>
	<span>${value.title}</span><input type="text" name="" id="" value="" />
	</td>	
	<td>
	<span>${value.answer}</span><input type="text" name="" id="" value="" />
	</td>	
	<td>
	<a id="bj" class="bj" href="##">编辑</a>
	<a id="sc" class="sc" href="##">删除</a>
	<a id="qd" class="qd" href="##">确定</a>
	<a id="qx" class="qx" href="##">取消</a>
	</td>		
	</tr> `
}
//拼接的tr,放进tbody中
tools.$("#tbody").innerHTML=str;
}
//分页 生成按钮前删除一次，避免重复生成按钮
var middleLi =tools.$(".data-li",paginationUl);
middleLi =Array.from(middleLi);//转为伪数组
for(var key in middleLi){
	paginationUl.removeChild(middleLi[key]);
}

 //分页 生成按钮,
for(let i=1;i<=res.page;i++){
	var li = document.createElement("li");
	 paginationUl.insertBefore(li,befor); 
	 li.className="allclass data-li";
	 li.innerHTML=`<a class="allclass" href="javascript:;">${i}</a>`; //字符串模板拼接
}
}
})	
}
creatTr();//默认第一页显示
//事件委托，页码绑事件
paginationUl.onclick = function(e){
e = e || window.event;
var target = e.target || e.srcElement;
//点击上一页
if(target.className === "Aliprev"){//点击上一页按钮

index--;  //页码减
if(index<1) index=1;
creatTr();
}else if(target.className === "allclass"){//点击中间li按钮，
index = Number(target.innerHTML);//页码重新赋值

creatTr();
}else if(target.className === "Alinext"){//点击下一页按钮
index++;//页码++
if(index > bgpage) index = bgpage;//bgpage后台返回最大页码值
creatTr();
}	
}

var Odiv = tools.$("#main");//事件委托，
Odiv.onclick=function(e){
e= e || event;
var target=e.target || e.srcElement;//获取事件源
// 给编辑帮事件
if(target.className ==="bj"){
var Tr=target.parentNode.parentNode;
	Tr.className="table2";
var Span=tools.$("span",Tr);
var Input=tools.$("input",Tr);
Input[0].value=Span[0].innerHTML;
Input[1].value=Span[1].innerHTML;
}	 
//给确定帮事件
else if(target.className ==="qd"){
//获取当前的tr，
var Tr=target.parentNode.parentNode;
Tr.className="table";
var Span=tools.$("span",Tr);
var Input=tools.$("input",Tr);
//获取表单对应要修改的参数值，，并传参数
var id =Tr.children[0].innerHTML;//编号
var title = Input[0].value;//题目
 var answer = Input[1].value;//答案
 //ajax异步请求，
tools.ajax({
method:"post",//请求方式
url:"api/v1/Update.php",//url
params:{
// id:id,title:title,answer:answer;	 结构赋值
id,title,answer  //传递参数
},
//成功的回调函数
cbSucc:function(res){
if(res.res_code){
//input的值等于修改过后的对应的值
Input[0].value = res.res_body.title;
Input[1].value = res.res_body.answer;
alert("修改成功");
window.location.reload();//刷新页面
}
}		
})
 // 删除绑定事件
}else if(target.className ==="sc"){
if(confirm("确定删除？")){
var Tr=target.parentNode.parentNode;
// Tr.parentNode.removeChild(Tr);
var id =Tr.children[0].innerHTML;
console.log(id);
tools.ajax({
method:"get",
url:"api/v1/deletE.php",
params:{id},	//解构赋值写法；
cbSucc:function(res){
//删除成功，刷新页面
window.location.reload();
}
})
}
// 取消绑定事件
}else if(target.className ==="qx"){
var Tr=target.parentNode.parentNode;
	Tr.className="table";
 }
}

 //给添加题目绑事件
tools.$("#modal-content").onclick=function(e){
e = e || window.event;
//获取事件源
var target = e.target || e.srcElement;	
//模态框的增加与取消绑事件
if(target.id === "okbtn" ){
	//判断是否为空
	if(tools.$("#recipient-name").value === ''){
	alert("题目不能为空");
	return;
	}else if(tools.$("#recipient-name2").value ===''){
	alert("答案不能为空");
	return;	
	}
//数据库加入题目
tools.ajax({
url:"api/v1/inserttitle.php",//url
method:"get",//get请求
params:{
//传递参数
title:tools.$("#recipient-name").value, 
answer:tools.$("#recipient-name2").value
 },//成功回调函数
cbSucc:function(res){
if(res.res_code){
//插入成功，刷新页面
window.location.reload();
}
}
})		
tools.$("#recipient-name").value ="";
tools.$("#recipient-name2").value ="";
}else if(target.id === "closebtn"){     //模态框取消绑事件
tools.$("#recipient-name").value ="";    //清空Input的值
tools.$("#recipient-name2").value ="";	
}		
}	


	
	
	
	
	
	
	
	
	
	
	
	
	
	
}