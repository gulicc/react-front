/**
 * Created by Galaxy065 on 2017/5/8.
 */
import React from "react";
import IndexHeader from "../common/indexHeader";
import { SlideBox, SlideInfo } from "../common/slideBox";
import ProjectInfo from "./projectInfo";
import InvestorInfo from "./investorInfo";
import BusinessInfo from "./businessInfo";
import { Table, Column } from "../common/table";
import Pagination from "../common/pagination";
import { AddProjectWindow, AddInvestorWindow, AddBusinessWindow } from "../common/addWindow";

import Utils from "../../../store/utils";
import ProjectAction from "../../../store/projectAction";
import InvestorAction from "../../../store/investorAction";
import ActivityAction from "../../../store/activityAction";

export default class BusinessIndex extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        Utils.closeSlideBox(()=>{
            this.refs.myProject.setState({
                isOpen: false
            })
            this.refs.myInvestor.setState({
                isOpen: false
            })
            this.refs.myActive.setState({
                isOpen: false
            })
        });
    }

    componentWillUnmount = () => {
        Utils.unbindCloseSlideBox();
    }

    changeList = (arr) => {
        for(let i=0;i<arr.length;i++){
            this.refs[arr[i]].setState({
                isOpen: false
            })
        }
    }

    render() {
        return(
            <div>
                <MyProject {...this.props} ref="myProject" changeList={this.changeList} />
                <MyInvestor {...this.props} ref="myInvestor" changeList={this.changeList} />
                <MyActive {...this.props} ref="myActive" changeList={this.changeList} />
            </div>
        )
    }
}

class MyProject extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addProject: false,
            isOpen: false,
            data: [],
            page_index: 1,
            page_cap: 10,
            count: "",
            tab: 0
        }
    }

    componentDidMount = () => {
        this.listMyProjects();
    }

    closeSlide = () => {
        this.setState({
            isOpen: false
        });
        this.listMyProjects();
    }

    listMyProjects = () => {
        ProjectAction.listMyProjects(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].name = <a onClick={this.showDetail.bind(this,records[i].project_id)}>{records[i].project_name}</a>;
                records[i].intent = <p>{records[i].project_afinilimt ? records[i].project_afinilimt : "-"} / {records[i].project_finilimt ? records[i].project_finilimt : "-"} {records[i].project_afinilimt || records[i].project_finilimt ? "万元" : ""}</p>;
                records[i].rate = <p>{records[i].project_evallevel}级({records[i].project_evalphase})</p>;
                records[i].fstatusName = <p>{records[i].fstatus_name}</p>;
                records[i].controller = <a onClick={()=>{this.modify(i)}}>快速评定</a>;
            }
            this.setState({
                count: count,
                data: records
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data,
            page_index: 1
        },()=>{
            this.listMyProjects();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.listMyProjects();
        })
    }

    chooseShow = (count) => {
        if(count === this.state.page_cap){
            return;
        }else{
            this.setState({
                page_index: 1,
                page_cap: count
            },()=>{
                this.listMyProjects();
            })
        }
    }

    showDetail = (id,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(false);
        this.props.changeList(["myInvestor","myActive"]);
        this.setState({
            id: id,
            isOpen: true
        })
    }

    openAddProjectWindow = () => {
        this.setState({
            addProject: true
        })
    }

    closeAddProjectWindow = () => {
        this.setState({
            addProject: false
        })
    }

    completeAddProject = () => {
        this.listMyProjects();
        layer.open({
            content: "添加项目成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        setTimeout(()=>{
            this.closeAddProjectWindow();
        },3000)
    }

    render() {
        return(
            <div className="rk-container">
                {
                    this.state.addProject ? <AddProjectWindow close={this.closeAddProjectWindow} complete={this.completeAddProject} /> : ""
                }
                <IndexHeader title="与我相关的项目"
                             link={{name: "查看所有项目", url: "/projectManagement"}}
                             button={{name: "添加项目", handle: this.openAddProjectWindow}} />
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="项目详情">
                                <ProjectInfo id={this.state.id} tab={this.state.tab} closeSlide={this.closeSlide} />
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                <Table dataSource={this.state.data} marginTop="20">
                    <Column title="项目名称" index="name" width="178" paddingLeft="20"/>
                    <Column title="轮次" index="fphase_name" width="142" />
                    <Column title="投资意向" index="intent" width="160" />
                    <Column title="工作状态" index="treatname" width="136" />
                    <Column title="评级" index="rate" width="126" />
                    <Column title="项目进度" index="fstatus_name" width="140" />
                    <Column title="我的身份" index="idstring" width="148" />
                </Table>
                {
                    this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                }
            </div>
        )
    }
}

