<?php
/*
 * 接口功能：获取账户分类大
 * 入参：
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * login_rrolename 账号分类名
 * login_rroleid 账号分类ID
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array();


$data = json_encode($data);

$url = Config::SERVER_IP . "/QueryAccountType.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>