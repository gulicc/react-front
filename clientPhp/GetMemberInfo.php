<?php
/*
 * 接口功能：更新成员
 * 入参：
 * platformid	用户ID
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * platformor_id
 * platformor_nickname
 * platformor_name
 * platformor_namepin
 * platformor_sname
 * platformor_snamepin
 * platformor_sex		性别
 * platformor_fullname	姓名
 * platformor_phone		手机
 * platformor_birth
 * createat
 * createby
 * modifyat
 * modifyby
 * platformor_sn		工号
 * platformor_jobtitle	职位
 * platformor_email		邮件
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
		'platformid' => $_POST['platformid'],//用户ID
);


$data = json_encode($data);

	$url = Config::SERVER_IP . "/GetMemberInfo.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>