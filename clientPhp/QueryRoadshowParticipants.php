<?php
/*
 * 接口功能：查询路演报名列表
 * 入参：
 * id：路演ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * tobeverified：未审核投资人
 *     id：路演报名记录ID
 *     name：姓名
 *     is_org：投资机构
 *     phone：手机号
 *     busicard：名片文件链接地址
 *     auth：认证状态
 *     apply_time：申请时间
 *     status：审核结果
 * verified：已审核投资人
 *     id：路演报名记录ID
 *     name：姓名
 *     is_org：投资机构
 *     phone：手机号
 *     busicard：名片文件链接地址
 *     auth：认证状态
 *     apply_time：申请时间
 *     status：审核结果（1，审核通过，2，审核驳回）
 *     verified_time：审核时间
 *     verified_by：审核人
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

$url = Config::SERVER_IP . '/QueryRoadshowParticipants.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
