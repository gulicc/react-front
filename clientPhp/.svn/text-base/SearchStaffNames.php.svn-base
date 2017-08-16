<?php
/*
 * 接口功能：模糊搜索员工姓名
 * 入参：
 * name		员工名
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * id：员工ID
 * staff_name：员工姓名
 * org_name：公司名称
 * dep_name：部门名称
 * gender：性别
 * job：岗位
 * phone：手机号
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
		'name' => $_POST['name']??'',	//搜素员工名
		);

	$data = json_encode($data);

	$url = Config::SERVER_IP . "/SearchStaffNames.php";

	$res = HttpUtils::sendPost($url,$data,false,'json',false);

	echo $res;
