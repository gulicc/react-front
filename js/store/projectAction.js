import Utils from './utils';

let ProjectAction = {
    //获取融资阶段/轮次列表
    queryInvestRounds: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryInvestRounds.php",
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

    //获取领域列表
    queryIndustries: (state,callback) => {
        $.ajax({
            url: Utils.url + "QueryIndustries.php",
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

    //获取工作状态列表 项目处置
    queryTreats: (callback) => {
        $.ajax({
            url: Utils.url + "QueryTreats.php",
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

    //获取项目融资进展
    queryFinStatus: (callback) => {
        $.ajax({
            url: Utils.url + "QueryFinStatus.php",
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

    //融资进度状态
    queryInvProgress: (callback) => {
        $.ajax({
            url: Utils.url + "QueryInvProgress.php",
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

    //查询融资项目列表
    listProjects: (state,callback) => {
        $.ajax({
            url: Utils.url + "ListProjects.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'searchkey':state.searchkey,    //项目名称 项目经理 备注
                'industrys':state.industrys,    //领域 数组[]
                'fphases':state.fphases,        //融资阶段/轮次 数组[]
                'treats':state.treats,          //工作状态 数组[]
                'firstevals':state.firstevals,  //评级 数组[]
                'tags':state.tags,              //标签 数组[]
                'page_index':state.page_index,  //页面索引
                'page_cap':state.page_cap       //每页记录数
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

    //更新项目融资进展状态
    updateFinStatus: (projectid,newstatus,scheduleat,callback) => {
        if(!Utils.checkNull(scheduleat,"请填写该进度时间")){
            return false
        }
        $.ajax({
            url: Utils.url + "UpdateFinStatus.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'projectid': projectid,      //项目ID
                'newstatus': newstatus,      //项目状态
                scheduleat: scheduleat
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

    //新建项目
    newProject: (state,callback,errorCallback) => {
        if(state.files === "loading"){
            layer.open({
                content: "请等待附件上传完成",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
        if(!Utils.checkNull(state.pname,"请填写项目名称")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.phase,"请选择轮次")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.org_id,"请填写企业名称")){
            errorCallback();
            return false;
        }
        if(state.project_score === 0){
            errorCallback();
            layer.open({
                content: "请填写调查问卷",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
        if(!Utils.checkNull(state.treat_id,"请选择录入人建议")){
            errorCallback();
            return false;
        }
        if(state.project_evallevel === 0){
            errorCallback();
            layer.open({
                content: "请为项目评分",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }

        let info = {
            pname: state.pname,
            pnote: state.pnote,
            org_id: state.org_id,
            phase: state.phase,
            industrys: state.industrys,
            tags: state.tags
        };

        let source = {
            psource: state.psource,
            recmndins: state.recmndins,
            recmndinsid: state.recmndinsid,
            recmnd: state.recmnd,
            interrecmnd: state.interrecmnd,
            interrecmndid: state.interrecmndid,
            leader: state.leader,
            leaderid: state.leaderid,
        };

        let money = {
            finilimt: state.finilimt,
            offvalue: state.offvalue,
            finvalue: state.finvalue
        };

        let actor = {
            'title': state.title,// 主题
            'stime': state.stime,// 开始时间
            'etime': state.etime,//结束时间
            'type': state.type,//类型：单方拜访/投资人会议
            'way': state.way,//方式：公司/外出/电话/微信
            'director': state.director,//负责人
            'obj_investors': state.obj_investors,//活动对象：投资人
            'obj_projects': state.obj_projects,//活动对象：项目
            'obj_staffs': state.obj_staffs,//活动对象：公司人员
            'site': state.site,//活动地点
            'files': state.files,//活动附件
            'record': state.record,//活动记录
            'remark': state.remark,//活动备注
        };

        let score = {
            'project_evallevel': state.project_evallevel,// 评定级别
            'project_evalphase': state.project_evalphase,// 评定阶段
            'project_score': state.project_score,//融资评分
            treat_id: state.treat_id
        };

        let attach = {
            files: state.fileData
        };

        $.ajax({
            url: Utils.url + "NewProject.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'info': info,          // 基本信息
                'source': source,      // 项目来源
                'money': money,        // 融资方案
                'actor': actor,        // 活动记录
                'score': score,        // 初步评定
                'attach': attach,      // 附件
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

    //项目基本信息
    getProjectInfo: (state,callback) => {
        $.ajax({
            url: Utils.url + "GetProjectInfo.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'projectid': state.id     //项目ID
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

    //更新项目
    updateProject: (state,callback) => {
        if(!Utils.checkNull(state.pname,"请填写项目名称")){
            return false;
        }
        if(!Utils.checkNull(state.phase,"请选择轮次")){
            return false;
        }
        if(!Utils.checkNull(state.org_id,"请填写企业名称")){
            return false;
        }
        let info = {
            pname: state.pname,
            advantage: state.advantage,
            industryany: state.industryany,
            operation: state.operation,
            moneyuse: state.moneyuse,
            finilimt: state.finilimt,
            sharetype: state.sharetype,
            shares: state.shares,
            phase: state.phase,
            schedule: state.schedule,
            treatid: state.treat_id,
            industrys: state.industrys,
            org_id: state.org_id,
            pnote: state.pnote,
            tags: state.tags
        };

        let source = {
            psource: state.psource,
            recmndins: state.recmndins,
            recmndinsid: state.recmndinsid,
            recmnd: state.recmnd,
            interrecmnd: state.interrecmnd,
            interrecmndid: state.interrecmndid,
            leader: state.leader,
            leaderid: state.leaderid,
        };

        let score = {
            project_evallevel: state.project_evallevel,
            project_evalphase: state.project_evalphase,
            project_score: state.project_score,
            treat_id: state.treat_id
        };

        let team = state.team;

        $.ajax({
            url: Utils.url + "UpdateProject.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'info': info,          // 基本信息
                'source': source,      // 项目来源
                'money':state.money,        // 融资方案
                'actor':state.actor,        // 活动记录
                'score': score,        // 初步评定
                'team': team,
                'attach':state.attach,      // 附件
                'projectid': state.id,//操作员
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
                    return false;
                }
            },
            error: function (data) {
                console.log("web false");
            }
        });
    },

    //删除项目
    deleteProject: (id,callback) => {
        $.ajax({
            url: Utils.url + "DeleteProject.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'projectid': id      //项目ID
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

    //项目投资意向
    getProjectInvest: (id,callback) => {
        $.ajax({
            url: Utils.url + "GetProjectInvest.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'projectid': id      //项目ID
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

    //更新项目投资意向
    updateProjectInvest: (state,callback) => {
        //'investlist' => [
        //	[
        //		'investor' => '投资人',//投资人
        //		'investorid' => '11',//投资人ID
        //		'investorg' => '投资机构',//投资机构
        //		'planmoney' => '5555',//投资额度
        //		'isleader' => 'Y',//是否领投
        //		'progress' => '1',//投资进度
        //	],
        //],//投资信息列表

        $.ajax({
            url: Utils.url + "UpdateProjectInvest.php",
            type: "post",
            dataType: 'JSON',
            data: {
                'finilimt':state.finilimt,          //拟融资额度
                'afinilimt':state.afinilimt,        //实际融资额度
                'offvalue':state.offvalue,          //预计估值可谈空间
                'finshare':state.finshare,          //拟出让股份
                'afinshare':state.afinshare,        //实际出让股份
                'finvalue':state.finvalue,          //拟投后估值
                'afinvalue':state.afinvalue,        //实际投后估值
                'moneyuse':state.moneyuse,          //资金用途
                'investlist': state.investlist,      //投资信息列表数组[]
                'projectid': state.id         //项目ID
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

    //查询我的融资项目列表
    listMyProjects: (state,callback) => {
        $.ajax({
            url: Utils.url + "ListMyProjects.php",
            type: "post",
            dataType: 'JSON',
            data: {
                page_index:state.page_index,    //分页索引
                page_cap:state.page_cap        //分页容量
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

    //查询管理员首页待评定项目
    listAdminProjects: (state,callback) => {
        $.ajax({
            url: Utils.url + "ListAdminProjects.php",
            type: "post",
            dataType: 'JSON',
            data: {
                page_index:state.page_index,    //分页索引
                page_cap:state.page_cap        //分页容量
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

    //管理员首页快速评定
    quickProjectTreating: (projectid,state,callback) => {
        if(state.level === 0) {
            layer.open({
                content: "请对项目进行正式评级",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
        $.ajax({
            url: Utils.url + "QuickProjectTreating.php",
            type: "post",
            dataType: 'JSON',
            data: {
                projectid: projectid,
                level: state.level,
                treatid: state.treatid
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

    //相关附件新增附件
    projectAttachData: (state,callback)=>{
        $.ajax({
            url: Utils.url + "ProjectAttachData.php",
            type: "post",
            dataType: 'JSON',
            data: {
                files: state.fileData,
                projectid: state.id
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
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

    //删除相关附件
    projectAttachDelete: (attachid,projectid,callback)=>{
        $.ajax({
            url: Utils.url + "ProjectAttachDelete.php",
            type: "post",
            dataType: 'JSON',
            data: {
                attachid: attachid,
                projectid: projectid
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
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

    // 添加成员
    addProjectMember: (platformid,role,projectid,callback)=>{
        if(!Utils.checkNull(platformid,"请填写参与成员")){
            return false;
        }
        if(!Utils.checkNull(role,"请填写成员职责")){
            return false;
        }
        $.ajax({
            url: Utils.url + "AddProjectMember.php",
            type: "post",
            dataType: 'JSON',
            data: {
                platformid: platformid,
                role: role,
                projectid: projectid
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
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

    //删除成员
    deleteProjectMember: (raid_id,projectid,callback)=>{
        $.ajax({
            url: Utils.url + "DeleteProjectMember.php",
            type: "post",
            dataType: 'JSON',
            data: {
                raid_id: raid_id,
                projectid: projectid
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
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

    //修改优先级
    updateProjectPriority: (treatid,projectid,callback)=>{
        $.ajax({
            url: Utils.url + "UpdateProjectPriority.php",
            type: "post",
            dataType: 'JSON',
            data: {
                treatid: treatid,
                projectid: projectid
            },
            success: function (data) {
                if (data.status_code === 9000) {
                    layer.open({
                        content: data.status_txt,
                        skin: 'msg',
                        style: 'bottom:0;',
                        time: 3
                    });
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

    //删除进度
    deleteFinStatus: (schedule_id,projectid,callback)=>{
        $.ajax({
            url: Utils.url + "DeleteFinStatus.php",
            type: "post",
            dataType: 'JSON',
            data: {
                schedule_id: schedule_id,
                projectid: projectid
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

    //更新可见性
    updateProjectVisable: (sharetype,shares,projectid,callback)=>{
        $.ajax({
            url: Utils.url + "UpdateProjectVisable.php",
            type: "post",
            dataType: 'JSON',
            data: {
                sharetype: sharetype,
                shares: shares,
                projectid: projectid
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
};

module.exports = ProjectAction;