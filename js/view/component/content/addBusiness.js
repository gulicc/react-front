/**
 * Created by Galaxy065 on 2017/5/5.
 */
import React from "react";
import { History } from "react-router-dom";
import Style from "./css/businessInfo.css";
import { FormArea, FormItem, FormSubmit, FormUpload } from "../common/formArea";
import { Input, TextArea, RadioTip } from "../common/defaultInput";
import {AddButton, DeleteButton} from "../common/defaultButton";
import { AutoCompleteInvestor, AutoCompleteStaff, AutoCompleteProject } from "../common/autoComplete";
import { DatePicker } from 'antd';

import Utils from "../../../store/utils";
import ActivityAction from "../../../store/activityAction";

export default class AddBusiness extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //防止重复提交
            submitStatus: true,
            title: "",
            stime: "",
            etime: "",
            type: "",
            way: "",
            director: Utils.getLoginData().platform_id,
            director_name: Utils.getLoginData().platform_personname,
            record: "",
            obj_investors: [],
            obj_projects: [],
            obj_staffs: [],
            files: [],
            site: "",
            remark: "",
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeStaff = (obj) => {
        this.handle("director",obj.id);
    }

    getTime = (value, dateString) => {
        this.handle("stime",dateString);
    }

    getFiles = (name,fileId) => {
        if(fileId === "loading"){
            this.handle(name,fileId);
        }else {
            let files = [];
            files.push(fileId);
            this.handle(name, files);
        }
    }

    _submit = (e) => {
        e.preventDefault();
        if(this.state.submitStatus){
            this.setState({
                submitStatus: false
            })
        }else{
            return false
        }
        let obj_investors = [];
        let obj_projects = [];
        let obj_staffs = [];
        let investor = this.refs.partake.state.investor;
        for(let i=0;i<investor.length;i++){
            if(investor[i].id){
                obj_investors.push(investor[i].id);
            }
        }
        let project = this.refs.partake.state.project;
        for(let i=0;i<project.length;i++){
            if(project[i].id){
                obj_projects.push({
                    id: project[i].id,
                    staff: project[i].staff
                });
            }
        }
        let staff = this.refs.partake.state.staff;
        for(let i=0;i<staff.length;i++){
            if(staff[i].id){
                obj_staffs.push(staff[i].id);
            }
        }
        if(this.state.type === 1){
            if((obj_investors.length && obj_projects.length) || (!obj_investors.length && !obj_projects.length)){
                layer.open({
                    content: "当活动类型为单方拜访时，项目或者投资人中只可添加并必须添加一方数据",
                    skin: 'msg',
                    style: 'bottom:0;',
                    time: 3
                });
                this.setState({
                    submitStatus: true
                })
                return false;
            }
        }
        if(this.state.type === 2){
            if(!obj_investors.length || !obj_projects.length){
                layer.open({
                    content: "当活动类型为投资人会议时，项目和投资人中各方至少有一条人员记录",
                    skin: 'msg',
                    style: 'bottom:0;',
                    time: 3
                });
                this.setState({
                    submitStatus: true
                })
                return false;
            }
        }
        this.setState({
            obj_investors: obj_investors,
            obj_projects: obj_projects,
            obj_staffs: obj_staffs
        },()=>{
            ActivityAction.createActivity(this.state,(data)=>{
                this.props.complete();
            },()=>{
                this.setState({
                    submitStatus: true
                })
            });
        });
    }

    render() {
        const type = [
            {
                name: "单方拜访",
                id: 1
            },
            {
                name: "投资人会议",
                id: 2
            }
        ];
        const way = [
            {
                name: "公司",
                id: 1
            },
            {
                name: "外出",
                id: 2
            },
            {
                name: "电话",
                id: 3
            },
            {
                name: "微信",
                id: 4
            }
        ];
        return(
            <form onSubmit={this._submit.bind(this)}>
                <FormArea title="基本信息"  paddingBottom="18" paddingRight="18">
                    <FormItem title="活动主题" titleWidth="86" marginTop="26">
                        <Input name="title" value={this.state.title} handle={this.handle} style={{width: 236}} need={true}/>
                    </FormItem>
                    <FormItem title="活动时间" titleWidth="86" marginTop="26">
                        <DatePicker
                            showTime={{format: "HH:mm"}}
                            format="YYYY-MM-DD HH:mm"
                            allowClear={false}
                            onChange={this.getTime}
                            style={{width: 236}}
                        />
                        <span style={{marginLeft: 20, lineHeight: "28px", color: "#ff530c"}}>*</span>
                    </FormItem>
                    <FormItem title="活动类型" titleWidth="86" marginTop="26">
                        <RadioTip name="type" data={type} handle={this.handle} style={{paddingRight: 70}} need={true}/>
                    </FormItem>
                    <FormItem title="活动方式" titleWidth="86" marginTop="26">
                        <RadioTip name="way" data={way} handle={this.handle} style={{paddingRight: 70}} need={true}/>
                    </FormItem>
                    <FormItem title="活动负责人" titleWidth="86" marginTop="26">
                        <AutoCompleteStaff value={this.state.director_name} handle={this.changeStaff} />
                    </FormItem>
                    <FormItem title="参与方" titleWidth="86" marginTop="26">
                        <BusinessTable ref="partake" type={this.state.type} />
                    </FormItem>
                    <FormItem title="地点" titleWidth="86" marginTop="20">
                        <Input name="site" value={this.state.site} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="会议纪要" titleWidth="86" marginTop="26">
                        <TextArea name="record" value={this.state.record} handle={this.handle} style={{width: 236}} need={true}/>
                    </FormItem>
                    <FormItem title="备注" titleWidth="86" marginTop="26">
                        <TextArea name="remark" value={this.state.remark} handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="附件" titleWidth="86" marginTop="26">
                        <FormUpload name="files" handle={this.getFiles} />
                    </FormItem>
                </FormArea>
                <FormSubmit value="提交" />
            </form>
        )
    }
}

