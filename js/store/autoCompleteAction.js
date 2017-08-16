/**
 * Created by Galaxy065 on 2017/5/18.
 */
import Utils from './utils'

let AutoCompleteAction = {
    searchInvestOrgNames: (name,callback) => {
        $.ajax({
            url: Utils.url + "SearchInvestOrgNames.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: name
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    let orgData = [];
                    for(let i=0;i<data.data.length;i++){
                        orgData.push({
                            id: data.data[i].finorg_id,
                            name: data.data[i].finorg_name
                        });
                    }
                    callback(orgData);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    searchInvestorNames: (name,callback) => {
        $.ajax({
            url: Utils.url + "SearchInvestorNames.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: name
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    let investorData = [];
                    for(let i=0;i<data.data.length;i++){
                        investorData.push({
                            id: data.data[i].id,
                            extId: data.data[i].ext_id,
                            name: data.data[i].name_cn,
                            name_en: data.data[i].name_en,
                            phone: data.data[i].phone,
                            email: data.data[i].email,
                            auth_type: data.data[i].auth_type,
                            org: data.data[i].org_name,
                        });
                    }
                    callback(investorData);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    searchCompanyNames: (name,callback) => {
        $.ajax({
            url: Utils.url + "SearchCompanyNames.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: name
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    let orgData = [];
                    for(let i=0;i<data.data.length;i++){
                        orgData.push({
                            id: data.data[i].orginfo_id,
                            name: data.data[i].orginfo_name
                        });
                    }
                    callback(orgData);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    searchStaffNames: (name,callback) => {
        $.ajax({
            url: Utils.url + "SearchStaffNames.php",
            type: "post",
            dataType: 'JSON',
            data: {
                name: name
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    let staffData = [];
                    for(let i=0;i<data.data.length;i++){
                        staffData.push({
                            id: data.data[i].id,
                            name: data.data[i].staff_name,
                            gender: data.data[i].gender,
                            job: data.data[i].job,
                            org_name: data.data[i].org_name,
                            dep_name: data.data[i].dep_name,
                            phone: data.data[i].phone,
                        });
                    }
                    callback(staffData);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
    quickSearchProject: (name,callback) => {
        $.ajax({
            url: Utils.url + "QuickSearchProject.php",
            type: "post",
            dataType: 'JSON',
            data: {
                searchkey: name
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    let projectData = [];
                    for(let i=0;i<data.data.length;i++){
                        projectData.push({
                            id: data.data[i].project_id,
                            name: data.data[i].project_name,
                            fphase_name: data.data[i].fphase_name,
                            intention: (data.data[i].project_afinilimt ? data.data[i].project_afinilimt : "-") + " / " + (data.data[i].project_finilimt ? data.data[i].project_finilimt : "-") + (data.data[i].project_finilimt || data.data[i].project_afinilimt ? " 万元" : ""),
                            treat_name: data.data[i].treat_name,
                            fstatus_name: data.data[i].schedule.fstatus_name,
                            project_leader: data.data[i].project_leader,
                        });
                    }
                    callback(projectData);
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },
};

module.exports = AutoCompleteAction;