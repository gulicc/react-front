<?php
/*
 * 接口功能：删除组织角色信息
 * 入参：
 * platformid		平台用户ID
 * platformdel		是否删除
 * platformdis		是否禁用
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
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
		'operator' => $_SESSION['plat_id'],		//操作员
		'platformdel' => $_POST['platformdel']??'',	//是否删除
		'platformdis' => $_POST['platformdis']??'',	//是否禁用
		'platformid' => $_POST['platformid']			//平台用户ID
	);


$data = json_encode($data);

$url = Config::SERVER_IP . "/DeleteOrgMember.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>