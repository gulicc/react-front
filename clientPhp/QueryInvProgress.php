<?php
/*
 * �ӿڹ��ܣ�Ͷ���������
 * ��Σ�
 * ����ֵ��
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]������data��ʽ���£�
 * progname		Ͷ�������������
 * id			Ͷ���������ID
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
HttpUtils::checkUserPermissions([]);

$data = array();

$data = json_encode($data);

$url = Config::SERVER_IP."/QueryInvProgress.php";

$res = HttpUtils::sendPost($url,$data,false,'json',false);

echo $res;



?>