<?php
/*
 * 接口功能：查询企业
 * 入参：
 * id：企业ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * name：企业全称
 * abbrname：企业简称
 * logo：企业logo
 * fields：行业领域，数组形式，成员为领域ID
 * regist_time：成立时间，格式：xxxx-xx-xx xx:xx:xx
 * regist_capital：注册资本
 * legal_person：法定代表人
 * staff_size：公司规模
 * address：注册地址
 * web：公司网站
 * ipo_status：公开募资
 * intro：公司简介
 * primary_business：主营业务
 * business_model：商业模式
 * business_intro：业务介绍
 * team：团队信息，数组形式，成员格式：【name（姓名）,title（头衔）,duty（职务）,intro（简介）,photo（头像文件路径）,photo_id（头像文件ID）】
 * stock_struct：股权结构，数组形式，成员格式：【name（企业名称）,scale（持股比例）】
 * competitors：竞争对手，数组形式，成员格式：【name（企业名称）,address（地区）,primary_business（主营业务）,compete_description（竞争业务）】
 * financial_data：财务数据，数组形式，成员格式：【start_time（起始时间）,revenue（收入）,revenue_source（收入来源）,net_margin（净利润）,margin_source（净利润来源）】
 * creator：录入人
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

$url = Config::SERVER_IP . '/QueryCompany.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
