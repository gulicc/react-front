/**
 * Created by Galaxy065 on 2017/5/10.
 */
import React from "react";
import Style from "./css/businessInfo.css";
import { InfoContent } from "../common/infoArea";
import { FormInput, FormTextArea } from "../common/formArea";
import { TipSelect } from "../common/tag";

import ActivityAction from "../../../store/activityAction";

export default class BusinessInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            data: {}
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id
        },()=>{
            this.queryActivity();
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.setState({
                id: nextProps.id
            },()=>{
                this.queryActivity();
            })
        }
    }

    queryActivity = () => {
        ActivityAction.queryActivity(this.state,(data)=>{
            this.setState({
                data: data
            })
        })
    }

    render() {
        return(
            <div style={{padding: "15px 0", backgroundColor: "#ffffff"}}>
                <InfoContent title="活动主题：" value={this.state.data.title} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="活动时间：" value={this.state.data.time} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="活动类型：" value={this.state.data.type} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="活动方式：" value={this.state.data.way} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="活动负责人：" value={this.state.data.director} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="参与方：" width="106" titleStyle={{lineHeight: "44px"}}>
                    <BusinessTable data={this.state.data}/>
                </InfoContent>
                <InfoContent title="地点：" value={this.state.data.site} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="会议纪要：" value={this.state.data.record} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="备注：" value={this.state.data.remark} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="会议附件：" value={this.state.data.files && this.state.data.files.length ? <a download href={this.state.data.files[0].path.path} target="_blank">{this.state.data.files[0].name}</a> : ""} width="106" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
            </div>
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
            data: this.props.data.obj_investors ? this.props.data.obj_investors : [],
            investor: [],
            project: [],
            staff: [],
            tagIndex: 0,
        }
    }

    componentWillReceiveProps = (nextProps) => {
        let project = nextProps.data.obj_projects ? nextProps.data.obj_projects : [];
        project.map((data)=>{
            data.intent = <p>{data.actual_fund_amount ? data.actual_fund_amount : "-"} / {data.fund_amount ? data.fund_amount : "-"} {data.actual_fund_amount || data.fund_amount ? "万元" : ""}</p>;
        });
        this.setState({
            investor: nextProps.data.obj_investors ? nextProps.data.obj_investors : [],
            project: project,
            staff: nextProps.data.obj_staffs ? nextProps.data.obj_staffs : []
        })
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

    render() {
        return(
            <div className={Style.tableArea} style={{margin: "15px 0"}}>
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
                                <TagTable dataSource={this.state.investor}>
                                    <TagColumn title="投资人姓名" index="name" width="168"/>
                                    <TagColumn title="英文名称" index="name_en" width="168"/>
                                    <TagColumn title="投资机构" index="company" width="132"/>
                                    <TagColumn title="认证类型" index="auth_type" width="132"/>
                                    <TagColumn title="电话" index="phone" width="134"/>
                                    <TagColumn title="Email" index="email"/>
                                </TagTable>
                            );
                                break;
                            case 1: return(
                                <TagTable dataSource={this.state.project}>
                                    <TagColumn title="项目名称" index="name" width="168"/>
                                    <TagColumn title="轮次" index="round" width="100"/>
                                    <TagColumn title="投资意向" index="intent" width="142"/>
                                    <TagColumn title="工作状态" index="work_status" width="110"/>
                                    <TagColumn title="项目进度" index="project_status" width="126"/>
                                    <TagColumn title="项目经理" index="project_manager" width="112"/>
                                    <TagColumn title="项目方人员" index="project_staff"/>
                                </TagTable>
                            );
                                break;
                            case 2: return(
                                <TagTable dataSource={this.state.staff}>
                                    <TagColumn title="名称" index="name" width="128"/>
                                    <TagColumn title="性别" index="sex" width="110"/>
                                    <TagColumn title="所属公司" index="company" width="160"/>
                                    <TagColumn title="所属部门" index="department" width="162"/>
                                    <TagColumn title="岗位" index="job" width="148"/>
                                    <TagColumn title="手机号" index="phone"/>
                                </TagTable>
                            );
                                break;
                        }
                    })()
                }
            </div>
        )
    }
}

class TagTable extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <table className={Style.table} style={this.props.tableStyle}>
                <thead>
                    <tr>
                        {
                            this.props.children.map((child,i) => {
                                return (
                                    <th key={i} style={{width: child.props.width, padding: child.props.padding}}>{child.props.title}</th>
                                )
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                {
                    this.props.dataSource.map((childs,i) => {
                        return(
                            <tr>
                                {
                                    React.Children.map(this.props.children, child => {
                                        if (child.type === TagColumn)
                                            return React.cloneElement(child, {
                                                data: this.props.dataSource[i]
                                            })
                                        else
                                            return child
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        )
    }
}

class TagColumn extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <td style={{padding: this.props.padding}}>
                {this.props.data[this.props.index]}
            </td>
        )
    }
}