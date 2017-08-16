import Utils from './utils';

let PlatformAction = {
    //查询登陆用户管理的企业用户列表
    listMembers: (state,callback) => {
        $.ajax({
            url: Utils.url + "ListMembers.php",
            type: "post",
            dataType: 'JSON',
            data: {
                searchkey: state.searchkey,     //检索字段 人员姓名，账号
                actor: state.actor,             //角色[]
                page_index: state.page_index,   //页面索引
                page_cap: state.page_cap        //每页记录数
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
    //根据平台新用户信息
    newMemberInfo: (state,callback) => {
        if(!Utils.checkNull(state.mbname,"请填写用户姓名")){
            return false;
        }
        if(!Utils.checkNull(state.mbrole,"请为添加员工分配角色")){
            return false;
        }
        if(!Utils.checkMobile(state.mbphone)){
            return false;
        }
        if(!Utils.checkEmail(state.mbemail)){
            return false;
        }
        $.ajax({
            url: Utils.url + "NewMemberInfo.php",
            type: "post",
            dataType: 'JSON',
            data: {
                mbname: state.mbname,       //姓名
                mbsex: state.mbsex,         //性别
                mborg: state.mborg,         //单位
                mbdep: state.mbdep,         //部门
                mbdepid: state.mbdepid,     //部门ID
                mbrole: state.mbrole,       //部门角色
                mbphone: state.mbphone,     //手机
                mbsn: state.mbsn,           //员工号
                mbjobtitle: state.mbjobtitle,       //职位
                mbemail: state.mbemail,     //邮箱
            },
            success: function (data) {
                if (data.status_code === 9000) {
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
            error: function (data) {
                console.log("web false");
            }
        });
    },
    //更新成员
    updateMemberInfo: (state,callback) => {
        if(!Utils.checkNull(state.mbname,"请填写用户姓名")){
            return false;
        }
        if(!Utils.checkNull(state.mbrole,"请为添加员工分配角色")){
            return false;
        }
        if(!Utils.checkMobile(state.mbphone)){
            return false;
        }
        if(!Utils.checkEmail(state.mbemail)){
            return false;
        }
        $.ajax({
            url: Utils.url + "UpdateMemberInfo.php",
            type: "post",
            dataType: 'JSON',
            data: {
                mbname: state.mbname,       //姓名
                mbsex: state.mbsex,         //性别
                mborg: state.mborg,         //单位
                mbdep: state.mbdep,         //部门
                mbdepid: state.mbdepid,     //部门ID
                mbrole: state.mbrole,       //部门角色
                mbphone: state.mbphone,     //部门
                platformid: state.platformid,     //用户ID
                mbsn: state.mbsn,           //员工号
                mbjobtitle: state.mbjobtitle,       //职位
                mbemail: state.mbemail,     //邮箱
            },
            success: function (data) {
                if (data.status_code === 9000) {
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
            error: function (data) {
                console.log("web false");
            }
        });
    },
    //删除指定的企业成员
    getMemberInfo: (id,callback) => {
        $.ajax({
            url: Utils.url + "GetMemberInfo.php",
            type: "post",
            dataType: 'JSON',
            data: {
                platformid: id             //用户ID
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
    //根据权限确认是本企业还是全部企业
    getOrgList: (callback) => {
        $.ajax({
            url: Utils.url + "GetOrgList.php",
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
    },
    //查询组织部门信息
    getAllOrgDeparts: (state,callback) => {
        $.ajax({
            url: Utils.url + "GetAllOrgDeparts.php",
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
    //查询组织角色信息
    getAllOrgActors: (callback) => {
        $.ajax({
            url: Utils.url + "GetAllOrgActors.php",
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
    },
    //删除组织角色信息
    deleteOrgActors: (id,callback) => {
        $.ajax({
            url: Utils.url + "DeleteOrgActors.php",
            type: "post",
            dataType: 'JSON',
            data: {
                actid: id,  //角色ID
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
    //删除指定的企业成员
    deleteOrgMember: (id,state,callback) => {
        $.ajax({
            url: Utils.url + "DeleteOrgMember.php",
            type: "post",
            dataType: 'JSON',
            data: {
                platformid: id,  //平台用户ID
                platformdel: state.platformdel,  //是否删除
                platformdis: state.platformdis,  //是否禁用
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
    //查询组织角色列表
    getOrgActorList: (callback) => {
        $.ajax({
            url: Utils.url + "GetOrgActorList.php",
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
    },
    //平台组织权限
    getAllOrgPowers: (callback) => {
        $.ajax({
            url: Utils.url + "GetAllOrgPowers.php",
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
    },
    //新平台职位角色
    createOrgActor: (state,callback) => {
        $.ajax({
            url: Utils.url + "CreateOrgActor.php",
            type: "post",
            dataType: 'JSON',
            data: {
                actorname: state.actorname,         //角色名称
                actordesc: state.actordesc,         //角色描述
                actorpowers: state.actorpowers,     //角色权限[]
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
    //编辑平台职位角色
    updateOrgActor: (state,callback) => {
        $.ajax({
            url: Utils.url + "UpdateOrgActor.php",
            type: "post",
            dataType: 'JSON',
            data: {
                actorname: state.actorname,         //角色名称
                actordesc: state.actordesc,         //角色描述
                actorpowers: state.actorpowers,     //角色权限[]
                actid: state.actid,                 //角色ID
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
    //模糊搜索员工姓名
    searchStaffNames: (state,callback) => {
        $.ajax({
            url: Utils.url + "SearchStaffNames.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: state.name,  //搜素员工名
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

module.exports = PlatformAction;