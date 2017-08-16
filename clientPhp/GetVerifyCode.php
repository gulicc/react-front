<?php
/**
 * Created by Hongliang Zhang.
 * User: Hongliang Zhang.
 * Date: 2016/8/24
 * Time: 10:48
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';

$usernm = trim($_POST['userName']);

if(strlen($usernm)>20)
{
	$emsg = json_encode(['status_code'=>8001, 'status_txt'=>'用户名错误']);
	echo $emsg;  
	die();
}

$data = array(
    'account' => $_POST['userName'], //表单参数 优惠券名称
    'usage' => 'REPEATABLE'
);


$data = json_encode($data);

$url = Config::SERVER_IP . "/GetVerifyCode.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;

?>