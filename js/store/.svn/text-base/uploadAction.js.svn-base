/**
 * Created by Galaxy065 on 2017/6/7.
 */
import Utils from './utils';

let UploadAction = {
    importObjects: (object_type,import_type,file,callback,next) => {
        if(!Utils.checkNull(file,"请选择上传文件")){
            return false;
        }
        console.log(file);
        let formData = new FormData();//构造空对象，下面用append 方法赋值。
        formData.append("object_type", object_type);
        formData.append("import_type", import_type);
        formData.append("userfile", file);
        next();
        $.ajax({
            url: Utils.url + "ImportObjects.php",
            type: 'POST',
            dataType: 'JSON',
            data: formData,
            /**
             * 必须false才会避开jQuery对 formdata 的默认处理
             * XMLHttpRequest会对 formdata 进行正确的处理
             */
            processData: false,
            /**
             *必须false才会自动加上正确的Content-Type
             */
            contentType: false,
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }
            },
            error: function (responseStr) {
                console.log("失败:" + JSON.stringify(responseStr));
            }
        })
    }
};

module.exports = UploadAction;