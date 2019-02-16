<?php
include("../db.php");
$id = $_POST['id'];//修改过后的参数
$title = $_POST['title'];//修改过后的参数
$answer = $_POST['answer'];//修改过后的参数
//重新给数据库对应的值作修改
$sql = "update error set title ='$title',answer='$answer' where id=$id"; //id不加引号,本来就是个数字,加入引号,数据库无法修改
//boolean值
$isSucc = mysql_query($sql);
//判断是true？false
if($isSucc){
//res_body的内容等于修改过后的json数据	
$arr =array('res_code'=>1,'res_message'=>"修改成功",'res_body'=> array ('id'=>$id,'title'=>$title,'answer'=>$answer));	
}else{
$arr =array('res_code'=>1,'res_body'=>"",'res_message'=>"修改失败");	
}
echo json_encode($arr);

mysql_close();//关闭数据库
?>