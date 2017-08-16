<?php
/**
'files' => [
['id' => 1,// 文件ID
'typeid' => '附件分类',// 文件描述
'desc' => '文件描述'],// 文件描述
['id' => 1,// 文件ID
'desc' => '文件描述']// 文件描述
],// 文件
'projectid' => '8',//项目ID
'operator' => '1',//操作员
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
	'files' => $_POST['files']??[],// 文件
	'projectid' => $_POST['projectid'],//项目ID
	'operator' => $_SESSION['plat_id'],//操作员
	);

$data = json_encode($data);

$url = Config::SERVER_IP."/ProjectAttachData.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>