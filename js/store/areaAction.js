/**
 * Created by Galaxy065 on 2017/5/26.
 */
import Utils from './utils';

let AreaAction = {
    listLocAllProvinces: (callback) => {
        $.ajax({
            url: Utils.url + "ListLocAllProvinces.php",
            type: "post",
            dataType: 'JSON',
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    }
};

module.exports = AreaAction;