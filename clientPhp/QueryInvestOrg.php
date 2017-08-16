<?php
/*
 * 接口功能：查询投资机构
 * 入参：
 * id：投资机构ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组结构，成员的列表结构：
 * name：名称
 * is_galaxy：是否属于星河集团，Y（是） N（否）
 * name_abbr：简称
 * type：类型
 * type_id：类型ID
 * address：地址
 * web：主页
 * fund_size：资金规模
 * staff_size：人员规模
 * preffered_rounds：关注轮次
 * preffered_round_ids：关注轮次ID，数组形式，成员为轮次ID
 * preffered_fields：关注领域
 * preffered_field_ids：关注领域ID，数组形式，成员为领域ID
 * intro：简介
 * tags：标签，数组形式，成员为标签名称
 * tag_ids：标签ID，数组形式，成员为标签ID
 * create_time：创建时间
 * creator_name：创建人
 * modify_time：更新时间
 * modifier_name：最后编辑人
 * is_online：渠道：线上/线下
 * source_type_id：来源ID
 * source_type：来源
 * team：团队成员，数组形式，成员结构：【name（姓名）,job（职位）,intro（简介）】
 * invest_records：投资记录，数组形式，成员结构：【all（全部项目）数组形式，galaxy（星河项目）数组形式，结构均为：
 * project_id（项目ID）,project_name（项目名称）,fields（领域）,rounds（轮次）,fund_amount（金额）,role（投资角色）,investor_name（投资人）】
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

$url = Config::SERVER_IP . '/QueryInvestOrg.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
