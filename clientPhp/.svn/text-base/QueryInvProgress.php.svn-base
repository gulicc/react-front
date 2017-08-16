<?php
/*
 * 接口功能：投资意向进度
 * 入参：
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * progname		投资意向进度名称
 * id			投资意向进度ID
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array();

$data = json_encode($data);

$url = Config::SERVER_IP."/QueryInvProgress.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>