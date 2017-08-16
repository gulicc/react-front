<?php
/*
 * 接口功能：编辑路演活动
 * 入参：
 * id：路演ID
 * title：标题
 * stime：开始时间
 * etime：结束时间
 * sposition：展示地点
 * aposition：实际地点
 * link：链接
 * intro：简介
 * banner：Banner
 * status：状态
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
    'id',
    'title',
    'stime',
    'etime',
    'sposition',
    'aposition',
    'link',
    'intro',
    'status')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'title' => $_POST['title'],
    'stime' => $_POST['stime'],
    'etime' => $_POST['etime'],
    'sposition' => $_POST['sposition'],
    'aposition' => $_POST['aposition'],
    'link' => $_POST['link'],
    'intro' => $_POST['intro'],
    'banner' => HttpUtils::getPostParam('banner'),
    'status' => $_POST['status'],
    'modifier_id' => $_SESSION['plat_id'],
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/EditRoadshow.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
