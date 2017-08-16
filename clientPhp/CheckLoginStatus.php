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

if (!isset($_SESSION['fingerprint'] ) || $_SESSION ['fingerprint'] != md5 ( $_SERVER ['HTTP_USER_AGENT'] . Config::TOKEN . $_SERVER ['REMOTE_ADDR'] )) {
    session_destroy ();
    $ret = ['status_code' => 9001, 'status_txt' => '用户未登录'];
}else
{
    $ret = ['status_code' => 9000, 'status_txt' => '当前已登陆'];
}
$res = HttpUtils::object2array ( $ret );
$res = json_encode ( $res );
echo $res;
?>