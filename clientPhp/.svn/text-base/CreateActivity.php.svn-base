<?php
/*
 * 接口功能：添加业务活动
 * 入参：
 * title：活动主题
 * stime：活动起始时间
 * etime：活动结束时间
 * type：活动类型：（1）单方拜访（2）投资人会议
 * way：活动方式：（1）公司（2）外出（3）电话（4）微信
 * director：活动负责人ID
 * record：活动纪要
 * obj_investors：投资人列表，数组形式，成员为投资人ID
 * obj_projects：项目列表，数组形式，成员结构：id（项目ID），staff（项目方人员）
 * obj_staffs：员工列表，数组形式，成员为员工ID
 * files：活动附件，数组形式，成员为文件ID
 * site：活动地点
 * remark：活动备注
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * id：新增活动的ID
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
    'title',
    'stime',
    'etime',
    'type',
    'way',
    'record')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'title' => $_POST['title'],
    'stime' => $_POST['stime'],
    'etime' => $_POST['etime'],
    'type' => $_POST['type'],
    'way' => $_POST['way'],
    'director' => $_POST['director'],
    'record' => $_POST['record'],
    'obj_investors' => HttpUtils::getPostParam('obj_investors', []),
    'obj_projects' => HttpUtils::getPostParam('obj_projects', []),
    'obj_staffs' => HttpUtils::getPostParam('obj_staffs', []),
    'files' => HttpUtils::getPostParam('files', []),
    'site' => HttpUtils::getPostParam('site'),
    'remark' => HttpUtils::getPostParam('remark'),
    'creator_id' => $_SESSION['plat_id']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/CreateActivity.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
