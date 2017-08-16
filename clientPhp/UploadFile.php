<?php
/*
 * 接口功能：上传文件
 * 入参：
 * type：文件类别
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 文件ID列表，数组形式，成员为文件ID
 *
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';

if (isset($_FILES['userfile'])) {
    $file = $_FILES['userfile'];
    if ($file['error'] == 0) {
        $n_id = get_new_file_id();//文件表新ID

        $tmp_arr = explode('.', $file['name']);
        $ext = end($tmp_arr);//文件后缀
        $new_name = 'F' . sprintf('%08d', $n_id) . md5(time()) . '.' . $ext;

        $tmp_path = Config::UPLOADS_BASE_PATH . '/tmp/';
        if (!file_exists($tmp_path)) {
            mkdir($tmp_path, 0777, true);
        }
        $abs_path = $tmp_path . $new_name;
        $rel_path = 'tmp/' . $new_name;

        //移动文件
        if (move_uploaded_file($file['tmp_name'], $abs_path)) {
            //更新数据库
            $params = array(
                'path' => $rel_path,
                'name' => $file['name']
            );
            $json_params = json_encode($params);
            $url = Config::SERVER_IP . '/AddNewFile.php';
            $json_res = HttpUtils::sendPost($url, $json_params, false, 'json', false);
            $res = json_decode($json_res, true);
            if ($res['status_code'] != 9000) {
                echo $json_res;
                exit(0);
            }
            $f_id = $res['data'];
        }
    } else {
        echo json_encode(array('status_code'=>9015, 'status_txt'=>'上传出错', 'data'=>''));
        exit(0);
    }
}

unset($_FILES['userfile']);

echo json_encode(array('status_code'=>9000, 'status_txt'=>'文件上传成功', 'data'=>
    [
        'id'=>$f_id,
        'name'=>$file['name'],
        'path'=>Config::UPLOADS_HOST . '/' . $rel_path
    ]));


//查询文件ID
function get_new_file_id() {

    $url = Config::SERVER_IP . '/GetNewFileId.php';
    $json_res = HttpUtils::sendPost($url, NULL, false, 'json', false);
    $res = json_decode($json_res, true);
    if ($res['status_code'] != 9000) {
        return 0;
    }
    return $res['data'];
}
