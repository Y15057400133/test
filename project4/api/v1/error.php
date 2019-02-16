<?php
//连接服务器,
include("../db.php");
//查询 表格
$sql = "select * from error";
//得到结果集
$res =mysql_query($sql);
$arr = array();
//一行一行的找数据
while($row = mysql_fetch_assoc($res)){
array_push($arr,$row);	//找出的每一条结果,push到数组$arr中
}
//响应，返回，数组arr接收的结果
$respones = array('res_code'=>1,"res_body"=>$arr);
//转格式返回前端
echo json_encode($respones);
?>