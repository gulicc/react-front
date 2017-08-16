<?php
/**
 * Created by Hongliang Zhang.
 * User: Hongliang Zhang.
 * Date: 2016/8/24
 * Time: 10:48
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$usernm = trim($_POST['userName']);
$userpwo = trim($_POST['oldPassword']);
$userpwn = trim($_POST['newPassword']);

if(strlen($usernm)>20 || strlen($userpwo)>20  || strlen($userpwn)>20)
{
	$emsg = json_encode(['status_code'=>8001, 'status_txt'=>'用户名或密码错误']);
	echo $emsg;  
	die();
}

$data = array(
	'userName' => $usernm,
	'oldpassword' => HttpUtils::passwordEncrypt($userpwo), //密码
	'newpassword' => HttpUtils::passwordEncrypt($userpwn), //密码
	);


$data = json_encode($data);

$url = Config::SERVER_IP . "/ChangePassword.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>