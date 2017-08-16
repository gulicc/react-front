<?php
/*
 * 接口功能：更新投资人审核状态
 * 入参：
 * id：申请记录ID
 * pass：审核操作（Y：通过，N：拒绝）
 * remark：审核备注
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
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
    'id',
    'pass')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'reviewer_id' => $_SESSION['plat_id'],
    'pass' => $_POST['pass'],
    'remark' => HttpUtils::getPostParam('remark'),
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/ReviewInvestor.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
