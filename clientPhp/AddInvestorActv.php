<?php
/*
 * 接口功能：添加投资人信息中的互动记录
 * 入参：
 * id：投资人ID
 * title：活动主题
 * act_content：活动纪要
 * act_time：活动时间，格式：xxxx-xx-xx xx:xx:xx
 * act_way：活动方式：（1）公司（2）外出（3）电话（4）微信
 * act_follower：活动负责人ID
 * act_site：活动地点
 * act_remark：活动备注
 * act_files：活动附件，数字形式，成员为文件ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 空
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifyPostParams(
    'id',
    'title',
    'act_content',
    'act_time',
    'act_way',
    'act_follower')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'title' => $_POST['title'],
    'act_content' => $_POST['act_content'],
    'act_time' => $_POST['act_time'],
    'act_way' => $_POST['act_way'],
    'act_follower' => $_POST['act_follower'],
    'act_site' => HttpUtils::getPostParam('act_site'),
    'act_remark' => HttpUtils::getPostParam('act_remark'),
    'act_files' => HttpUtils::getPostParam('act_files', [])
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/AddInvestorActv.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
