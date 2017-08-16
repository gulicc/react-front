<?php
/*
 * 接口功能：新建标签
 * 入参：
 * tagname		标签名
 * tagdetail	标签描述
 * tagtype		标签分类
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
	'sharetype' => $_POST['sharetype'],// 项目共享方式
	'shares' => $_POST['shares']??[],// 共享投资人
	'projectid' => $_POST['projectid'],//项目ID
	'operator' => $_SESSION['plat_id']//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP . "/UpdateProjectVisable.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>