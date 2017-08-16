<?php
/*
 * 接口功能：尽调报告投资人分享
 * 入参：
 * objInvestors		目标投资人[]
 * projectid	项目ID
 * operator		操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx]：
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
	'powers' => ['secreport','bp'],// 权限
	'objinvs' => $_POST['objInvestors'],// 目标投资人[]
	'projectid' => $_POST['projectid'],//项目ID
	'operator' => $_SESSION['plat_id']//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP . "/ShareInvestProjectAccess.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;

