import Utils from './utils';

let CompanyAction = {
    //添加企业
    createCompany: (state,callback,errorCallback) => {
        if(!Utils.checkNull(state.name,"请填写企业全称")){
            errorCallback();
            return false;
        }
        let scaleCount = 0;
        if(state.stock_struct && state.stock_struct.length){
            state.stock_struct.map((stock)=>{
                scaleCount += parseFloat(stock.scale);
            });
        }
        if(scaleCount > 100){
            errorCallback();
            layer.open({
                content: '股权结构持股比例不能超过100%，请重新填写',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.url + "CreateCompany.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: state.name,//企业全称
                abbrname: state.abbrname,//企业简称
                logo: state.logo,//企业logo
                fields: state.fields,//行业领域
                regist_time: state.regist_time,//成立时间
                regist_capital: state.regist_capital,//注册资本
                legal_person: state.legal_person,//法定代表人
                staff_size: state.staff_size,//公司规模
                address: state.address,//注册地址
                web: state.web,//公司网站
                ipo_status: state.ipo_status,//公开募资
                intro: state.intro,//公司简介
                primary_business: state.primary_business,//主营业务
                business_model: state.business_model,//商业模式
                business_intro: state.business_intro,//业务介绍
                team: state.team,//团队信息
                stock_struct: state.stock_struct,//股权结构
                competitors: state.competitors,//竞争对手
                financial_data: state.financial_data//财务数据
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
    //编辑企业
    editCompany: (state,callback) => {
        if(!Utils.checkNull(state.name,"请填写企业全称")){
            return false;
        }
        let scaleCount = 0;
        if(state.stock_struct && state.stock_struct.length){
            state.stock_struct.map((stock)=>{
                scaleCount += parseFloat(stock.scale);
            });
        }
        if(scaleCount > 100){
            layer.open({
                content: '股权结构持股比例不能超过100%，请重新填写',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.url + "EditCompany.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id,//企业ID
                name: state.name,//企业全称
                abbrname: state.abbrname,//企业简称
                logo: state.logo,//企业logo
                fields: state.fields,//行业领域
                regist_time: state.regist_time,//成立时间
                regist_capital: state.regist_capital,//注册资本
                legal_person: state.legal_person,//法定代表人
                staff_size: state.staff_size,//公司规模
                address: state.address,//注册地址
                web: state.web,//公司网站
                ipo_status: state.ipo_status,//公开募资
                intro: state.intro,//公司简介
                primary_business: state.primary_business,//主营业务
                business_model: state.business_model,//商业模式
                business_intro: state.business_intro,//业务介绍
                team: state.team,//团队信息
                stock_struct: state.stock_struct,//股权结构
                competitors: state.competitors,//竞争对手
                financial_data: state.financial_data//财务数据
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    callback(data);
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
                errorCallback();
            }
        });
    },
    //删除企业
    deleteCompany: (state,callback) => {
        $.ajax({
            url: Utils.url + "DeleteCompany.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id//企业ID
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
    //查询企业信息
    queryCompany: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryCompany.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id//企业ID
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
    //搜索企业
    searchCompanies: (state,callback) => {
        $.ajax({
            url: Utils.url + "SearchCompanies.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: state.name,//企业名称
                staff_size: state.staff_size,//企业规模
                fields: state.fields,//领域
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
    //添加企业动态
    createCompanyNews: (state,callback) => {
        $.ajax({
            url: Utils.url + "CreateCompanyNews.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id,//企业ID
                title: state.title,//标题
                content: state.content//动态内容
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
    //删除企业动态
    deleteCompanyNews: (id,callback) => {
        $.ajax({
            url: Utils.url + "DeleteCompanyNews.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: id//动态ID
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
    //查询企业动态
    queryCompanyNews: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryCompanyNews.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id,//企业ID
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
    //查询企业融资历史
    queryCompanyFinHis: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryCompanyFinHis.php",
            type: "post",
            dataType: 'JSON',
            data: {
                id: state.id,//企业ID
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
    }
};

module.exports = CompanyAction;