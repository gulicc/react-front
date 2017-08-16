<?php
/*
 * 接口功能：搜索投资人列表
 * 入参：
 * name：投资人姓名
 * rounds：阶段，数组形式，成员为阶段ID
 * fields：领域，数组形式，成员为领域ID
 * tags：标签，数组形式，成员为标签ID
 * auth_type：认证类型：1（未认证）2（投资人）3（领投人”）
 * invest_types：投资人类型，数组形式，成员为类型ID
 * sort_col：排序列（暂时不用）
 * sort_order：升级或降序（暂时不用）
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * count：总记录条数
 * record结构如下：
 * id：投资人ID
 * name：姓名
 * auth_type：认证类型
 * invest_types：投资人类型
 * fields：关注领域
 * rounds：关注阶段
 * phone：电话
 * creator：录入人
 * source：渠道来源
 * remark：备注
 * tags：标签，数组形式，成员为标签名称
 * org_id：机构ID
 * org_name：机构名称
 * single_invest_size_min：单笔投资规模最小值
 * single_invest_size_max：单笔投资规模最大值
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'name' => HttpUtils::getPostParam('name'),
    'rounds' => HttpUtils::getPostParam('rounds', []),
    'fields' => HttpUtils::getPostParam('fields', []),
    'tags' => HttpUtils::getPostParam('tags', []),
    'auth_type' => HttpUtils::getPostParam('auth_type'),
    'invest_types' => HttpUtils::getPostParam('invest_types', []),
    'sort_col' => HttpUtils::getPostParam('sort_col'),
    'sort_order' => HttpUtils::getPostParam('sort_order', 'DESC'),
    'page_index' => HttpUtils::getPostParam('page_index', 1),
    'page_cap' => HttpUtils::getPostParam('page_cap', 200)
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchInvestors.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
