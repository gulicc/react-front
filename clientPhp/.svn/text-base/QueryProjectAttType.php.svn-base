<?php
/*
 * 接口功能：项目附件分类
 * 入参：
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * prjatt_id id
 * prjatt_name 名称
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array();

$data = json_encode($data);

$url = Config::SERVER_IP . "/QueryProjectAttType.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>