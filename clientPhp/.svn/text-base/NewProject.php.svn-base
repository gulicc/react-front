<?php
/*
 * 接口功能：查询融资项目列表
 * 入参：
 * $info = array(
	'pname' => '项目名称8',		//项目经理 备注
	'pnote' => '项目名称备注1',	//项目经理 备注
	'org_id' => 1,				//融资阶段/轮次
	'phase' => 1,				//融资阶段/轮次
	'industrys' => [1,2],		//领域
	'tags' => [['id'=>1,'name'=>'sss','desc'=>'bbbb'],['id'=>2,'name'=>'dddd','desc'=>'eeee']],//标签
	'operator' => '1',			//操作员
	);

 * $source = array(
	'psource' => '项目渠道',			// 项目渠道
	'recmndins' => '外部推荐机构',	// 外部推荐机构
	'recmndinsid' => '',			// 外部推荐机构id
	'recmnd' => '外部推荐人',		// 外部推荐人
	'interrecmnd' => '内部推荐人',	// 内部推荐人
	'interrecmndid' => 1,			//内部推荐人id
	'leader' => '项目经理名称',		//项目经理名称
	'leaderid' => 1,				//项目经理名称id
	'operator' => '1',				//操作员
	);

 * $money = array(
	'finilimt' => 9999,		// 拟融资额度
	'offvalue' => 8888,		// 项目经理 备注
	'finvalue' => 7777,		//融资阶段/轮次
	'operator' => '1',		//操作员
	);

 * $actor = array(
	'title' => '主题',		// 主题
	'stime' => '2017-01-01',// 开始时间
	'etime' => '2017-01-02',//结束时间
	'type' => 1,			//类型：单方拜访/投资人会议
	'way' => 1,				//方式：公司/外出/电话/微信
	'director' => 1,		//负责人
	'obj_investors' => [],	//活动对象：投资人
	'obj_projects' => [],	//活动对象：项目
	'obj_staffs' => [1],	//活动对象：公司人员
	'site' => '活动地点',	//活动地点
	'files' => [1],			//活动附件
	'record' => '活动记录',	//活动记录
	'remark' => '活动备注',	//活动备注
	'operator' => 1,		//操作员
	);

 * $score = array(
	'project_evallevel' => '1',			// 评定级别
	'project_evalphase' => '评定阶段',	// 评定阶段
	'project_score' => 3,				//融资评分
	'treat_id' => 4,					//处置安排
	'operator' => '1',					//操作员
	);

 * $attach = array(
	'files' => [
		['id' => 1,				// 文件ID
		'name' => '文件名称',	// 文件名称
		'path' => '/test/',		// 文件路径
		'desc' => '文件描述'],	// 文件描述
		['id' => 1,				// 文件ID
		'name' => '文件名称',	// 文件名称
		'path' => '/test/',		// 文件路径
		'desc' => '文件描述']	// 文件描述
	],// 文件
	'operator' => '1',			//操作员
	);
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * project_id			项目id
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
	'info' => $_POST['info']??[],		// 基本信息
	'source' => $_POST['source']??[],	// 项目来源
	'money' => $_POST['money']??[],		// 融资方案
	'actor' => $_POST['actor']??[],		// 活动记录
	'score' => $_POST['score']??[],		// 初步评定
	'attach' => $_POST['attach']??[],	// 附件
    'operator' => $_SESSION['plat_id'],//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/NewProject.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>