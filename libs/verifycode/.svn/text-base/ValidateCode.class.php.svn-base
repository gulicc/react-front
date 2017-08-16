<?php

/**
 * Created by PhpStorm.
 * User: Administrator
 * Date: 2017/02/09
 * Time: 14:24
 */

class ValidateCode
{
    private $charset = 'abcdefghkmnprstuvwxyzABCDEFGHKMNPRSTUVWXYZ23456789';//随机因子
    private $code;//验证码
    private $codelen = 4;//验证码长度
    private $width = 160;//宽度
    private $height = 75;//高度
    private $img;//图形资源句柄
    private $font;//指定的字体
    private $fontsize = 25;//指定字体大小
    private $fontcolor;//指定字体颜色
    private $background = array('back11.png','back12.png','back13.png','back14.png','back15.png','back16.png','back17.png');
    private $fonts = array('DejaVuSans-Bold.ttf','Elephant.ttf','FreeMono.ttf','Garuda.ttf','times_new_yorker.ttf');
    private $colors = array(
        array('r'=>123,'g'=>0,'b'=>56),
        array('r'=>56,'g'=>40,'b'=>123),
        array('r'=>20,'g'=>169,'b'=>237),
        array('r'=>171,'g'=>16,'b'=>89)
    );

    //生成随机码
    private function createCode()
    {
        $len = strlen($this->charset) - 1;
        for ($i=0; $i<$this->codelen; $i++) {
            $this->code .= $this->charset[mt_rand(0,$len)];
        }
    }

    //生成背景
    private function createBg()
    {
        $length = count($this->background) - 1;
        $num = mt_rand(0,$length);
        $pic = $this->background[$num];
        $this->img = imagecreatefrompng(dirname(__FILE__).'/backgrounds/'.$pic);
    }

    //生成文字
    private function createFont()
    {
        $x = $this->width / $this->codelen;
        $co = mt_rand(0,3);
        for ($i=0; $i<$this->codelen; $i++) {
            $fontsize = count($this->fonts) - 1;
            $fontname = mt_rand(0,$fontsize);
            $this->font = dirname(__FILE__).'/fonts/'.$this->fonts[$fontname];
            $this->fontcolor = imagecolorallocate($this->img,$this->colors[$co]['r'],$this->colors[$co]['g'],$this->colors[$co]['b']);
            imagettftext($this->img,$this->fontsize,mt_rand(-30,45),$x*$i+mt_rand(1,6),$this->height/1.5,$this->fontcolor,$this->font,$this->code[$i]);
        }
    }

    //对外生成
    public function doimg()
    {
        $this->createBg();
        $this->createCode();
        $this->createFont();
    }

    public function getimg()
    {
        return imagepng($this->img);
    }

    //获取验证码
    public function getCode()
    {
        return strtolower($this->code);
    }
}
