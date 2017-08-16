<?php
/*
 * 接口功能：合并标签
 * 入参：
 * tagids		标签ID[]多标签合并，如['21','22','23']
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
	'plat_id',
	'plat_name')) {
		echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
		exit(0);
	}

$data = array(
	'tagname' => $_POST['tagname']??'',		//标签名
	'tagdetail' => $_POST['tagdetail']??'',	//标签描述
	'tagtype' =>  $_POST['tagtype']??0,		//标签分类
		'operator' =>  $_SESSION['plat_id'],		//操作员
	'tagids' => $_POST['tagids']			//标签ID[]多标签合并，如['21','22','23']
	);


$data = json_encode($data);

$url = Config::SERVER_IP . "/MerageTag.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>