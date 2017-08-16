<?php
/*
 * 接口功能：获取标签列表
 * 入参：
 * searchkey：搜索关键字
 * actor：角色[]
 * page_index：页数，从1开始
 * page_cap：每页容量
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 数组形式，成员结构：
 * platformor_fullname	姓名
 * platformor_sex		性别
 * platorg_name			单位名称
 * platdprt_nodename	部门名称
 * platact_name			角色
 * login_id				登陆ID
 * login_phone			登陆用户名
 * platform_id			用户ID
 * platformor_sn		工号
 * platformor_jobtitle	职位
 * platformor_email		邮箱
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
	'searchkey' => $_POST['searchkey']??'',	//检索字段 人员姓名，账号
	'actor' => $_POST['actor']??[],			//角色[]
	'operator' => $_SESSION['plat_id'],		//操作员
	'page_index' => $_POST['page_index']??1,//页面索引
	'page_cap' => $_POST['page_cap']??20	//每页记录数
);


$data = json_encode($data);

$url = Config::SERVER_IP . "/ListMembers.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>