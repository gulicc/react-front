<?php
/*
 * 接口功能：查询文章类型枚举
 * 入参：
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * id：类型ID
 * name：类型名称
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$url = Config::SERVER_IP . '/QueryArticleTypes.php';

$res = HttpUtils::sendPost($url, [], false, 'json', false);

echo $res;
