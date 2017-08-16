<?php
/*
 * 接口功能：获取业务活动搜索关键字
 * 入参：
 * key：跟进人姓名或活动主题
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员为搜索关键字
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'key' => HttpUtils::getPostParam('key')
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchActivityKeywords.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
