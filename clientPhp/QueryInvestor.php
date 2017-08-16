<?php
/*
 * 接口功能：查询投资人
 * 入参：
 * id：投资人ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组结构，成员的列表结构：
 * id：投资人ID
 * name：投资人姓名
 * name_en：英文名
 * sex：性别，格式：男/女
 * mobile：电话
 * head_portrait_id：头像文件id
 * head_portrait_path：头像文件路径
 * tags：标签，数组形式，成员为标签名称
 * tag_ids：标签ID，数组形式，成员为标签ID
 * auth_type：认证类型：未认证/投资人/领投人
 * investtype：投资人类型
 * investtype_ids：投资人类型ID，数组形式，成员为类型ID
 * org_id：机构ID
 * org_name：机构名称
 * org_department：机构部门
 * org_job：机构职位
 * internal_power：内部影响力
 * preffered_rounds：关注轮次
 * preffered_round_ids：关注轮次ID，数组形式，成员为轮次ID
 * preffered_fields：关注领域
 * preffered_field_ids：关注领域ID，数组形式，成员为领域ID
 * email：Email
 * wechat：微信
 * qq：QQ
 * birthday：生日
 * homeaddress：家庭地址
 * intro：简介
 * is_online：渠道：线上/线下
 * source_type_id：来源ID
 * source_type：来源
 * hasConn：是否认识公司内人员
 * cusManager_id：客户经理ID
 * cusManager_name：客户经理姓名
 * remark：备注
 * regist_type：创建来源
 * creator_name：录入人
 * creator_time：录入时间
 * invest_cases：投资案例，数组形式，成员结构：【all（全部项目）数组形式，galaxy（星河项目）数组形式，结构均为：
 * 【project_name（项目名称）,fields（领域）,rounds（轮次）,fund_amount（金额）,role（投资角色）】
 * invest_actv：互动记录，数组形式，成员结构：【id（活动ID）,title（主题）,type（类型）,time（时间）,follower（负责人）,way（形式）,files（附件）,object（对象）】
 * invest_actv_cnt_curyear：本年活动次数
 * single_invest_size_min：单笔投资规模最小值
 * single_invest_size_max：单笔投资规模最大值
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

$url = Config::SERVER_IP . '/QueryInvestor.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
