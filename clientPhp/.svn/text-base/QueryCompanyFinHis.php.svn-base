<?php
/*
 * 接口功能：查询企业融资历史
 * 入参：
 * id：企业ID
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * count：总记录条数
 * record结构如下：
 * id：项目ID
 * name：项目名称
 * stime：融资时间
 * fund_amount：融资额度
 * round：项目阶段
 * leader_fund：领头人，数组形式
 * crowd_fund：跟投人，数组形式
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifyPostParams('id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id'],
    'page_index' => HttpUtils::getPostParam('page_index', 1),
    'page_cap' => HttpUtils::getPostParam('page_cap', 20)
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/QueryCompanyFinHis.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
