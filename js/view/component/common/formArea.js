/**
 * Created by Galaxy065 on 2017/5/5.
 */
import React from "react";
import Style from "./css/formArea.css";
import Icon from "./defaultIcon";
import { Questionnaire } from "./alertWindow";
import { Input } from "./defaultInput";
import { DeleteButton } from "./defaultButton";
import { Upload, Spin } from "antd";

import Utils from "../../../store/utils";

export class FormArea extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={Style.add} style={{height: this.props.height, marginTop: this.props.marginTop, paddingBottom: this.props.paddingBottom}}>
                <div className={Style.header}>
                    <h2>{this.props.title}</h2>
                </div>
                <div className={Style.main} style={{paddingTop: this.props.paddingTop, paddingRight: this.props.paddingRight}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export class FormItem extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.formItem + " " + this.props.className } style={{marginTop: this.props.marginTop, marginLeft: this.props.marginLeft}}>
                <p className={Style.formItemTitle} style={{width: this.props.titleWidth, lineHeight: this.props.lineHeight}}>{this.props.title}</p>
                {this.props.children}
            </div>
        )
    }
}

export class FormItemTable extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
                <div className={"flex flex-row flex-start " + this.props.className } style={{marginTop: this.props.marginTop, marginBottom: this.props.marginBottom}}>
                    {
                        this.props.titleData.map((titles,i) => {
                            return(
                                <p className={Style.formItemTableTitle} style={{width: titles.titleWidth, marginRight: titles.marginRight}} key={i}>{titles.title}</p>
                            )
                        })
                    }
                </div>
                {this.props.children}
            </div>
        )
    }
}

export class FormQuestion extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            alertOpen: false
        }
    }

    open = () => {
        this.setState({
            alertOpen: true
        });
    }

    close = () => {
        this.setState({
            alertOpen: false
        });
    }

    handle = (value) => {
        this.props.handle("project_score",value);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start align-center " + Style.formItem}>
                <p>{this.props.score}分</p>
                <a className={Style.question} onClick={this.open}>填写问卷</a>
                {
                    this.state.alertOpen ?  <Questionnaire closeHandle={this.close} handle={this.handle}/> : ("")
                }
            </div>
        )
    }
}

export class FormRate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: [false,false,false,false,false],
            rate: this.props.rate
        }
    }

    componentDidMount = () => {
        this.leave();
    }

    rate = (key) => {
        this.props.handle(key+1,this.leave);
    }

    over = (key) => {
        let data = this.state.data;
        for(let i=0;i<data.length;i++) {
            if(i<key+1){
                data[i] = true;
            }else{
                data[i] = false;
            }
        }
        this.setState({
            data: data
        })
    }

    leave = () => {
        let data = this.state.data;
        for(let i=0;i<data.length;i++){
            if(i<this.props.rate){
                data[i] = true;
            }else{
                data[i] = false;
            }
        }
        this.setState({
            data: data
        })
    }

    render() {
        return(
            <div className="flex flex-row flex-start align-center" style={this.props.style}>
                <div className="flex flex-row flex-start" onMouseLeave={this.leave}>
                    {
                        this.state.data.map((star,i) => {
                            return(
                                this.props.isEdit ? (
                                    <a key={i} className={Style.star} style={{backgroundImage: star ? "url(/images/icon_star_edit_choose.png)" : "url(/images/icon_star_edit.png)"}} onMouseOver={()=>{this.over(i)}} onClick={()=>{this.rate(i)}}></a>
                                ) : (
                                    <a key={i} className={Style.star} style={{backgroundImage: star ? "url(/images/icon_star_choose.png)" : "url(/images/icon_star.png)"}} onMouseOver={()=>{this.over(i)}} onClick={()=>{this.rate(i)}}></a>
                                )
                            )
                        })
                    }
                </div>
                <p className={Style.formRate}>{this.props.rate === "-" ? this.props.rate : this.props.rate + "级"}</p>
            </div>
        )
    }
}

