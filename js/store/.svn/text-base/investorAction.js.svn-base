/**
 * Created by Galaxy065 on 2017/5/18.
 */
import Utils from './utils';

let InvestorAction = {
    createInvestor: (state,callback,errorCallback) => {
        if(state.act_files === "loading"){
            layer.open({
                content: "请等待附件上传完成",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.name,"请填写投资人姓名")){
            errorCallback();
            return false;
        }
        if(!Utils.checkMobile(state.mobile)){
            errorCallback();
            return false;
        }
        if(state.is_org === "Y"){
            if(!Utils.checkNull(state.org_id,"请填写投资机构名称")){
                errorCallback();
                return false;
            }
        }
        if(state.single_invest_size_min){
            if(!Utils.checkNull(state.single_invest_size_max,"请填写单笔投资规模上限")){
                errorCallback();
                return false;
            }
        }
        if(state.single_invest_size_max){
            if(!Utils.checkNull(state.single_invest_size_min,"请填写单笔投资规模下限")){
                errorCallback();
                return false;
            }
        }
        $.ajax({
            url: Utils.url + "CreateInvestor.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: state.name,
                name_en: state.name_en,
                sex: state.sex,
                invest_types: state.invest_types,
                is_org: state.is_org,
                org_id: state.is_org === "Y" ? state.org_id : "",
                org_name: state.is_org === "Y" ?  state.org_name : "",
                org_department: state.is_org === "Y" ?  state.org_department : "",
                org_job: state.is_org === "Y" ?  state.org_job : "",
                internal_power: state.is_org === "Y" ?  state.internal_power : "",
                preffered_fields: state.preffered_fields,
                preffered_rounds: state.preffered_rounds,
                head_portrait: state.head_portrait,
                mobile: state.mobile,
                email: state.email,
                wechat: state.wechat,
                qq: state.qq,
                birthday: state.birthday,
                address: state.address,
                introduction: state.introduction,
                act_time: state.act_time,
                act_way: state.act_way,
                act_director: state.act_director,
                act_site: state.act_site,
                act_content: state.act_content,
                act_remark: state.act_remark,
                act_files: state.act_files,
                has_connections: state.has_connections,
                customer_manager: state.customer_manager,
                remark: state.remark,
                tags: state.tags,
                is_online: state.is_online,
                source_type: state.source_type,
                plat_id: state.plat_id,
                plat_name: state.plat_name,
                single_invest_size_min: state.single_invest_size_min,
                single_invest_size_max: state.single_invest_size_max
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
    editInvestor: (state,callback) => {
        if(!Utils.checkNull(state.name,"请填写投资人姓名")){
            return false;
        }
        if(!Utils.checkMobile(state.mobile)){
            return false;
        }
        if(state.single_invest_size_min){
            if(!Utils.checkNull(state.single_invest_size_max,"请填写单笔投资规模上限")){
                errorCallback();
                return false;
            }
        }
        if(state.single_invest_size_max){
            if(!Utils.checkNull(state.single_invest_size_min,"请填写单笔投资规模下限")){
                errorCallback();
                return false;
            }
        }
        $.ajax({
            url: Utils.url + "EditInvestor.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id,
                name: state.name,
                name_en: state.name_en,
                sex: state.sex,
                invest_types: state.invest_types,
                is_org: state.is_org,
                org_id: state.org_id,
                org_name: state.org_name,
                org_department: state.org_department,
                org_job: state.org_job,
                internal_power: state.internal_power,
                preffered_fields: state.preffered_fields,
                preffered_rounds: state.preffered_rounds,
                head_portrait: state.head_portrait,
                mobile: state.mobile,
                email: state.email,
                wechat: state.wechat,
                qq: state.qq,
                birthday: state.birthday,
                address: state.address,
                introduction: state.introduction,
                act_time: state.act_time,
                act_way: state.act_way,
                act_director: state.act_director,
                act_site: state.act_site,
                act_content: state.act_content,
                act_remark: state.act_remark,
                act_files: state.act_files,
                has_connections: state.has_connections,
                customer_manager: state.customer_manager,
                remark: state.remark,
                tags: state.tags,
                is_online: state.is_online,
                source_type: state.source_type,
                plat_id: state.plat_id,
                plat_name: state.plat_name,
                single_invest_size_min: state.single_invest_size_min,
                single_invest_size_max: state.single_invest_size_max
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data.data);
                }else if(data.status_code < 9000) {
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    searchInvestors: (state,callback) => {
        $.ajax({
            url: Utils.url + "SearchInvestors.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: state.name,
                rounds: state.rounds,
                fields: state.fields,
                tags: state.tags,
                auth_type: state.auth_type,
                invest_types: state.invest_types,
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
    queryInvestor: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryInvestor.php",
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
    deleteInvestor: (id,callback) => {
        $.ajax({
            url: Utils.url + "DeleteInvestor.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: id
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

    //业务人员首页-与我相关的投资人
    listMyInvestors: (state,callback)=>{
        $.ajax({
            url: Utils.url + "ListMyInvestors.php",
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

module.exports = InvestorAction;