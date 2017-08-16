<?php
/**
 * Created by Hongliang Zhang.
 * User: Hongliang Zhang.
 * Date: 2016/8/24
 * Time: 10:48
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
if (!session_id()) session_start();

if(strtolower(trim($_SESSION['imagecode']))!=strtolower(trim($_POST['validate'])))
{
	$emsg = json_encode(['status_code'=>8001, 'status_txt'=>'验证码错误！']);
	echo $emsg;  
	die();
}

$usernm = trim($_POST['userName']);
$userpw = trim($_POST['passWord']);

if(strlen($usernm)>20 || strlen($userpw)>20 )
{
	$emsg = json_encode(['status_code'=>8001, 'status_txt'=>'用户名或密码错误']);
	echo $emsg;  
	die();
}

$data = array(
	'userName' => $usernm, //用户名
	'password' => HttpUtils::passwordEncrypt($userpw), //密码
	'token' => '',		//
	'frole' => '平台'	//类型
	);



$data = json_encode($data);

$url = Config::SERVER_IP."/Login.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;

$loginRes = HttpUtils::object2array(json_decode($res));
if ($loginRes['status_code'] == 9000) {
	//登录成功，开启session保存用户ID
	if (!isset($_SESSION)) {
		session_start();
	}
	session_regenerate_id(true);
	$_SESSION=array(
		'fingerprint' => md5($_SERVER['HTTP_USER_AGENT'] . Config::TOKEN . $_SERVER['REMOTE_ADDR']),
		'user' => $loginRes['data'],
		'plat_id' => $loginRes['data']['platform_id'],
		'platorg_id' => $loginRes['data']['platorg_id'],
		'plat_name' => $loginRes['data']['platform_personname']
		);
}


?>