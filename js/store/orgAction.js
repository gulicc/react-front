/**
 * Created by Galaxy065 on 2017/5/18.
 */
import Utils from './utils';

let OrgAction = {
    //添加投资机构
    createInvestOrg: (state,callback,errorCallback) => {
        if(!Utils.checkNull(state.name,"请填写投资机构名称")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.name_abbr,"请填写投资机构简称")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.type,"请选择机构类型")){
            errorCallback();
            return false;
        }
        $.ajax({
            url: Utils.url + "CreateInvestOrg.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: state.name,
                is_galaxy: state.is_galaxy,
                name_abbr: state.name_abbr,
                type: state.type,
                address: state.address,
                web: state.web,
                fund_size: state.fund_size,
                staff_size: state.staff_size,
                pref_fields: state.pref_fields,
                pref_phases: state.pref_phases,
                intro: state.intro,
                tags: state.tags,
                team: state.team
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
    //搜索投资机构
    searchInvestOrgs: (state,callback) => {
        $.ajax({
            url: Utils.url + "SearchInvestOrgs.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: state.name,
                scale: state.scale,
                fields: state.fields,
                tags: state.tags,
                page_index: state.page_index,
                page_cap: state.page_cap
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
    //删除投资机构
    deleteInvestOrg: (state,callback) => {
        $.ajax({
            url: Utils.url + "DeleteInvestOrg.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id//投资机构ID
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
    //编辑投资机构
    editInvestOrg: (state,callback) => {
        if(!Utils.checkNull(state.name,"请填写投资机构名称")){
            return false;
        }
        if(!Utils.checkNull(state.name_abbr,"请填写投资机构简称")){
            return false;
        }
        if(!Utils.checkNull(state.type,"请选择机构类型")){
            return false;
        }
        $.ajax({
            url: Utils.url + "EditInvestOrg.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id,//投资机构ID
                name: state.name,//机构名称
                is_galaxy: state.is_galaxy,
                name_abbr: state.name_abbr,//机构简称
                type: state.type,//机构类型ID
                address: state.address,//公司地址
                web: state.web,//主页
                fund_size: state.fund_size,//资金规模
                staff_size: state.staff_size,//人数
                pref_fields: state.pref_fields,//关注领域
                pref_phases: state.pref_phases,//关注阶段
                intro: state.intro,//简介
                tags: state.tags,//标签
                team: state.team,//团队成员
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
    //查询投资机构
    queryInvestOrg: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryInvestOrg.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id//投资机构ID
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
    }
};

module.exports = OrgAction;