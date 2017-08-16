<?php
/*
 * 接口功能：查询融资项目列表
 * 入参：
 * projectid		项目ID
 * operator			操作员
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 基本
 * project_name			项目名称
 * fphase_name			项目轮次
 * treat_name			工作状态 
 * orginfo_id			工作状态 
 * orginfo_name			主体名称 
 * project_note			备注
 * 来源
 * project_source		渠道
 * project_recmnd_ins	外部推荐机构
 * project_recmnd_insid	外部推荐机构ID
 * project_recmnd		外部推荐人
 * project_interrecmnd	内部推荐人
 * project_interrecmndid	内部推荐人ID
 * project_leader		项目经理
 * project_leaderid		渠道
 * createby				录入人					
 * 评定
 * project_leader		问卷得分
 * project_finilimt		录入人建议
 * project_afinilimt	评级(初评)					
 * project_advantage	项目亮点					
 * project_industryany	行业分析					
 * project_operation	运营／财务数据					
 * project_moneyuse		资金用途
 * 行业领域 industry
 *		industry_id		领域ID
 *		industry_name	领域名称
 * 项目标签 tags
 *		tag_id			标签ID
 *		tagusage_name	标签名称
 *		tagusage_desc	标签描述
 * 项目进度 schedule
 *		prjschedule_at	进度时间节点
 *		fstatus_name	进度状态
 * 参与成员 team
 *		raid_role		团队角色
 *		platformor_fullname 姓名
 *		platformor_phone	手机
 * 项目可见性 share
 *		projectshare_id 项目共享ID
 *		invest_personname 投资人/联系人名称
 *		invest_orgname 投资机构名
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
	'projectid' => $_POST['projectid'],	//项目ID
    'operator' => $_SESSION['plat_id']	//操作员
	);


$data = json_encode($data);

$url = Config::SERVER_IP."/GetProjectInfo.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>