<?php
/**
 * Created by Hongliang Zhang.
 * User: Hongliang Zhang.
 * Date: 2016/8/24
 * Time: 10:48
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
HttpUtils::checkUserPermissions([]);


$data = array(
	'operator' => '1',//角色
	'orgid' => '1'//角色
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/GetAllOrgActors.php";
echo $url;

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>