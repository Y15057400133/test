<?php
include("../db.php");
$title = $_GET["title"];//接收前端数据
$answer = $_GET["answer"];
$sql = "insert into error (title,answer) value ('$title','$answer')";
// $res =mysql_query($sql);
//判断结果集数据
if(mysql_query($sql)){
$arr =array('res_code'=> 1,'res_message'=>"插入成功");	
}else{
$arr =array('res_code'=> 0,'res_message'=>"插入失败");	
}
echo json_encode($arr);
mysql_close();//手动关闭数据库
?>