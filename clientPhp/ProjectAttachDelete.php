<?php
/*
 * 接口功能：查询我的融资项目列表
 * 入参：
 * attachid		附件ID
 * projectid		项目ID
 * operator		操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array(
	'operator' => $_SESSION['plat_id'],			//操作员
    'projectid' => $_POST['projectid'],//项目ID
    'attachid' => $_POST['attachid'],//附件ID
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/ProjectAttachDelete.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>