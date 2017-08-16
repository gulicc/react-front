<?php
/*
 * 接口功能：更新路演投资人报名状态
 * 入参：
 * id：路演报名记录ID
 * status：报名状态（1，审核通过，2，审核驳回）
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifyPostParams(
    'id',
    'status')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'status' => $_POST['status'],
    'modifier_id' => $_POST['modifier_id'],
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/UpdateRoadshowParticipantStatus.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
