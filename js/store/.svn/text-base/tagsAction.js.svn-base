import Utils from './utils';

let TagsAction = {
    //查询标签列表
    listTags: (state,callback) => {
        $.ajax({
            url: Utils.url + "ListTags.php",
            type: "post",
            dataType: 'JSON',
            data: {
                key: state.searchkey, 
                type: state.type,
                page_index: state.page_index,
                page_cap: state.page_cap
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
    //新建标签
    newTag: (state,callback) => {
        if(!Utils.checkNull(state.tagname,"请填写标签名称")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.tagtype,"请选择标签适用范围")){
            errorCallback();
            return false;
        }
        $.ajax({
            url: Utils.url + "NewTag.php",
            type: "post",
            dataType: 'JSON',
            data: {
                tagname: state.tagname,       //标签名
                tagdetail: state.tagdetail,   //标签描述
                tagtype: state.tagtype,       //标签分类
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
    //更新标签
    updateTag: (state,callback) => {
        if(!Utils.checkNull(state.tagname,"请填写标签名称")){
            errorCallback();
            return false;
        }
        if(!Utils.checkNull(state.tagtype,"请选择标签适用范围")){
            errorCallback();
            return false;
        }
        $.ajax({
            url: Utils.url + "UpdateTag.php",
            type: "post",
            dataType: 'JSON',
            data: {
                tagid: state.tagid,             //标签ID
                tagname: state.tagname,         //标签名
                tagdetail: state.tagdetail,     //标签描述
                tagtype: state.tagtype,         //标签分类
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
    //删除标签
    deleteTag: (id,callback) => {
        $.ajax({
            url: Utils.url + "DeleteTag.php",
            type: "post",
            dataType: 'JSON',
            data: {
                tagid: id            //标签ID
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
    //合并标签
    merageTag: (state,callback) => {
        $.ajax({
            url: Utils.url + "MerageTag.php",
            type: "post",
            dataType: 'JSON',
            data: {
                tagids: state.tagids,           //标签ID[]多标签合并，如['21','22','23']
                tagname: state.tagname,         //标签名
                tagdetail: state.tagdetail,     //标签描述
                tagtype: state.tagtype,         //标签分类
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
};

module.exports = TagsAction;