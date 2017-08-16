<?php
/*
 * 接口功能：平台组织权限
 * 入参：
 * projectid	项目ID
 * operator		操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * 基本
	 * project_finilimt		拟融资额度
	 * project_afinilimt	实际融资额度
	 * project_offvalue		预计估值可谈空间
	 * project_finshare		拟出让股份
	 * project_afinshare	实际出让股份
	 * project_finvalue		拟投后估值
	 * project_afinvalue	实际投后估值					
	 * project_moneyuse		资金用途
 * 行业领域 [investlist]
	 * invlist_investor		投资人
	 * investlist_id		主键
	 * invlist_investorid	投资人
	 * invlist_investorg	投资机构名称
	 * invlist_planmoney	投资金额
	 * invlist_isleader		投资金额
	 * fstatus_name			投资进度
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
	'projectid' => $_POST['projectid'],			//项目ID
	'operator' => $_SESSION['plat_id'],			//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/GetProjectInvest.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>