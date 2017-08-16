<?php
/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/2/10
 * Time: 10:54
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
require_once dirname(__FILE__).'/../libs/verifycode/ValidateCode.class.php';

if (!session_id()) session_start();

$vcObj = new ValidateCode();
$vcObj->doimg();

$_SESSION['imagecode'] = $vcObj->getCode();

ob_clean();
flush();

echo $vcObj->getimg();
