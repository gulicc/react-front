<?php
/*
 * 接口功能：更新成员
 * 入参：
 * mbname		姓名
 * mbsex		性别
 * mborg		单位
 * mbdep		部门
 * mbdepid		部门ID
 * mbrole		部门角色
 * platformid		用户ID
 * mbsn		员工号
 * mbjobtitle	职位
 * mbemail	邮箱
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
		'member' => array(
			'mbname' => $_POST['mbname']??'',	//姓名
			'mbsex' => $_POST['mbsex']??'',		//性别
			'mborg' => $_POST['mborg']??'',		//单位
			'mbdep' => $_POST['mbdep']??'',		//部门
			'mbdepid' => $_POST['mbdepid']??'',	//部门ID
			'mbrole' => $_POST['mbrole']??'',	//部门角色
			'mbphone' => $_POST['mbphone']??'',	//部门
			'mbsn' => $_POST['mbsn']??'',		//员工号
			'mbjobtitle' => $_POST['mbjobtitle']??'',	//职位
			'mbemail' => $_POST['mbemail']??'',	//邮箱
			),//检索字段 人员姓名，账号
		'platformid' => $_POST['platformid'],//用户ID
		'operator' => $_SESSION['plat_id'],//操作员
		);


$data = json_encode($data);

	$url = Config::SERVER_IP . "/UpdateMemberInfo.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>