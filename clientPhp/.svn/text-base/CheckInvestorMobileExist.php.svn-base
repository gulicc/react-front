<?php
/*
 * 接口功能：查询投资人手机号是否存在
 * 入参：
 * mobile：手机号
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 1：已存在
 * 0：可使用
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'mobile' => HttpUtils::getPostParam('mobile'),
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/CheckInvestorMobileExist.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
