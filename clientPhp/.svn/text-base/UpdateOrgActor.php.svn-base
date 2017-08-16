<?php
/*
 * 接口功能：编辑平台职位角色
 * 入参：
 * actid		角色ID
 * actorname	角色名称
 * actordesc	角色描述
 * actorpowers	角色权限数组，如：['1']
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
		'actorname' => $_POST['actorname'],			//角色名称
		'actordesc' => $_POST['actordesc']??'',		//角色描述
		'actorpowers' => $_POST['actorpowers'],		//角色权限[]
		'operator' => $_SESSION['plat_id'],			//操作员
		'actid' => $_POST['actid'],					//角色ID
		);

$data = json_encode($data);

	$url = Config::SERVER_IP . "/UpdateOrgActor.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>