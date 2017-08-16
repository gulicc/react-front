<?php
/*
 * 接口功能：查询融资项目列表
 * 入参：
 * projectid			项目id
 * newstatus			新状态
 * scheduleat			进展时间id
 * operator				操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
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
	'projectid' => $_POST['projectid']??'',//项目id
	'newstatus' => $_POST['newstatus']??'',//新状态
    'scheduleat' => $_POST['scheduleat']??'',//进展时间
	'operator' => $_SESSION['plat_id']//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/UpdateFinStatus.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>