export class FormFile extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            files: [{
                id: "",
                name: "",
                path: "",
                desc: "",
                fileStatus: false
            }]
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    addFile = () => {
        let data = this.state.files;
        if(data.length === 0 || data[data.length - 1].id){
            data.push({
                id: "",
                name: "",
                path: "",
                desc: "",
                fileStatus: false
            });
            this.setState({
                files: data
            })
        }else{
            layer.open({
                content: "请先完善上一条数据",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    reset = () => {
        this.handle("files",[{
            id: "",
            name: "",
            path: "",
            desc: "",
            fileStatus: false
        }]);
    }

    render() {
        return(
            <div style={{marginTop: this.props.marginTop}}>
                <div className={"flex flex-row flex-start " + Style.file}>
                    <p style={{width: 140}}>文件名</p>
                    <p style={{width: 250}}>文件路径</p>
                    <p style={{width: 106}}>备注</p>
                </div>
                <div style={{marginTop: 10, marginBottom: 26}}>
                    {
                        this.state.files.map((data,i)=>{
                            return(
                                <FormFileUpload data={this.state.files} itemData={data} handle={this.handle} index={i} key={i} />
                            )
                        })
                    }
                </div>
                <div className={Style.addFile}>
                    <a className="flex flex-row flex-center align-center" onTouchTap={this.addFile}>
                        <span></span>添加附件
                    </a>
                </div>
            </div>
        )
    }
}

export class FormFileUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.itemData.id,
            name: nextProps.itemData.name,
            path: nextProps.itemData.path,
            desc: nextProps.itemData.desc,
            fileStatus: nextProps.itemData.fileStatus
        })
    }

    changeDesc = (name,value) => {
        let data = this.props.data;
        data[this.props.index].desc = value;
        this.props.handle("files",data);
    }

    handleChange = (info) => {
        let data = this.props.data;
        if (info.file.status === 'done') {
            data[this.props.index].id = info.file.response.data.id;
            data[this.props.index].name = info.file.name;
            data[this.props.index].path = info.file.response.data.path;
            data[this.props.index].fileStatus = "ok";
            this.props.handle("files",data);
        }else {
            this.setState({
                fileStatus: "loading"
            });
            data[this.props.index].fileStatus = "loading";
            this.props.handle("files",data);
        }
    }

    delete = () => {
        let data = this.props.data;
        data.splice(this.props.index,1);
        this.props.handle("files",data);
    }

    render() {
        return(
            <div className={"flex flex-row flex-between align-center " + Style.fileItem}>
                <div className="flex flex-row flex-start align-center">
                    <p style={{width: 140, paddingRight: 14}}>{this.state.name}</p>
                    <p style={{width: 236, overflow: "hidden"}}>{this.state.path}</p>
                    <Input value={this.state.desc} handle={this.changeDesc} style={{ marginLeft: 14, width: 106 }} />
                    <Upload name="userfile"
                            showUploadList={false}
                            action={Utils.url + "UploadFile.php"}
                            beforeUpload={Utils.beforeUploadFile}
                            onChange={this.handleChange}
                    >
                        <a className={Style.import} style={{marginRight: 20, marginLeft: 40}}>导入</a>
                    </Upload>
                    {
                        (()=>{
                            switch (this.state.fileStatus) {
                                case "loading":
                                    return <Spin />;
                                    break;
                                case "ok":
                                    return <Icon name="uploadOk" style={{marginLeft: 20}} />;
                                    break;
                            }
                        })()
                    }
                </div>
                <DeleteButton handle={this.delete}/>
            </div>
        )
    }
}

export class FormSubmit extends React.Component {
    render() {
        return(
            <input type="submit" className={Style.submit} value={this.props.value}/>
        )
    }
}

export class FormUpload extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fileName: "",
            fileStatus: false
        }
    }

    handleChange = (info) => {
        if (info.file.status === 'done') {
            this.setState({
                fileName: info.file.name,
                fileStatus: "ok"
            });
            this.props.handle(this.props.name,info.file.response.data.id);
        }else {
            this.setState({
                fileStatus: "loading"
            });
            this.props.handle(this.props.name,"loading");
        }
    }

    reset = () => {
        this.state = {
            fileName: "",
            fileStatus: false
        }
    }

    render() {
        return(
            <div className="flex flex-row flex-start align-center">
                {
                    this.state.fileName ? (
                        <p className={Style.fileName}>{this.state.fileName}</p>
                    ) : ("")
                }
                <Upload name="userfile"
                        showUploadList={false}
                        action={Utils.url + "UploadFile.php"}
                        beforeUpload={Utils.beforeUploadFile}
                        onChange={this.handleChange}
                >
                    <a className={Style.import} style={{marginRight: 20}}>导入</a>
                </Upload>
                {
                    (()=>{
                        switch (this.state.fileStatus) {
                            case "loading":
                                return <Spin />;
                                break;
                            case "ok":
                                return <Icon name="uploadOk" style={{marginLeft: 20}} />;
                                break;
                        }
                    })()
                }
            </div>
        )
    }
}