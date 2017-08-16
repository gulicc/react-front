<?php
/*
 * 接口功能：根据省查询城市名称
 * 入参：
 * province_id：省ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * cityid：ID
 * city：名称
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifyPostParams(
    'province_id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'province_id' => $_POST['province_id']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/ListLocCitiesByProvince.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
