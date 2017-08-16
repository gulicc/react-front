<?php
/*
 * 接口功能：删除企业行情与动态
 * 入参：
 * id：动态ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 空
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
    'plat_id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
    exit(0);
}

if (!HttpUtils::verifyPostParams(
    'id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'modifier_id' => $_SESSION['plat_id']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/DeleteCompanyNews.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
