import Utils from './utils';

let ActivityAction = {
    //添加业务活动
    createActivity: (state,callback,errorCallback) => {
        if(state.files === "loading"){
            layer.open({
                content: "请等待附件上传完成",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.title,"请填写活动主题")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.stime,"请选择活动时间")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.type,"请选择活动类型")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.way,"请选择活动方式")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.record,"请填写会议纪要")){
            errorCallback();
            return false;
        }
        $.ajax({
            url: Utils.url + "CreateActivity.php",
            type: "post",
            dataType: 'JSON',
            data: {
                title: state.title,//活动主题
                stime: state.stime,//活动起始时间
                etime: state.stime,//活动结束时间
                type: state.type,//活动类型
                way: state.way,//活动方式
                director: state.director,//活动负责人ID
                record: state.record,//活动纪要
                obj_investors: state.obj_investors,//投资人列表
                obj_projects: state.obj_projects,//项目列表
                obj_staffs: state.obj_staffs,//员工列表
                files: state.files,//活动附件
                site: state.site,//活动地点
                remark: state.remark//活动备注
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }else if(data.status_code < 9000){
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                    errorCallback();
                }else{
                    layer.open({
                        content: "未知错误",
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                    errorCallback();
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    //删除业务活动
    removeActivity: (id,callback) => {
        $.ajax({
            url: Utils.url + "RemoveActivity.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: id//活动ID
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
    //搜索业务活动
    searchActivities: (state,callback) => {
        $.ajax({
            url: Utils.url + "SearchActivities.php",
            type: "post",
            dataType: 'JSON',
            data: {
                key: state.key,//跟进人或拜访主题
                start_time: state.start_time,//开始时间
                end_time: state.end_time,//结束时间
                type: state.type,//活动类型
                sort_col: state.sort_col,//排序列（暂时不用）
                sort_order: state.sort_order,//升级或降序（暂时不用）
                page_index: state.page_index,//页数，从1开始
                page_cap: state.page_cap//每页容量
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data.count,data.data.records);
                }else{
                    callback(0,[]);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    //查询业务活动搜索关键字
    searchActivityKeywords: (state,callback) => {
        $.ajax({
            url: Utils.url + "SearchActivityKeywords.php",
            type: "post",
            dataType: 'JSON',
            data: {
                key: state.key//跟进人姓名或活动主题
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
    //根据id获取业务活动信息详情
    queryActivity: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryActivity.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id
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

    //业务人员首页-与我相关的业务活动
    listMyActivities: (state,callback)=>{
        $.ajax({
            url: Utils.url + "ListMyActivities.php",
            type: "post",
            dataType: 'JSON',
            data: {
                page_index:state.page_index,    //分页索引
                page_cap:state.page_cap        //分页容量
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data.count,data.data.records);
                }else{
                    callback(0,[]);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    }
};

module.exports = ActivityAction;