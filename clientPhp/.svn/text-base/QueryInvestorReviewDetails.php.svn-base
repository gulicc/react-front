<?php
/*
 * 接口功能：获取投资人审核详情
 * 入参：
 * id：认证记录ID
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
 * business_card：名片
 * age：年龄
 * field：领域
 * capital_size：股权投资资金量
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

if (!HttpUtils::verifyPostParams(
    'id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

$params = array(
    'id' => $_POST['id']
);

$json_params = json_encode($params);

$url = Config::SERVER_IP . '/QueryInvestorReviewDetails.php';

$res = HttpUtils::sendPost($url, $json_params, false, 'json', false);

echo $res;
