<?php
/*
 * 接口功能：查询融资项目列表
 * 入参：
 * searchkey		关键字
 * operator			操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 基本
 * project_name		项目名称
 * project_id		轮次ID
 * fphase_id		轮次ID
 * fphase_name		项目轮次
 * treat_id			工作状态ID
 * treat_name		工作状态
 * project_afinilimt	金额
 * project_finilimt		金额
 * project_leader		项目经理
 * project_leaderid		项目经理ID
 * 参与成员 team
 *		raid_role		团队角色
 *		platformor_fullname 姓名
 *		platformor_phone	手机
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
    'plat_id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
    exit(0);
}


$data = array(
	'searchkey' => $_POST['searchkey'],//关键字
	'operator' => $_SESSION['plat_id']	//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/QuickSearchProject.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>