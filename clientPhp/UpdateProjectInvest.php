<?php
/*
 * 接口功能：平台组织权限
 * 入参：
 * finilimt			拟融资额度
 * afinilimt		实际融资额度
 * offvalue			预计估值可谈空间
 * finshare			拟出让股份
 * afinshare		实际出让股份
 * finvalue			拟投后估值
 * afinvalue		实际投后估值
 * moneyuse			资金用途
 * 'investlist' => [ 投资信息列表数组
 * 	[
 * 		'investor' => '投资人',//投资人
 * 		'investorid' => '11',//投资人ID
 * 		'investorg' => '投资机构',//投资机构
 * 		'planmoney' => '5555',//投资额度
 * 		'actmoney' => '5555',//实际投资额度
 * 		'isleader' => 'Y',//是否领投
 * 		'progress' => '1',//投资进度
 * 	],
 * ]	投资信息列表
 * projectid		项目ID
 * operator			操作员
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
		'finilimt' => $_POST['finilimt']??'',//拟融资额度
		'afinilimt' =>  $_POST['afinilimt']??'',//实际融资额度
		'offvalue' =>  $_POST['offvalue']??'',//预计估值可谈空间
		'finshare' =>  $_POST['finshare']??'',//拟出让股份
		'afinshare' =>  $_POST['afinshare']??'',//实际出让股份
		'finvalue' =>  $_POST['finvalue']??'',//拟投后估值
		'afinvalue' =>  $_POST['afinvalue']??'',//实际投后估值
		'moneyuse' =>  $_POST['moneyuse']??'',//资金用途
		'investlist' =>  $_POST['investlist']??[],//投资信息列表数组
		//'investlist' => [
		//	[
		//		'investor' => '投资人',//投资人
		//		'investorid' => '11',//投资人ID
		//		'investorg' => '投资机构',//投资机构
		//		'planmoney' => '5555',//投资额度
		//		'isleader' => 'Y',//是否领投
		//		'progress' => '1',//投资进度
		//	],
		//],//投资信息列表
		'projectid' => $_POST['projectid'],//项目ID
		'operator' => $_SESSION['plat_id'],//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/UpdateProjectInvest.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>