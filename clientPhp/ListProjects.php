<?php
/*
 * 接口功能：查询融资项目列表
 * 入参：
 * searchkey		项目名称 项目经理 备注
 * industrys		领域 数组[]
 * fphases			融资阶段/轮次 数组[]
 * treats			工作状态 数组[]
 * firstevals		评级 数组[]
 * tags				标签 数组[]
 * operator			操作员
 * page_index		页面索引
 * page_cap			每页记录数
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * project_name			项目名称
 * fphase_name			融资阶段/轮次
 * project_leader		项目经理
 * project_finilimt		拟融资额度
 * project_afinilimt	实际融资额度
 * treat_name			项目工作状态
 * project_evalphase	评定阶段
 * project_evallevel	评定级别
 * createat				创建日期
 * fstatus_name			项目进度
 * fstatus_id           项目进度id
 * industrys            获取领域
 * industrysid          获取领域id[]
 * project_note			备注
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';

HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
	'plat_id',
	'plat_name')) {
		echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
		exit(0);
	}

	if (!HttpUtils::verifyPostParams(
			'page_index',
			'page_cap'
        )) {
		echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
		exit(0);
	}

	$data = array(
		'searchkey' => $_POST['searchkey']??'',	//项目名称 项目经理 备注
		'industrys' => $_POST['industrys']??[],	//领域
		'fphases' => $_POST['fphases']??[],		//融资阶段/轮次
		'treats' => $_POST['treats']??[],		//工作状态
		'firstevals' => $_POST['firstevals']??[],//评级
		'tags' => $_POST['tags']??[],			//标签
        'operator' => $_SESSION['plat_id'],			//操作员
		'page_index' => $_POST['page_index'],	//页面索引
		'page_cap' => $_POST['page_cap']		//每页记录数
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/ListProjects.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>