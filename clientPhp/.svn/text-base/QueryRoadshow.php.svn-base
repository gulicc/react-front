<?php
/*
 * 接口功能：查询路演活动
 * 入参：
 * id：路演ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * title：主题
 * time：时间
 * stime：开始时间
 * etime：结束时间
 * sposition：展示地点
 * aposition：实际地点
 * link：链接
 * banner：Banner
 * status：状态
 * intro：简介
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifyPostParams(
    'id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/QueryRoadshow.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
