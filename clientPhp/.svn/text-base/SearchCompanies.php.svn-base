<?php
/*
 * 接口功能：搜索企业列表
 * 入参：
 * name：企业名称
 * staff_size：企业规模
 * fields：领域，数组形式，成员为领域ID
 * sort_col：排序列（暂时不用）
 * sort_order：升级或降序（暂时不用）
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * count：总记录条数
 * record结构如下：
 * id：企业ID
 * name：企业全称
 * reg_time：成立时间
 * reg_capital：注册资本
 * fields：领域
 * address：地区
 * staff_size：公司规模
 * main_service：主营业务
 * invest_project_num：融资项目数
 * invest_fund_val：融资总金额
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'name' => HttpUtils::getPostParam('name'),
    'staff_size' => HttpUtils::getPostParam('staff_size'),
    'fields' => HttpUtils::getPostParam('fields', []),
    'sort_col' => HttpUtils::getPostParam('sort_col'),
    'sort_order' => HttpUtils::getPostParam('sort_order', 'DESC'),
    'page_index' => HttpUtils::getPostParam('page_index', 1),
    'page_cap' => HttpUtils::getPostParam('page_cap', 200)
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchCompanies.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
