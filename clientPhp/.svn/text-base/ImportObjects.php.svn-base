<?php
/*
 * 接口功能：导入文件创建项目/投资人/投资机构
 * 入参：
 * userfile：上传文件
 * object_type：实体类型（1：项目，2：投资人，3：投资机构）
 * import_type：操作类型（1：重复数据覆盖导入，2：重复数据不导入，3：不导入新数据，仅覆盖重复数据，4：全部增量导入）
 * 返回值：
 * ['status_code'=>xx, 'status_txt'=>xx, 'data'=>xx]，其中data格式如下：
 * 实体ID列表，数组形式，成员为实体ID
 *
 */
require_once dirname(__FILE__).'/../Utils/HttpUtils.php';
require_once dirname(__FILE__).'/../Config_front.php';
HttpUtils::checkUserPermissions([]);

if (!HttpUtils::verifySessionParams(
    'plat_id')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'SESSION参数异常']);
    exit(0);
}

if (!HttpUtils::verifyPostParams(
    'object_type',
    'import_type')) {
    echo json_encode(['status_code'=>9018, 'status_txt'=>'POST参数异常']);
    exit(0);
}

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
            //保存导入文件的file信息
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

            //导入数据
            $params = array(
                'object_type' => $_POST['object_type'],
                'import_type' => $_POST['import_type'],
                'file_id' => $f_id,
                'creator_id' => $_SESSION['plat_id']
            );
            $json_params = json_encode($params);
            $url = Config::SERVER_IP . '/ImportObjects.php';
            $json_res = HttpUtils::sendPost($url, $json_params, false, 'json', false);
            $res = json_decode($json_res, true);
            if ($res['status_code'] != 9000) {
                echo $json_res;
                exit(0);
            }
        }
    } else {
        echo json_encode(array('status_code'=>9015, 'status_txt'=>'上传出错', 'data'=>''));
        exit(0);
    }
}

unset($_FILES['userfile']);

echo $json_res;



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
