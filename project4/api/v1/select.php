<?php
include("../db.php");
//获取name  为usname的input的值 ; 
$usname=$_POST['username'];
$password=$_POST['password'];

//查询数据库,usertwo的值与输入的值是否相等
$sql = "select * from usertwo where username='$usname' and password = '$password'";
$res =mysql_query($sql);
//只有一条记录($row),有就true,
if($row = mysql_fetch_assoc($res)){
$arr = array('res_code'=>1,'res_body'=>$row);//前端得到结果，进行跳转	
}else{
//没有结果; res_code=0,即false; 没有内容;
$arr =array('res_code'=>0,'res_body'=>"");//前端得到结果，进行跳转	
}
echo json_encode($arr);//转json,,返回前端.
//关闭数据库
mysql_close();
?>