class MyInvestor extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addInvestor: false,
            isOpen: false,
            data: [],
            page_index: 1,
            page_cap: 10,
            count: ""
        }
    }

    componentDidMount = () => {
        this.listMyInvestors();
    }

    closeSlide = () => {
        this.setState({
            isOpen: false
        });
        this.listMyInvestors();
    }

    listMyInvestors = () => {
        InvestorAction.listMyInvestors(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].investorName = <a onClick={this.showDetail.bind(this,records[i].id)}>{records[i].name}</a>;
            }
            this.setState({
                count: count,
                data: records
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data,
            page_index: 1
        },()=>{
            this.listMyInvestors();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.listMyInvestors();
        })
    }

    chooseShow = (count) => {
        if(count === this.state.page_cap){
            return;
        }else{
            this.setState({
                page_index: 1,
                page_cap: count
            },()=>{
                this.listMyInvestors();
            })
        }
    }

    showDetail = (id,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(false);
        this.props.changeList(["myProject","myActive"]);
        this.setState({
            id: id,
            isOpen: true
        })
    }

    openAddInvestorWindow = () => {
        this.setState({
            addInvestor: true
        })
    }

    closeAddInvestorWindow = () => {
        this.setState({
            addInvestor: false
        })
    }

    completeAddInvestor = () => {
        this.listMyInvestors();
        layer.open({
            content: "添加投资人成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        setTimeout(()=>{
            this.closeAddInvestorWindow();
        },3000)
    }

    render() {
        return(
            <div className="rk-container" style={{marginTop: 10}}>
                {
                    this.state.addInvestor ? <AddInvestorWindow close={this.closeAddInvestorWindow} complete={this.completeAddInvestor} /> : ""
                }
                <IndexHeader title="与我相关的投资人"
                             link={{name: "查看所有投资人", url: "/investorManagement"}}
                             button={{name: "添加投资人", handle: this.openAddInvestorWindow}} />
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="投资人详情">
                                <InvestorInfo id={this.state.id} close={this.closeSlide}/>
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                <Table dataSource={this.state.data} marginTop="20">
                    <Column title="投资人姓名" index="investorName" width="158" paddingLeft="20"/>
                    <Column title="投资机构" index="invest_type" width="132" />
                    <Column title="认证类型" index="auth_type" width="130" />
                    <Column title="关注领域" index="fields" width="210" />
                    <Column title="关注阶段" index="rounds" width="130" />
                    <Column title="电话" index="phone" width="140" />
                    <Column title="我的身份" index="idstring" width="130" />
                </Table>
                {
                    this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                }
            </div>
        )
    }
}

class MyActive extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            addBusiness: false,
            isOpen: false,
            data: [],
            page_index: 1,
            page_cap: 10,
            count: ""
        }
    }

    componentDidMount = () => {
        this.listMyActivities();
    }

    listMyActivities = () => {
        ActivityAction.listMyActivities(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].activeName = <a onClick={this.showDetail.bind(this,records[i].id)}>{records[i].title}</a>;
            }
            this.setState({
                count: count,
                data: records
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data,
            page_index: 1
        },()=>{
            this.listMyActivities();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.listMyActivities();
        })
    }

    chooseShow = (count) => {
        if(count === this.state.page_cap){
            return;
        }else{
            this.setState({
                page_index: 1,
                page_cap: count
            },()=>{
                this.listMyActivities();
            })
        }
    }

    showDetail = (id,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(false);
        this.props.changeList(["myProject","myInvestor"]);
        this.setState({
            id: id,
            isOpen: true
        })
    }

    openAddBusinessWindow = () => {
        this.setState({
            addBusiness: true
        })
    }

    closeAddBusinessWindow = () => {
        this.setState({
            addBusiness: false
        })
    }

    completeAddBusiness = () => {
        this.listMyActivities();
        layer.open({
            content: "添加业务活动成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        setTimeout(()=>{
            this.closeAddBusinessWindow();
        },3000)
    }

    render() {
        return(
            <div className="rk-container" style={{marginTop: 10}}>
                {
                    this.state.addBusiness ? <AddBusinessWindow close={this.closeAddBusinessWindow} complete={this.completeAddBusiness} /> : ""
                }
                <IndexHeader title="与我相关的业务活动"
                             link={{name: "查看所有业务活动", url: "/businessManagement"}}
                             button={{name: "添加业务活动", handle: this.openAddBusinessWindow}} />
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="业务活动详情">
                                <BusinessInfo id={this.state.id}/>
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                <Table dataSource={this.state.data} marginTop="20">
                    <Column title="活动主题" index="activeName" width="180" paddingLeft="20"/>
                    <Column title="活动类型" index="type" width="124" />
                    <Column title="活动对象" index="object" width="110" />
                    <Column title="活动时间" index="time" width="192" />
                    <Column title="活动形式" index="way" width="140" />
                    <Column title="附件" index="firstName" width="140" />
                    <Column title="我的身份" index="role" width="144" />
                </Table>
                {
                    this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                }
            </div>
        )
    }
}