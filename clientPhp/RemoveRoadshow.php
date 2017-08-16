<?php
/*
 * 接口功能：删除路演活动
 * 入参：
 * id：路演ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>'']
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
    'plat_id',
    'plat_name')) {
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
    'modifier_id' => $_SESSION['plat_id'],
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/RemoveRoadshow.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
