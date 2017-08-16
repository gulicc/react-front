<?php
/*
 * 接口功能：编辑投资人
 * 入参：
 * id：投资人ID
 * name：投资人姓名
 * name_en：英文名
 * sex：性别，格式：M（男）/F（女）
 * is_org：投资人类型，格式：Y（机构）N（个人）
 * org_id：机构ID
 * org_name：机构名称
 * org_department：部门名称
 * org_job：职位
 * internal_power：内部影响力
 * preffered_fields：关注领域，数组形式，成员为领域ID
 * preffered_rounds：关注阶段，数组形式，成员为阶段ID
 * head_portrait：头像
 * mobile：手机
 * email：Email
 * wechat：微信号
 * qq：QQ号
 * birthday：生日
 * address：家庭地址
 * introduction：简介
 * has_connections：是否认识公司内人员，格式：有（内部人员ID）否（填空）
 * customer_manager：客户经理ID
 * remark：备注
 * tags：标签，数组形式，成员为标签ID
 * is_online：渠道，格式：Y（线上）N（线下）
 * source_type：来源，格式：1（圈子导入）2（活动导入）3（网络抓取）
 * invest_types：投资人类型，数组形式，成员为类型ID

 * single_invest_size_min：单笔投资规模最小值
 * single_invest_size_max：单笔投资规模最大值
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 空
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
    'name',
    'is_org',
    'mobile')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'name' => $_POST['name'],
    'name_en' => HttpUtils::getPostParam('name_en'),
    'sex' => HttpUtils::getPostParam('sex'),
    'is_org' => $_POST['is_org'],
    'org_id' => HttpUtils::getPostParam('org_id'),
    'org_name' => HttpUtils::getPostParam('org_name'),
    'org_department' => HttpUtils::getPostParam('org_department'),
    'org_job' => HttpUtils::getPostParam('org_job'),
    'internal_power' => HttpUtils::getPostParam('internal_power'),
    'preffered_fields' => HttpUtils::getPostParam('preffered_fields', []),
    'preffered_rounds' => HttpUtils::getPostParam('preffered_rounds', []),
    'head_portrait' => HttpUtils::getPostParam('head_portrait'),
    'mobile' => $_POST['mobile'],
    'email' => HttpUtils::getPostParam('email'),
    'wechat' => HttpUtils::getPostParam('wechat'),
    'qq' => HttpUtils::getPostParam('qq'),
    'birthday' => HttpUtils::getPostParam('birthday'),
    'address' => HttpUtils::getPostParam('address'),
    'introduction' => HttpUtils::getPostParam('introduction'),
    'has_connections' => HttpUtils::getPostParam('has_connections'),
    'customer_manager' => HttpUtils::getPostParam('customer_manager'),
    'remark' => HttpUtils::getPostParam('remark'),
    'tags' => HttpUtils::getPostParam('tags', []),
    'is_online' => HttpUtils::getPostParam('is_online', 'N'),
    'source_type' => HttpUtils::getPostParam('source_type'),
    'invest_types' => HttpUtils::getPostParam('invest_types', []),
    'single_invest_size_min' => HttpUtils::getPostParam('single_invest_size_min'),
    'single_invest_size_max' => HttpUtils::getPostParam('single_invest_size_max'),

    'modifier_id' => $_SESSION['plat_id'],
    'modifier_name' => $_SESSION['plat_name']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/EditInvestor.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
