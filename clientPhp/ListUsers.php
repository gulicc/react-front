<?php
/*
 * 接口功能：平台组织权限
 * 入参：
 * searchkey	检索字段
 * frole		大角色
 * isdiabled	是否禁用
 * page_index	分页索引
 * page_cap		分页条目
 * operator		操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * login_id			登陆ID
 * login_rrolename	大角色
 * login_phone		电话
 * login_isdisabled	是否禁用
 * login_createat	创建日期
 * login_createsrc	来源
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
		'searchkey' => $_POST['searchkey']??'',		//检索字段
		'frole' => $_POST['frole']??'0',			//大角色
		'isdiabled' => $_POST['isdiabled']??'0',	//是否禁用
		'page_index' => $_POST['page_index'],		//分页索引
		'page_cap' => $_POST['page_cap'],			//分页条目
		'operator' => $_SESSION['plat_id'],			//操作员
		);

$data = json_encode($data);

	$url = Config::SERVER_IP . "/ListUsers.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>