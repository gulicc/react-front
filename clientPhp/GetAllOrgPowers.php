<?php
/*
 * 接口功能：平台组织权限
 * 入参：
 * orgid		单位iID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * platpower_id 权限ID
 * platpower_name 权限名称
 * platpower_desc 权限描述
 * platpower_catlog 权限分类
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
	'plat_id')) {
		echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
		exit(0);
	}

	$data = array(
		'operator' => $_SESSION['plat_id'],//操作员
		'orgid' => $_SESSION['platorg_id'],//单位ID
		);


$data = json_encode($data);

	$url = Config::SERVER_IP . "/GetAllOrgPowers.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>