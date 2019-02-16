<?php
//连接服务器
  $dbInfo = array(
  	'host' => 'localhost:3306',//默认端口3306
  	'username' => 'root',
  	'password' => '',
  	'dbname' => '1809-1'//服务器下的数据库
  );
  //建立数据库连接
  mysql_connect($dbInfo['host'] , $dbInfo['username'] , $dbInfo['password']);
  
  mysql_select_db($dbInfo['dbname']);//连接数据库
  
  mysql_query("set charset 'utf-8'");//编码,
  mysql_query("set character set 'utf8'");//编码,
 
  
  
?>