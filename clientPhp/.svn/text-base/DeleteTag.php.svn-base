<?php
/*
 * 接口功能：删除标签
 * 入参：
 * tagid		标签ID
 * operator		操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx]：
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
	'plat_id',
	'plat_name')) {
		echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
		exit(0);
	}

$data = array(
		'operator' =>  $_SESSION['plat_id'],		//操作员
	'tagid' => $_POST['tagid']				//标签ID
	);


$data = json_encode($data);

$url = Config::SERVER_IP ."/DeleteTag.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>