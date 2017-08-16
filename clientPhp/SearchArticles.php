<?php
/*
 * 接口功能：搜索文章列表
 * 入参：
 * keyword：搜索关键字
 * type：类别
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * count：总记录条数
 * record结构如下：
 * id：文章ID
 * title：标题
 * link：链接
 * intro：简介
 * author：作者
 * time：显示时间
 * type：类型
 * createtime：创建时间
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'keyword' => HttpUtils::getPostParam('keyword'),
    'type' => HttpUtils::getPostParam('type'),
    'page_index' => HttpUtils::getPostParam('page_index', 1),
    'page_cap' => HttpUtils::getPostParam('page_cap', 200),
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchArticles.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
