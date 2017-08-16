/**
 * Created by Galaxy065 on 2017/5/9.
 */
import React from "react";
import { Link } from "react-router-dom";
import Style from "./css/addProject.css";
import { Select } from "antd";

import UploadAction from "../../../store/uploadAction";

export default class AddImport extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            step: 1,
            result: {}
        }
    }

    ing = () => {
        this.setState({
            step: 2
        })
    }

    next = (data) => {
        this.setState({
            step: 3,
            result: data
        })
    }

    render() {
        return(
            <div className={Style.container}>
                <div className={"flex flex-row flex-between"}>
                    <h2>上传文档</h2>
                    <h2>导入数据</h2>
                    <h2>完成</h2>
                </div>
                <div className={"flex flex-row flex-between align-center " + Style.step}>
                    <span className={Style.do}></span>
                    <div className={"flex1 " + Style.line} style={{backgroundColor: this.state.step > 1 ? "#ff530c" : ""}}></div>
                    <span className={this.state.step > 1 ? Style.do : Style.undo}></span>
                    <div className={"flex1 " + Style.line} style={{backgroundColor: this.state.step > 2 ? "#ff530c" : ""}}></div>
                    <span className={this.state.step > 2 ? Style.do : Style.undo}></span>
                </div>
                {
                    (()=>{
                        switch (this.state.step){
                            case 1:
                                return <StepFirst type={this.props.type} close={this.props.close} next={this.next} ing={this.ing} />;
                                break;
                            case 2:
                                return <StepSecond />;
                                break;
                            case 3:
                                return <StepThird data={this.state.result} complete={this.props.complete} />;
                                break;
                        }
                    })()
                }
            </div>
        )
    }
}

class StepFirst extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fileName: "",
            object_type: "",
            import_type: "",
            importData: [],
            download: "",
            rule: "",
        }
    }

    componentDidMount = () => {
        switch (this.props.type) {
            case "project":
                this.setState({
                    object_type: 1,
                    import_type: 4,
                    importData: [
                        {
                            id: 4,
                            name: "全部增量导入"
                        }
                    ],
                    download: "http://o.rongkuai.com/uploads/templates/projects_tpl.csv",
                    rule: "项目名称"
                });
                break;
            case "investor":
                this.setState({
                    object_type: 2,
                    import_type: 1,
                    importData: [
                        {
                            id: 1,
                            name: "重复数据覆盖导入"
                        },
                        {
                            id: 2,
                            name: "重复数据不导入"
                        },
                        {
                            id: 3,
                            name: "不导入新数据，只覆盖重复数据"
                        },
                    ],
                    download: "http://o.rongkuai.com/uploads/templates/investors_tpl.csv",
                    rule: "手机号"
                });
                break;
            case "agency":
                this.setState({
                    object_type: 3,
                    import_type: 4,
                    importData: [
                        {
                            id: 4,
                            name: "全部增量导入"
                        }
                    ],
                    download: "http://o.rongkuai.com/uploads/templates/investor_orgs_tpl.csv",
                    rule: "机构名称"
                });
                break;
        }
    }

    changeImportType = (value) => {
        this.setState({
            import_type: value
        })
    }

    submitFile = (e) => {
        let fileType = e.target.value.substr(e.target.value.lastIndexOf(".")).toLowerCase();
        if(fileType !== ".csv"){
            layer.open({
                content: '请上传.csv文件',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            $("#upload")[0].files[0] = "";
            return false;
        }
        this.setState({
            fileName: this.getPath($("#upload")[0])
        })
    }

    getPath = (obj) => {
        if(obj)
        {
            if (window.navigator.userAgent.indexOf("MSIE")>=1)
            {
                obj.select();
                return document.selection.createRange().text;
            }
            else if(window.navigator.userAgent.indexOf("Firefox")>=1)
            {
                if(obj.files)
                {
                    return obj.files.item(0).getAsDataURL();
                }
                return obj.value;
            }
            return obj.value;
        }
    }

    _submit = () => {
        UploadAction.importObjects(this.state.object_type,this.state.import_type,$("#upload")[0].files[0],(data)=>{
            this.props.next(data);
        },()=>{
            this.props.ing();
        })
    }

    render() {
        const Option = Select.Option;
        return(
            <div className={Style.step1}>
                <div className="flex flex-row flex-start">
                    <h3>一、</h3>
                    <p>请按照数据模板的格式准备要导入的数据。</p>
                </div>
                <div className={Style.tip}>
                    <a href={this.state.download}>下载数据模板</a>
                </div>
                <div className="flex flex-row flex-start">
                    <h3>二、</h3>
                    <p>请选择数据重复时的操作方式：</p>
                    <Select value={this.state.import_type} style={{ marginLeft: 30, width: 236 }} onChange={this.changeImportType}>
                        {
                            this.state.importData.map((data,i)=>{
                                return(
                                    <Option key={i} value={data.id}>{data.name}</Option>
                                )
                            })
                        }
                    </Select>
                </div>
                <div className={Style.tip}>
                    <p>查重规则：{this.state.rule}</p>
                </div>
                <div className="flex flex-row flex-start">
                    <h3>三、</h3>
                    <p>请选择需要导入的CSV文件。</p>
                </div>
                <div className={"flex flex-row flex-start " + Style.tip}>
                    <button>
                        添加文件
                        <input type="file" id="upload" className={Style.upload} onChange={this.submitFile.bind(this)}/>
                    </button>
                    <p>{this.state.fileName}</p>
                </div>
                <div className={"flex flex-row flex-center " + Style.controller}>
                    <a className={Style.start} onClick={this._submit}>开始导入</a>
                    <a className={Style.cancel} onClick={this.props.close}>取消</a>
                </div>
            </div>
        )
    }
}

class StepSecond extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={Style.step2}>
                <div className={"flex flex-row flex-center " + Style.importing}>
                    <span></span>
                    <p>导入中......</p>
                </div>
            </div>
        )
    }
}

class StepThird extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            success: [],
            fail: []
        }
    }

    componentDidMount = () => {
        let data = this.props.data;
        let success = [];
        let fail = [];
        for(let i in data){
            if(data[i].result === "fail"){
                fail.push(data[i]);
            }else if(data[i].result === "success"){
                success.push(data[i]);
            }
        }
        this.setState({
            success: success,
            fail: fail
        })
    }

    render() {
        return(
            <div className={Style.step3}>
                <div className={"flex flex-row flex-center " + Style.importFinish}>
                    <span></span>
                    <p>导入完成</p>
                </div>
                <div className="flex flex-row flex-center">
                    <div className={Style.importFinishTip}>
                        <p>成功导入数据{this.state.success.length}条；</p>
                        <p>失败数据{this.state.fail.length}条。</p>
                    </div>
                </div>
                <div className="flex flex-row flex-center">
                    <a onClick={this.props.complete} className={Style.finish}>完成</a>
                </div>
            </div>
        )
    }
}