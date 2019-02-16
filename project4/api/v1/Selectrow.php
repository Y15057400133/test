<?php
include("../db.php");
$page = $_GET['page'];//得到前端每页几条数据
$pageindex=$_GET['pageindex'];//得到每页页码

$sqlall="select * from error ";//查询所有
$resall = mysql_query($sqlall); //结果集
$rows = mysql_num_rows($resall);//总条数
$pages = ceil($rows/5);//得到总页数,向上取整

$start = ($pageindex-1) * 5;//第一页,查5条,第二页,查5条
//查start页的$page条;
$sql  =" select * from error limit $start,$page";
$res =mysql_query($sql);//结果集
$arr = array();
while($row = mysql_fetch_assoc($res)){
 array_push($arr,$row);
}
$response = array('res_code'=>1,'res_body'=>$arr,'page'=>$pages);
echo json_encode($response);
?>