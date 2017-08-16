<?php
/*
 * 接口功能：获取企业名称搜索关键字
 * 入参：
 * name：企业名称关键字
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员列表结构【orginfo_id（企业ID），orginfo_name（企业名称）】
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'name' => HttpUtils::getPostParam('name')
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchCompanyNames.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
