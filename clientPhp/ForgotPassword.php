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
$code = trim($_POST['code']);
$userpwo = trim($_POST['oldPassword']);
$userpwn = trim($_POST['newPassword']);

if(strlen($usernm)>20 || strlen($code)>8 )
{
    $emsg = json_encode(['status_code'=>8001, 'status_txt'=>'用户名或验证码错误']);
    echo $emsg;
    die();
}
if(strlen($userpwo)>20  || strlen($userpwn)>20 || strlen($userpwo)!=strlen($userpwn))
{
    $emsg = json_encode(['status_code'=>8001, 'status_txt'=>'密码超长或两次输入不一致']);
    echo $emsg;
    die();
}
//验证码校验
$data = array(
    'userName' => $usernm,
    'verifycode' => $code,
    'newpassword' => HttpUtils::passwordEncrypt($userpwn)
);


$data = json_encode($data);

$url = Config::SERVER_IP . "/ResetPassword.php";
$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;

?>