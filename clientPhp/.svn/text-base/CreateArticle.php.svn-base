<?php
/*
 * 接口功能：创建文章
 * 入参：
 * title：标题
 * link：链接
 * intro：简介
 * author：作者
 * time：显示时间
 * type：类型
 * image：图片ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data返回记录ID
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
    'plat_id',
    'plat_name')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
    exit(0);
}

if (!HttpUtils::verifyPostParams(
    'title',
    'link',
    'intro',
    'author',
    'time',
    'type')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'title' => $_POST['title'],
    'link' => $_POST['link'],
    'intro' => $_POST['intro'],
    'author' => $_POST['author'],
    'time' => $_POST['time'],
    'type' => $_POST['type'],
    'image' => HttpUtils::getPostParam('image'),
    'creator_id' => $_SESSION['plat_id'],
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/CreateArticle.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
