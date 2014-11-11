<?php
$loginName = "";
if (isset($_POST['login_name'])) {
    $loginName = $_POST['login_name'];
} 
$password = "";
if (isset($_POST['password'])) {
    $password = $_POST['password'];
}

$userId = null;
if (isset($_POST['login'])) {
    $sql_user = "select * from www_user where lcase(login_name) = lcase('$loginName') and password = '".md5($password)."'";
    $sql_user2 = mysql_query($sql_user) or die(mysql_error());
    if ($sql_user3 = mysql_fetch_array($sql_user2)) {
		$userId = $sql_user3[id];
		$sql_timestamp = "update www_user set last_seen = '".date("Y-m-d H:i:s")."' where id = $userId";
		mysql_query($sql_timestamp) or die(mysql_error());
    }
} else if (!isset($_GET['logout'])) {
    $userId = $_SESSION['user_id'];
	if (isset($userId)) {
    	$sql_user = "select * from www_user where id = $userId";
    	$sql_user2 = mysql_query($sql_user) or die(mysql_error());
    	if (!($sql_user3 = mysql_fetch_array($sql_user2))) {
    		$userId = null;	
    	}
	}
}
$_SESSION['user_id'] = $userId;
?>