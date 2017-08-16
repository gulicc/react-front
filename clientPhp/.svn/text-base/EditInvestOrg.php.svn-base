<?php
/*
 * 接口功能：编辑投资机构
 * 入参：
 * id：投资机构ID
 * name：机构名称
 * is_galaxy：是否属于星河集团，Y（是） N（否）
 * name_abbr：机构简称
 * type：机构类型ID
 * address：公司地址
 * web：主页
 * fund_size：资金规模
 * staff_size：人数
 * pref_fields：关注领域，数组形式，成员为领域ID
 * pref_phases：关注阶段，数组形式，成员为阶段ID
 * intro：简介
 * tags：标签，数组形式，成员为标签ID
 * team：团队成员，数组形式，成员格式：【name（姓名）,job（职位）,intro（简介）】
 * is_online：渠道，格式：Y（线上）N（线下）
 * source_type：来源，格式：1（圈子导入）2（活动导入）3（网络抓取）
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
    'name')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'name' => $_POST['name'],
    'is_galaxy' => HttpUtils::getPostParam('is_galaxy', 'N'),
    'name_abbr' => HttpUtils::getPostParam('name_abbr'),
    'type' => HttpUtils::getPostParam('type'),
    'address' => HttpUtils::getPostParam('address'),
    'web' => HttpUtils::getPostParam('web'),
    'fund_size' => HttpUtils::getPostParam('fund_size'),
    'staff_size' => HttpUtils::getPostParam('staff_size'),
    'pref_fields' => HttpUtils::getPostParam('pref_fields', []),
    'pref_phases' => HttpUtils::getPostParam('pref_phases', []),
    'intro' => HttpUtils::getPostParam('intro'),
    'tags' => HttpUtils::getPostParam('tags', []),
    'team' => HttpUtils::getPostParam('team', []),
    'is_online' => HttpUtils::getPostParam('is_online', 'N'),
    'source_type' => HttpUtils::getPostParam('source_type'),
    'modifier_id' => $_SESSION['plat_id'],
    'modifier_name' => $_SESSION['plat_name']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/EditInvestOrg.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
