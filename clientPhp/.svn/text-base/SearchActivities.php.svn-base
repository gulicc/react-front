<?php
/*
 * 接口功能：搜索业务活动列表
 * 入参：
 * key：跟进人或拜访主题
 * start_time：开始时间
 * end_time：结束时间
 * type：活动类型：单方拜访/投资人会议
 * sort_col：排序列（暂时不用）
 * sort_order：升级或降序（暂时不用）
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * count：总记录条数
 * record结构如下：
 * id：活动ID
 * title：主题
 * start_time：起始时间
 * type：类型
 * director：负责人
 * way：形式
 * remark：备注
 * object：活动对象
 * files：附件
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'key' => HttpUtils::getPostParam('key'),
    'start_time' => HttpUtils::getPostParam('start_time'),
    'end_time' => HttpUtils::getPostParam('end_time'),
    'type' => HttpUtils::getPostParam('type'),
    'sort_col' => HttpUtils::getPostParam('sort_col'),
    'sort_order' => HttpUtils::getPostParam('sort_order', 'DESC'),
    'page_index' => HttpUtils::getPostParam('page_index', 1),
    'page_cap' => HttpUtils::getPostParam('page_cap', 20)
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/SearchActivities.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
