/**
 * Created by Galaxy065 on 2017/5/17.
 */
import Utils from './utils'

let TipAction = {
    queryIndustries: (callback) => { // 领域
        $.ajax({
            url: Utils.url + "QueryIndustries.php",
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
    queryInvestRounds: (callback) => { // 轮次
        $.ajax({
            url: Utils.url + "QueryInvestRounds.php",
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
    queryInvestOrgTypes: (callback) => {
        $.ajax({
            url: Utils.url + "QueryInvestOrgTypes.php",
            type: "post",
            dataType: 'JSON',
            success: function (data) {
                callback(data.data);
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    getOrgActorList: (callback) => {
        $.ajax({
            url: Utils.url + "GetOrgActorList.php",
            type: "post",
            dataType: 'JSON',
            success: function (data) {
                if (data.status_code === 9000) {
                    let actorData = [];
                    for(let i=0;i<data.data.length;i++){
                        actorData.push({
                            id: data.data[i].platact_id,
                            name: data.data[i].platact_name
                        });
                    }
                    callback(actorData);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    queryTagTypes: (callback) => {
        $.ajax({
            url: Utils.url + "QueryTagTypes.php",
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
    queryTreats: (callback) => {
        $.ajax({
            url: Utils.url + "QueryTreats.php",
            type: "post",
            dataType: 'JSON',
            success: function (data) {
                if (data.status_code === 9000) {
                    let treatData = [];
                    for(let i=0;i<data.data.length;i++){
                        treatData.push({
                            id: data.data[i].treat_id,
                            name: data.data[i].treat_name
                        });
                    }
                    callback(treatData);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    listProjectSources: (callback) => {
        $.ajax({
            url: Utils.url + "ListProjectSources.php",
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
    listActivityWays: (callback) => {
        $.ajax({
            url: Utils.url + "ListActivityWays.php",
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
    listTags: (type,callback) => {
        $.ajax({
            url: Utils.url + "ListTags.php",
            type: "post",
            dataType: 'JSON',
            data: {
                key: '',
                type: type,
                page_index: 1,
                page_cap: 0
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    let tagData = [];
                    for(let i=0;i<data.data.table.length;i++){
                        tagData.push({
                            id: data.data.table[i].tag_id,
                            name: data.data.table[i].tag_name
                        });
                    }
                    callback(tagData);
                }else{
                    callback(0,[]);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    queryInvestorTypes: (callback) => { //投资人类型
        $.ajax({
            url: Utils.url + "QueryInvestorTypes.php",
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
};

module.exports = TipAction;