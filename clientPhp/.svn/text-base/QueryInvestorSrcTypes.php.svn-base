<?php
/*
 * 接口功能：查询投资人(机构)来源列表
 * 入参：
 * 无
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组结构，成员列表结构：
 * id：类型ID
 * name：类型名称
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$url = Config::SERVER_IP . '/QueryInvestorSrcTypes.php';

$res = HttpUtils::sendPost($url, NULL, false, 'json', false);

echo $res;
