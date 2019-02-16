<?php
include("../db.php");
//接收name  为usname的input的值 ; 
$usname=$_POST['username'];
$password=$_POST['password'];
$email =$_POST['email'];
//查询这条数据   不准重复
$sqlchongfu = "select * from usertwo where username ='$usname'";
// //判断为空,不能注册？
// $sqlnull ="select * from usertwo where username =''";


//判断查询结果
$res = mysql_query($sqlchongfu);

if(mysql_num_rows($res) > 0){
$arr =array('res_code'=>0,'res_message'=>"用户名已存在");	
echo json_encode($arr);
 }else{
//用户不存在	
//为数据库,usertwo 每次注册成功，插入一条记录;
$sql = "insert into usertwo (username,password,email) values ('$usname','$password','$email')";
// 资料 该函数自动对记录集进行读取和缓存。如需运行非缓存查询，
$isSucc = mysql_query($sql);
if($isSucc){
$arr =array('res_code' => 1,'res_message'=>"注册成功");
echo json_encode($arr);
}else{
$arr = array('res_code' => 0,'res_message'=>"数据库操作失败");
echo json_encode($arr);
}
//关闭数据库
 }
mysql_close();
?>