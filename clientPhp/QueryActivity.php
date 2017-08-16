<?php
/*
 * 接口功能：查询业务活动详情
 * 入参：
 * id：活动ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * title：主题
 * time：时间
 * type：类型
 * way：方式
 * director：负责人
 * site：地点
 * record：活动记录
 * remark：备注
 * creator_name：创建人姓名
 * create_time：创建时间
 * obj_investors：投资人，数组形式，成员格式：【name（姓名）,name_en（英文名）,company（投资机构）,auth_type（认证类型）,phone（电话）,email（邮件）】
 * obj_projects：项目，数组形式，成员格式：【name（项目名称）,round（轮次）,fund_amount（拟投资意向）,actual_fund_amount（实际投资意向）,work_status（工作状态）,project_status（项目进度）,project_manager（项目经理）,project_staff（项目方人员）】
 * obj_staffs：员工列表，数组形式，成员格式：【name（姓名）,sex（性别）,company（公司）,department（部门）,job（岗位）,phone（手机号）】
 * files：附件，数组形式，成员格式：【name（名称）,link（下载地址）】
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

$url = Config::SERVER_IP . '/QueryActivity.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
