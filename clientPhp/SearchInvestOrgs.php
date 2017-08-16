<?php
/*
 * 接口功能：搜索投资机构列表
 * 入参：
 * name：机构名称
 * scale：资金规模
 * fields：领域，数组形式，成员为领域ID
 * tags：标签，数组形式，成员为标签ID
 * sort_col：排序列（暂时不用）
 * sort_order：升级或降序（暂时不用）
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * count：总记录条数
 * record结构如下：
 * id：机构ID
 * name：机构简称
 * type：类型
 * fund_size：资金规模
 * create_time：录入时间
 * create_name：录入人
 * fields：领域
 * tags：标签，数组形式，成员为标签名称
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'name' => HttpUtils::getPostParam('name'),
    'scale' => HttpUtils::getPostParam('scale'),
    'fields' => HttpUtils::getPostParam('fields', []),
    'tags' => HttpUtils::getPostParam('tags', []),
    'sort_col' => HttpUtils::getPostParam('sort_col'),
    'sort_order' => HttpUtils::getPostParam('sort_order', 'DESC'),
    'page_index' => HttpUtils::getPostParam('page_index', 1),
    'page_cap' => HttpUtils::getPostParam('page_cap', 200)
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchInvestOrgs.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
