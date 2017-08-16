<?php
/*
 * 接口功能：resetPassword
 * 入参：
 * userName		用户名
 * verifycode	验证码
 * newpassword	新密码
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 */

require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';

if (!HttpUtils::verifySessionParams(
	'plat_id')) {
		echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
		exit(0);
	}
$userpwn = trim($_POST['newPassword']);
$usernm = trim($_POST['userName']);
if(strlen($usernm)>20 || strlen($userpwn)>20)
{
	$emsg = json_encode(['status_code'=>8001, 'status_txt'=>'用户名或密码错误']);
	echo $emsg;  
	die();
}

$data = array(
		'userName' => $_POST['userName'],		//用户名
		'verifycode' => $_POST['verifycode'],	//验证码
		'newpassword' => $userpwn	//新密码
	);


$data = json_encode($data);

$url = Config::SERVER_IP . "/ResetPassword.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>