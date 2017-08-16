<?php
/*
 * 接口功能：搜索投资人认证列表
 * 入参：
 * keyword：搜索关键字（手机或姓名）
 * is_org：类型（Y：机构，N：个人）
 * is_reviewed：审核状态（Y：已审核，N：待审核）
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * count：总记录条数
 * record结构如下：
 * id：申请记录ID
 * mobile：手机
 * is_org：机构：Y，个人：N
 * name：姓名
 * company：机构名称
 * job：职位名称
 * apply_time：申请时间
 * apply_src：申请渠道
 * review_time：审核时间
 * reviewer：审核人
 * review_result：审核结果
 * review_remark：审核备注
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$params = array(
    'keyword' => HttpUtils::getPostParam('keyword'),
    'is_org' => HttpUtils::getPostParam('is_org'),
    'is_reviewed' => HttpUtils::getPostParam('is_reviewed'),
    'page_index' => HttpUtils::getPostParam('page_index', 1),
    'page_cap' => HttpUtils::getPostParam('page_cap', 200),
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/QueryInvestorReviewList.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