class BusinessTable extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tableTag: [
                {
                    name: "投资人",
                    isCheck: true
                },
                {
                    name: "项目",
                    isCheck: false
                },
                {
                    name: "内部人员",
                    isCheck: false
                },
            ],
            tagIndex: 0,
            investor: [{
                id: "",
                name: "",
                name_en: "",
                org: "",
                auth_type: "",
                phone: "",
                email: ""
            }],
            project: [{
                id: "",
                name: "",
                fphase_name: "",
                intention: "",
                treat_name: "",
                fstatus_name: "",
                project_leader: "",
                staff: ""
            }],
            staff: [{
                id: "",
                name: "",
                gender: "",
                org_name: "",
                dep_name: "",
                job: "",
                phone: ""
            }],
        }
    }

    check = (value) => {
        let tableTag = this.state.tableTag;
        for(let i=0;i<tableTag.length;i++){
            tableTag[i].isCheck = false;
        }
        tableTag[value].isCheck = true;
        this.setState({
            tableTag: tableTag,
            tagIndex: value
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    addInvestor = () => {
        let investor = this.state.investor;
        if( investor.length === 0 || investor[investor.length - 1].id){
            investor.push({
                id: "",
                name: "",
                name_en: "",
                org: "",
                auth_type: "",
                phone: "",
                email: ""
            });
            this.setState({
                investor: investor
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

    addProject = () => {
        let project = this.state.project;
        if( project.length === 0 || project[project.length - 1].id){
            project.push({
                id: "",
                name: "",
                fphase_name: "",
                intention: "",
                treat_name: "",
                fstatus_name: "",
                project_leader: "",
                staff: "",
            });
            this.setState({
                project: project
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

    addStaff = () => {
        let staff = this.state.staff;
        if( staff.length === 0 || staff[staff.length - 1].id){
            staff.push({
                id: "",
                name: "",
                gender: "",
                org_name: "",
                dep_name: "",
                job: "",
                phone: ""
            });
            this.setState({
                staff: staff
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

    render() {
        return(
            <div className={"flex1 " + Style.tableArea}>
                <div className={"flex flex-row flex-start " + Style.tableTag}>
                    {
                        this.state.tableTag.map((tag,i) => {
                            return(
                                <a className={ tag.isCheck ? Style.active : ""} onTouchTap={() => {this.check(i)}} key={i}>{tag.name}</a>
                            )
                        })
                    }
                </div>
                {
                    (() => {
                        switch (this.state.tagIndex){
                            case 0: return(
                                <div style={{padding: "10px 0 20px"}}>
                                    <div className={"flex flex-row flex-start " + Style.tableTitle} style={{padding: "0 10px"}}>
                                        <p className="flex-grow1" style={{width: 168}}>投资人姓名</p>
                                        <p className="flex-grow1" style={{width: 168}}>英文名称</p>
                                        <p className="flex-grow1" style={{width: 132}}>投资机构</p>
                                        <p className="flex-grow1" style={{width: 132}}>认证类型</p>
                                        <p className="flex-grow1" style={{width: 134}}>电话</p>
                                        <p className="flex-grow1" style={{width: 179}}>Email</p>
                                    </div>
                                    {
                                        this.state.investor.map((data,i)=>{
                                            return(
                                                <TagInvestor data={this.state.investor} itemData={data} index={i} handle={this.handle} key={i}/>
                                            )
                                        })
                                    }
                                    <AddButton name="追加投资人" handle={this.addInvestor} style={{ marginTop: 12, width: 112 }}/>
                                </div>
                            );
                                break;
                            case 1: return(
                                <div style={{padding: "10px 0 20px"}}>
                                    <div className={"flex flex-row flex-start " + Style.tableTitle} style={{padding: "0 10px"}}>
                                        <p className="flex-grow1" style={{width: 168}}>项目名称</p>
                                        <p className="flex-grow1" style={{width: 100}}>轮次</p>
                                        <p className="flex-grow1" style={{width: 122}}>投资意向</p>
                                        <p className="flex-grow1" style={{width: 110}}>工作状态</p>
                                        <p className="flex-grow1" style={{width: 126}}>项目进度</p>
                                        <p className="flex-grow1" style={{width: 132}}>项目经理</p>
                                        <p className="flex-grow1" style={{width: 168}}>项目方人员</p>
                                    </div>
                                    {
                                        this.state.project.map((data,i)=>{
                                            return(
                                                <TagProject data={this.state.project} itemData={data} index={i} handle={this.handle} key={i}/>
                                            )
                                        })
                                    }
                                    <AddButton name="追加项目" handle={this.addProject} style={{ marginTop: 12, width: 112 }}/>
                                </div>
                            );
                                break;
                            case 2: return(
                                <div style={{padding: "10px 0 20px"}}>
                                    <div className={"flex flex-row flex-start " + Style.tableTitle} style={{padding: "0 10px"}}>
                                        <p className="flex-grow1" style={{width: 128}}>名称</p>
                                        <p className="flex-grow1" style={{width: 110}}>性别</p>
                                        <p className="flex-grow1" style={{width: 160}}>所属公司</p>
                                        <p className="flex-grow1" style={{width: 162}}>所属部门</p>
                                        <p className="flex-grow1" style={{width: 148}}>岗位</p>
                                        <p className="flex-grow1" style={{width: 208}}>手机号</p>
                                    </div>
                                    {
                                        this.state.staff.map((data,i)=>{
                                            return(
                                                <TagStaff data={this.state.staff} itemData={data} index={i} handle={this.handle} key={i}/>
                                            )
                                        })
                                    }
                                    <AddButton name="追加公司参与人" handle={this.addStaff} style={{ marginTop: 12, width: 152 }}/>
                                </div>
                            );
                                break;
                        }
                    })()
                }
            </div>
        )
    }
}

class TagInvestor extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.itemData.id,
            name: nextProps.itemData.name,
            name_en: nextProps.itemData.name_en,
            org: nextProps.itemData.org,
            auth_type: nextProps.itemData.auth_type,
            phone: nextProps.itemData.phone,
            email: nextProps.itemData.email
        })
    }

    changeInvestor = (obj) => {
        let data = this.props.data;
        data[this.props.index] = obj;
        this.props.handle("investor",data);
    }

    delete = () => {
        let data = this.props.data;
        data.splice(this.props.index,1);
        this.props.handle("investor",data);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.tableTitle} style={{padding: "0 10px"}}>
                <div className="flex-grow1 flex flex-row flex-start align-center" style={{width: 168, height: 34}}>
                    {
                        this.state.name ? (
                            <p>{this.state.name}</p>
                        ) : (
                            <AutoCompleteInvestor value={this.state.name} width="146" handle={this.changeInvestor} />
                        )
                    }
                </div>
                <p className="flex-grow1" style={{width: 168}}>{this.state.name_en}</p>
                <p className="flex-grow1" style={{width: 132}}>{this.state.org}</p>
                <p className="flex-grow1" style={{width: 132}}>{this.state.auth_type}</p>
                <p className="flex-grow1" style={{width: 134}}>{this.state.phone}</p>
                <div className="flex-grow1 flex flex-row flex-between align-center" style={{width: 179}}>
                    <p>{this.state.email}</p>
                    <DeleteButton handle={this.delete}/>
                </div>
            </div>
        )
    }
}

class TagProject extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.itemData.id,
            name: nextProps.itemData.name,
            fphase_name: nextProps.itemData.fphase_name,
            intention: nextProps.itemData.intention,
            treat_name: nextProps.itemData.treat_name,
            fstatus_name: nextProps.itemData.fstatus_name,
            project_leader: nextProps.itemData.project_leader,
            staff: nextProps.itemData.staff
        })
    }

    changeProject = (obj) => {
        let data = this.props.data;
        data[this.props.index] = obj;
        this.props.handle("project",data);
    }

    changeStaff = (name,value) => {
        let data = this.props.data;
        data[this.props.index].staff = value;
        this.props.handle("project",data);
    }

    delete = () => {
        let data = this.props.data;
        data.splice(this.props.index,1);
        this.props.handle("project",data);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.tableTitle} style={{padding: "0 10px"}}>
                <div className="flex-grow1 flex flex-row flex-start align-center" style={{width: 168, height: 34}}>
                    {
                        this.state.name ? (
                            <p>{this.state.name}</p>
                        ) : (
                            <AutoCompleteProject value={this.state.name} width="146" handle={this.changeProject} />
                        )
                    }
                </div>
                <p className="flex-grow1" style={{width: 100}}>{this.state.fphase_name}</p>
                <p className="flex-grow1" style={{width: 122}}>{this.state.intention}</p>
                <p className="flex-grow1" style={{width: 110}}>{this.state.treat_name}</p>
                <p className="flex-grow1" style={{width: 126}}>{this.state.fstatus_name}</p>
                <p className="flex-grow1" style={{width: 132}}>{this.state.project_leader}</p>
                <div className="flex-grow1 flex flex-row flex-between align-center" style={{width: 168}}>
                    <Input name="staff" value={this.state.staff} handle={this.changeStaff} style={{width: 106}} />
                    <DeleteButton handle={this.delete}/>
                </div>
            </div>
        )
    }
}

class TagStaff extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.itemData
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.itemData.id,
            name: nextProps.itemData.name,
            gender: nextProps.itemData.gender,
            org_name: nextProps.itemData.org_name,
            dep_name: nextProps.itemData.dep_name,
            job: nextProps.itemData.job,
            phone: nextProps.itemData.phone
        })
    }

    changeStaff = (obj) => {
        let data = this.props.data;
        data[this.props.index] = obj;
        this.props.handle("staff",data);
    }

    delete = () => {
        let data = this.props.data;
        data.splice(this.props.index,1);
        this.props.handle("staff",data);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.tableTitle} style={{padding: "0 10px"}}>
                <div className="flex-grow1 flex flex-row flex-start align-center" style={{width: 128, height: 34}}>
                    {
                        this.state.name ? (
                            <p>{this.state.name}</p>
                        ) : (
                            <AutoCompleteStaff value={this.state.name} width="146" handle={this.changeStaff} />
                        )
                    }
                </div>
                <p className="flex-grow1" style={{width: 110}}>
                    {
                        (()=>{
                            switch (this.state.gender){
                                case "M":
                                    return "男";
                                    break;
                                case "F":
                                    return "女";
                                    break;
                            }
                        })()
                    }
                </p>
                <p className="flex-grow1" style={{width: 160}}>{this.state.org_name}</p>
                <p className="flex-grow1" style={{width: 162}}>{this.state.dep_name}</p>
                <p className="flex-grow1" style={{width: 148}}>{this.state.job}</p>
                <div className="flex-grow1 flex flex-row flex-between align-center" style={{width: 208}}>
                    <p>{this.state.phone}</p>
                    <DeleteButton handle={this.delete}/>
                </div>
            </div>
        )
    }
}