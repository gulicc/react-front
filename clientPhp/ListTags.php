<?php
/*
 * 接口功能：获取标签列表
 * 入参：
 * key：搜索关键字
 * type：标签类型：1（项目）2（企业）3（投资人）4（投资机构）
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * total：总记录条数
 * table结构如下：
 * tag_id：标签ID
 * tag_name：名称
 * tag_detail：详情
 * tagtyp_name：类型名称
 * tag_counter：使用量
 * tag_owner：创建人ID
 * platform_personname：创建人姓名
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
    'plat_id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
    exit(0);
}

$params = array(
    'searchkey' => isset($_POST['key']) ? $_POST['key'] : '',
    'tagtype' => isset($_POST['type']) ? $_POST['type'] : [],
    'page_index' => isset($_POST['page_index']) ? $_POST['page_index'] : 1,
    'page_cap' => isset($_POST['page_cap']) ? $_POST['page_cap'] : 20,
    'operator' => $_SESSION['plat_id']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/ListTags.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
