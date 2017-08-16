/**
 * Created by Galaxy065 on 2017/5/11.
 */
import Utils from './utils'

let ManageAction = {
    queryAccountType: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryAccountType.php",
            type: "post",
            dataType: 'JSON',
            data: {
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    login: (phoneNumber,password,validate,callback) => {
        $.ajax({
            url: Utils.url + "Login.php",
            type: "post",
            dataType: 'JSON',
            data: {
                userName: phoneNumber,
                passWord: password,
                validate: validate
            },
            success: function(data) {
                if(data.status_code === 9000){
                    callback(data.data);
                }else{
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                    return false;
                }
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },
    logout: () => {
        $.ajax({
            url: Utils.url + "Logout.php",
            type: "post",
            dataType: 'JSON',
        });
    },
    getImageValidate: (callback) => {
        $.ajax({
            url: Utils.url + "GetVerificationImage.php",
            type: "post",
            dataType: "html",
            success: function(data) {
                callback(data);
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },

    //判断登录状态
    checkLoginStatus: (callback)=>{
        $.ajax({
            url: Utils.url + "CheckLoginStatus.php",
            type: "post",
            dataType: "JSON",
            success: function(data) {
                callback(data.status_code);
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },

    //根据token重新登录
    loginWithToken: (username,token,callback)=>{
        $.ajax({
            url: Utils.url + "LoginWithToken.php",
            type: "post",
            dataType: "JSON",
            data: {
                userName: username,
                token: token
            },
            success: function(data) {
                callback(data);
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },

    getMemberInfo: (callback) => {
        $.ajax({
            url: Utils.url + "GetMemberInfo.php",
            type: "post",
            dataType: "JSON",
            data: {
                platformid: Utils.getLoginData().platform_id
            },
            success: function(data) {
                if(data.status_code === 9000){
                    callback(data.data);
                }
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },
    updateMemberInfo: (mobile,email,callback) => {
        $.ajax({
            url: Utils.url + "UpdateMemberInfo.php",
            type: "post",
            dataType: "JSON",
            data: {
                mbphone: mobile,
                mbemail: email,
                platformid: Utils.getLoginData().platform_id
            },
            success: function(data) {
                if(data.status_code === 9000){
                    callback(data.data);
                }else{
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                    return false;
                }
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },
    changePassword: (oldPassword,newPassword,callback) => {
        $.ajax({
            url: Utils.url + "ChangePassword.php",
            type: "post",
            dataType: "JSON",
            data: {
                userName: Utils.getLoginData().login_phone,
                oldPassword: oldPassword,
                newPassword: newPassword
            },
            success: function(data) {
                layer.open({
                    content: data.status_txt,
                    skin: 'msg',
                    style: 'bottom:0;',
                    time: 3
                });
                if(data.status_code === 9000){
                    callback(data.data);
                }
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },
    checkExist: (mobile,callback) => {
        $.ajax({
            url: Utils.url + "CheckExist.php",
            type: "post",
            dataType: "JSON",
            data: {
                phone: mobile
            },
            success: function(data) {
                callback(data);
            },
            error: function(data) {
                console.log("web false");
            }
        });
    },

    //�г�ע���û��б�
    listUsers: (state,callback) => {
        $.ajax({
            url: Utils.url + "ListUsers.php",
            type: "post",
            dataType: 'JSON',
            data: {
                searchkey: state.searchkey,     //�����ֶ�
                frole: state.frole,             //���ɫ
                isdiabled: state.isdiabled,     //�Ƿ����
                page_index: state.page_index,   //��ҳ����
                page_cap: state.page_cap,       //��ҳ��Ŀ
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data.total,data.data.table);
                }else{
                    callback(0,[]);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },

    //����/ʹ���û�
    disableUser: (isdiabled,id,callback) => {
        $.ajax({
            url: Utils.url + "DisableUser.php",
            type: "post",
            dataType: 'JSON',
            data: {
                isdiabled: isdiabled, //�Ƿ����
                targetid: id,   //Ŀ���û�ƽ̨ID
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },

    //resetPassword
    resetPassword: (id,callback) => {
        $.ajax({
            url: Utils.url + "ResetPassword2.php",
            type: "post",
            dataType: 'JSON',
            data: {
                loginid: id
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    layer.open({
                        content: "重置密码成功",
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                    callback(data.data);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },

    //resetPassword2
    resetPassword2: (state,callback) => {
        $.ajax({
            url: Utils.url + "ResetPassword2.php",
            type: "post",
            dataType: 'JSON',
            data: {
                loginid: state.loginid,	//登陆ID
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },

    //找回密码-发送短信验证码
    getVerifyCode: (userName,callback) => {
        if(!Utils.checkMobile(userName)){
            return false;
        }
        $.ajax({
            url: Utils.url + "GetVerifyCode.php",
            type: "post",
            dataType: 'JSON',
            data: {
                userName: userName,	//登陆ID
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                }else{
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                    return false;
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },

    //找回密码
    forgotPassword: (state,callback) => {
        $.ajax({
            url: Utils.url + "ForgotPassword.php",
            type: "post",
            dataType: 'JSON',
            data: {
                userName: state.mobile,
                code: state.validate,
                oldPassword: state.newPassword,
                newPassword: state.checkPassword,
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
};

module.exports = ManageAction;