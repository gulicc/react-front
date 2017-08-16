let Utils = {
    // url: "http://b.gtest.com/clientPhp/",
    //url: "http://o.rongkuai.com/clientPhp/",
    //url: "http://10.10.1.225/clientPhp/",
    url: "http://localhost/front/clientPhp/",

    getLoginData: () => {
        if(window.localStorage.loginData){
            return JSON.parse(window.localStorage.loginData);
        }else{
            return false
        }
    },
    closeSlideBox: (callback) => {
        $(document).bind("click",(function(e) {
            if($(e.target).parents("#slide").length > 0){
                return;
            }else {
                callback();
            }
        }));
    },
    unbindCloseSlideBox: () => {
        $(document).unbind("click");
    },
    slideScroll: () => {
        $("#slideContainer").scrollLeft(0);
        $("#slideContainer").scrollTop(0);
    },
    getNow: function () { //获取当前时间时间戳
        return Date.parse(new Date());
    },
    getYMD: function (getTime) { //获取发布时间
        let time = new Date(getTime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        if (month < 10) {
            month = '0' + month
        }
        if (date < 10) {
            date = '0' + date
        }
        return year + "-" + month + "-" + date;
    },
    getHMS: function (getTime) { //获取发布时间
        let time = new Date(getTime);
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
        return hour + ":" + minute + ":" + second;
    },
    getAllTime: function (getTime) {
        let time = new Date(getTime);
        let year = time.getFullYear();
        let month = time.getMonth() + 1;
        let date = time.getDate();
        let hour = time.getHours();
        let minute = time.getMinutes();
        let second = time.getSeconds();
        if (month < 10) {
            month = '0' + month
        }
        if (date < 10) {
            date = '0' + date
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        if (second < 10) {
            second = '0' + second
        }
        return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    },
    getHM: function (getTime) { //获取HH:mm
        let time = new Date(getTime);
        let hour = time.getHours();
        let minute = time.getMinutes();
        if (hour < 10) {
            hour = '0' + hour
        }
        if (minute < 10) {
            minute = '0' + minute
        }
        return hour + ":" + minute;
    },
    checkNull: (value,msg) => {
        if(!value){
            layer.open({
                content: msg,
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }else{
            return true;
        }
    },
    checkMobile: (mobile) => {
        if(!(/^(0|86|17951)?(13[0-9]|15[012356789]|17[03678]|18[0-9]|14[57])[0-9]{8}$/.test(mobile))){
            layer.open({
                content: '请填写正确的手机号',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }else{
            return true;
        }
    },
    checkEmail: (email) => {
        console.log(email);
        if((/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(email)) || email === "" || email === null){
            return true;
        }else{
            layer.open({
                content: '请填写正确的邮箱',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    },
    checkPassword: (password) => {
        if((/^[a-z0-9]{6,16}$/i.test(password))){
            return true;
        }else{
            layer.open({
                content: '密码格式不正确',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    },
    findRepeat: (array) => { //数组查重
        let res = [];
        let json = {};
        for(let i = 0; i < array.length; i++){
            if(!json[this[i]]){
                res.push(this[i]);
                json[this[i]] = 1;
            }
        }
        return res;
    },
    beforeUpload: (file) => {
        const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJPG) {
            layer.open({
                content: '请上传.jpg或.png格式图片',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        const isLt2M = file.size / 1024 / 1024 < 3;
        if (!isLt2M) {
            layer.open({
                content: '请上传小于3M的图片',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        return isJPG && isLt2M;
    },
    beforeUploadFile: (file) => {
        const isLt2M = file.size / 1024 / 1024 < 10;
        if (!isLt2M) {
            layer.open({
                content: '请上传小于10M的文件',
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
        return isLt2M;
    },
    getBase64: (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    },
    checkPower: (power) => {
        let ownPower = Utils.getLoginData().roles[0].powers;
        if($.inArray(power, ownPower) > -1){
            return true;
        }else{
            layer.open({
                content: '您没有' + power + "的权限",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            return false;
        }
    },
    powerSlider: (powerArray) => {
        let ownPower = Utils.getLoginData() ? Utils.getLoginData().roles[0].powers : [];
        let power = [];
        for(let i=0;i<powerArray.length;i++){
            if($.inArray(powerArray[i], ownPower) > -1){
                power.push(powerArray[i]);
            }
        }
        if(power.length){
            return true
        }else {
            return false
        }
    },
    staffSize:  [
        {
            id: 1,
            name: "20人以下"
        },
        {
            id: 2,
            name: "20-99人"
        },
        {
            id: 3,
            name: "100-499人"
        },
        {
            id: 4,
            name: "500-999人"
        },
        {
            id: 5,
            name: "1000-9999人"
        },
        {
            id: 6,
            name: "10000人以上"
        }
    ],
    fundSize: [
        {
            id: 1,
            name: "1000万元以下"
        },
        {
            id: 2,
            name: "1000-4999万元"
        },
        {
            id: 3,
            name: "5000万元以上"
        }
    ],
    ipoSize: [
        {
            id: 1,
            name: "非上市"
        },
        {
            id: 2,
            name: "新三板"
        },
        {
            id: 3,
            name: "A股上市"
        },
        {
            id: 4,
            name: "境外上市"
        }
    ],
    innerPower: [
        {
            id: "强",
            name: "强"
        },
        {
            id: "中",
            name: "中"
        },
        {
            id: "弱",
            name: "弱"
        }
    ],
    findStaffSize: (id) => {
        for(let i=0;i<Utils.staffSize.length;i++){
            if(parseInt(id) === Utils.staffSize[i].id){
                return Utils.staffSize[i].name;
                break;
            }
        }
    },
    findFundSize: (id) => {
        for(let i=0;i<Utils.fundSize.length;i++){
            if(parseInt(id) === Utils.fundSize[i].id){
                return Utils.fundSize[i].name;
                break;
            }
        }
    },
    findIpoSize: (id) => {
        for(let i=0;i<Utils.ipoSize.length;i++){
            if(parseInt(id) === Utils.ipoSize[i].id){
                return Utils.ipoSize[i].name;
                break;
            }
        }
    },
}

module.exports = Utils;