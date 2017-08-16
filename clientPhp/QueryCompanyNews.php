<?php
/*
 * 接口功能：查询企业动态
 * 入参：
 * id：企业ID
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组结构，成员的列表结构：
 * id：动态ID
 * title：标题
 * content：动态内容
 * create_time：时间
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

$url = Config::SERVER_IP . '/QueryCompanyNews.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
