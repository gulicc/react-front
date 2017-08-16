<?php
/*
 * 接口功能：获取投资人姓名搜索关键字
 * 入参：
 * name：投资人名称关键字
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * id：投资人内部ID
 * ext_id：投资人外部ID
 * name_cn：中文姓名
 * name_en：英文姓名
 * org_name：投资人机构名称
 * auth_type：认证类型
 * phone：电话
 * email：邮箱
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'name' => HttpUtils::getPostParam('name')
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchInvestorNames.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
