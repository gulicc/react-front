<?php
/*
 * 接口功能：获取项目融资进展
 * 入参：
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * fstatus_name			融资进展名称
 * fstatus_id			融资进展ID
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array();

$data = json_encode($data);

$url = Config::SERVER_IP."/QueryFinStatus.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>