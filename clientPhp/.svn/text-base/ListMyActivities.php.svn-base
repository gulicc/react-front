<?php
/*
 * 接口功能：查询我的融资项目列表
 * 入参：
 * page_index	分页索引
 * page_cap		分页容量
 * operator		操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * 基本
 * id：ID
 * title：主题
 * type：类型
 * object：对象
 * time：时间
 * way：形式
 * files：附件
 * role：我的角色
 */
require_once dirname(__FILE__) . '/../Utils/HttpUtils.php';
require_once dirname(__FILE__) . '/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array(
	'page_index' => $_POST['page_index'],		//分页索引
	'page_cap' => $_POST['page_cap'],			//分页容量
	'operator' => $_SESSION['plat_id'],			//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/ListMyActivities.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>