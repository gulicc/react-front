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
 * id	投资人id
 * name	姓名
 * auth_type	认证类型
 * invest_type	投资人类型
 * fields	关注领域[]
 * rounds	关注阶段[]
 * phone	电话
 * contactwith_name	关联人ID
 * contactwith_typename	关联人分类
 * creator	录入人
 * source	渠道来源
 * remark	备注
 * tags	标签[]
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

$url = Config::SERVER_IP."/ListMyInvestors.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>