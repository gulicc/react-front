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
	'phone' => $_POST['phone']//$_POST['phone'], //电话号码
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/CheckExist.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>