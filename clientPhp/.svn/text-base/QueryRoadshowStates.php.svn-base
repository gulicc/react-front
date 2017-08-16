<?php
/*
 * 接口功能：查询路演活动状态枚举
 * 入参：
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * id：状态ID
 * name：状态名称
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$url = Config::SERVER_IP . '/QueryRoadshowStates.php';

$res = HttpUtils::sendPost($url, [], false, 'json', false);

echo $res;
