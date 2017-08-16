<?php
/*
 * 接口功能：获取工作状态列表 项目处置
 * 入参：
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * treat_name			工作状态名称
 * treat_detail			工作状态描述
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array();
$data = json_encode($data);

$url = Config::SERVER_IP."/QueryTreats.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);
echo $res;
