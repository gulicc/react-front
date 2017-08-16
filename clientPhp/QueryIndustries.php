<?php
/*
 * 接口功能：查询领域
 * 入参：
 * 空
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * id：领域ID
 * name：领域名称
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array();

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/QueryIndustries.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
