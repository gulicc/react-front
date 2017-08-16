<?php
/*
 * 接口功能：查询文章
 * 入参：
 * id：文章ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * title：标题
 * link：链接
 * intro：简介
 * author：作者
 * time：显示时间
 * type：类型名称
 * type_id：类型ID
 * image：图片地址
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

$url = Config::SERVER_IP . '/QueryArticle.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
