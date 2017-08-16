/**
 * Created by Galaxy065 on 2017/5/10.
 */
import React from "react";
import Style from "./css/projectInfo.css";
import Tab from "../common/tab";
import { InfoTitle, InfoContent, InfoDetail, InfoRate, InfoTable, InfoColumn } from "../common/infoArea";
import {FormFile, FormItem, FormQuestion, FormRate, FormUpload} from "../common/formArea";
import {AddButton, DeleteButton, EditButton, WatchButton, FormButton} from "../common/defaultButton";
import { Input, TextArea, RadioTip, CheckTip } from "../common/defaultInput";
import Tag from "../common/tag";
import { AutoCompleteEnterprise, AutoCompleteOrg, AutoCompleteStaff } from "../common/autoComplete";
import { ProjectInvestor } from "./common/common";
import { AppointInvestor, AppointInvestorShow, AddProjectMember, ConfirmWindow, UpdateStatusTime } from "../common/alertWindow";
import { EnterpriseInfoWindow } from "../common/infoWindow";
import Icon from "../common/defaultIcon";
import { DatePicker, Popconfirm } from "antd";
import moment from 'moment';

import Utils from "../../../store/utils";
import Filter from "../../../store/filter";
import ProjectAction from "../../../store/projectAction";
import ActivityAction from "../../../store/activityAction";

export default class ProjectInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            data: {},
            tabData: [
                {
                    name: "项目信息",
                    width: 104,
                    active: true
                },
                {
                    name: "投资意向",
                    width: 104,
                    active: false
                },
                {
                    name: "互动记录",
                    width: 104,
                    active: false
                },
                {
                    name: "相关附件",
                    width: 104,
                    active: false
                },
            ],
            tabNow: 0,
            isWatch: true,
            sharesData: []
        }
    }

    componentDidMount = () => {
        let tabData = this.state.tabData;
        for(let i=0;i<tabData.length;i++){
            tabData[i].active = false;
        }
        tabData[this.props.tab].active = true;
        this.setState({
            id: this.props.id,
            tabNow: this.props.tab,
            tabData: tabData,
            isWatch: true
        },()=>{
            this.getProjectInfo();
        });
    }

    componentWillReceiveProps = (nextProps) => {
        let tabData = this.state.tabData;
        for(let i=0;i<tabData.length;i++){
            tabData[i].active = false;
        }
        tabData[nextProps.tab].active = true;
        this.setState({
            tabNow: nextProps.tab,
            tabData: tabData
        })
        if(nextProps.id !== this.props.id){
            this.setState({
                id: nextProps.id,
                isWatch: true
            },()=>{
                this.getProjectInfo();
            })
        }
    }

    getProjectInfo = () => {
        ProjectAction.getProjectInfo(this.state,(data)=>{
            data.schedule.reverse();
            let sharesData = [];
            for(let i=0;i<data.share.length;i++){
                sharesData.push({
                    extId: data.share[i].invest_id,
                    name: data.share[i].invest_personname,
                    org: data.share[i].invest_orgname
                })
            }
            this.setState({
                data: data,
                sharesData: sharesData
            })
        })
    }

    changeTab = (value,tabData) => {
        this.setState({
            isWatch: true,
            tabData: tabData,
            tabNow: value
        })
    }

    changeWatchAndEdit = (bool) => {
        Utils.slideScroll();
        this.setState({
            isWatch: bool
        })
    }

    complete = (value) => {
        this.changeWatchAndEdit(true);
        this.getProjectInfo();
        this.props.complete(value);
    }
0
    render() {
        return(
            <div>
                <div className={"flex flex-row flex-start align-center " + Style.header}>
                    <h3>{this.state.data.project_name}</h3>
                    <p>{this.state.data.fphase_name}</p>
                    <p>{this.state.data.project_finilimt ? this.state.data.project_finilimt + "万元" : ""}</p>
                    <div className={"flex flex-row flex-start align-center " + Style.headerProject}>
                        <p>项目状态：{this.state.data.treat_name}</p>
                        <p>{this.state.data.project_leader}</p>
                    </div>
                    <div className={"flex1 flex flex-row flex-wrap flex-start align-center " + Style.headerTag}>
                        {
                            this.state.data.tags && this.state.data.tags.length ? (
                                this.state.data.tags.map((tag,i)=>{
                                    return(
                                        <p key={i}>{tag.tagusage_name}</p>
                                    )
                                })
                            ) : ("")
                        }
                    </div>
                </div>
                <div style={{marginTop: 10}}>
                    {/*右侧固定操作栏*/}
                    <div className={Style.commonEdit}>
                        <Visible name={this.state.data.project_sharetype === "指定" ? "指定投资人(" + this.state.sharesData.length + "人)" : this.state.data.project_sharetype} id={this.state.id} sharesData={this.state.sharesData} complete={this.getProjectInfo} />
                        <Priority name={this.state.data.treat_name} id={this.state.id} complete={this.getProjectInfo} />
                        <Schedule data={this.state.data.schedule} id={this.state.id} complete={this.getProjectInfo} />
                        <Team data={this.state.data.team} id={this.state.id} complete={this.getProjectInfo} />
                    </div>
                    {/*左侧自适应栏*/}
                    <div className={Style.mainContent}>
                        <Tab tabData={this.state.tabData} handle={this.changeTab}>
                            {
                                this.state.tabNow === 0 || this.state.tabNow === 1 ? (
                                    this.state.isWatch ? <EditButton handle={() => {this.changeWatchAndEdit(false)}} style={{right: 20}} /> : <WatchButton handle={() => {this.changeWatchAndEdit(true)}} style={{right: 20}} />
                                ) : ("")
                            }
                        </Tab>
                        {
                            (()=>{
                                switch (this.state.tabNow) {
                                    case 0:
                                        return (
                                            this.state.isWatch ?  <ProjectDetail data={this.state.data} /> : <EditProjectDetail id={this.state.id} data={this.state.data} delete={this.props.delete} complete={this.complete} />
                                        )
                                    case 1:
                                        return (
                                            this.state.isWatch ? <ProjectIntention id={this.state.id} /> : <EditProjectIntention id={this.state.id} complete={this.complete} cancel={()=>{this.changeWatchAndEdit(true)}} />
                                        );
                                        break;
                                    case 2:
                                        return <ProjectInteract id={this.state.id} data={this.state.data} complete={this.getProjectInfo} />;
                                        break;
                                    case 3:
                                        return <ProjectFile id={this.state.id} data={this.state.data} complete={this.getProjectInfo} />;
                                        break;
                                }
                            })()
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export class ProjectDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: [],
            appoint: false,
            enterpriseInfoStatus: false
        }
    }

    componentDidMount = () => {
        if(this.props.data.schedule && this.props.data.schedule.length) {
            let schedule = [];
            for (let i = 0; i < this.props.data.schedule.length; i++) {
                schedule.push({
                    fstatus_id: this.props.data.schedule[i].fstatus_id,
                    prjschedule_at: this.props.data.schedule[i].prjschedule_at,
                    fstatus_name: this.props.data.schedule[i].fstatus_name
                });
            }
            schedule = schedule.reverse();
            this.setState({
                schedule: schedule
            })
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.data.schedule && nextProps.data.schedule.length){
            let schedule = [];
            for(let i=0;i<nextProps.data.schedule.length;i++){
                schedule.push({
                    fstatus_id: nextProps.data.schedule[i].fstatus_id,
                    prjschedule_at: nextProps.data.schedule[i].prjschedule_at,
                    fstatus_name: nextProps.data.schedule[i].fstatus_name
                });
            }
            schedule = schedule.reverse();
            this.setState({
                schedule: schedule
            })
        }
    }

    showAppoint = (value) => {
        this.setState({
            appoint: value
        })
    }

    showEnterpriseInfo = () => {
        this.setState({
            enterpriseInfoStatus: true
        })
    }

    closeWindow = () => {
        this.setState({
            enterpriseInfoStatus: false
        })
    }

    render() {
        return(
            <div>
                {
                    this.state.enterpriseInfoStatus ? <EnterpriseInfoWindow id={this.props.data.orginfo_id} closeWindow={this.closeWindow} /> : ""
                }
                <div style={{paddingTop: 15, paddingBottom: 40, backgroundColor: "#fff"}}>
                    <InfoTitle title="基本信息" />
                    <InfoContent title="项目名称：" value={this.props.data.project_name} width="90" marginTop="5"/>
                    <div className="flex flex-row flex-start">
                        <InfoContent title="轮次：" value={this.props.data.fphase_name} contentWidth="312" width="90"/>
                        <InfoContent title="金额：" value={this.props.data.project_finilimt ? this.props.data.project_finilimt + "万元" : ""} width="90"/>
                    </div>
                    <InfoContent title="标签：" width="90">
                        {
                            this.props.data.tags &&  this.props.data.tags.length ? (
                                this.props.data.tags.map((tag,i)=>{
                                    return(
                                        <span key={i} style={{marginRight: 10, lineHeight: "34px"}}>{tag.tagusage_name}</span>
                                    )
                                })
                            ) : ("")
                        }
                    </InfoContent>
                    <InfoContent title="行业领域：" width="90">
                        {
                            this.props.data.industry &&  this.props.data.industry.length ? (
                                this.props.data.industry.map((ind,i)=>{
                                    return(
                                        <span key={i} style={{marginRight: 10, lineHeight: "34px"}}>{ind.industry_name}</span>
                                    )
                                })
                            ) : ("")
                        }
                    </InfoContent>
                    <InfoContent title="企业：" width="90">
                        <a onClick={this.showEnterpriseInfo}>{this.props.data.orginfo_name}</a>
                    </InfoContent>
                    <InfoContent title="备注：" value={this.props.data.project_note} width="90"/>
                    <InfoTitle title="项目来源" marginTop="25"/>
                    <InfoContent title="渠道：" value={this.props.data.source_name} width="120" marginTop="5"/>
                    {
                        (()=>{
                            switch (parseInt(this.props.data.project_source)){
                                case 1:
                                    return (
                                        <InfoContent title="内部推荐人：" value={this.props.data.project_interrecmnd} width="120"/>
                                    )
                                    break;
                                case 2:
                                    return (
                                        <InfoContent title="外部推荐机构：" value={this.props.data.project_recmnd_ins} width="120"/>
                                    )
                                    break;
                                case 3:
                                    return (
                                        <InfoContent title="外部推荐人：" value={this.props.data.project_recmnd} width="120"/>
                                    )
                                    break;
                            }
                        })()
                    }
                    <InfoContent title="项目经理：" value={this.props.data.project_leader} width="120"/>
                    <InfoContent title="录入人：" value={this.props.data.createbyName} width="120"/>
                    <InfoTitle title="评定" marginTop="25"/>
                    <InfoContent title="问卷得分：" value={this.props.data.project_score ? this.props.data.project_score + "分" : 0 + "分"} width="102" marginTop="5" />
                    <InfoContent title="录入人建议：" value={this.props.data.project_evaltreatname} width="102"/>
                    <InfoContent title={"评级(" + this.props.data.project_evalphase + ")："} width="102">
                        <InfoRate isEdit={this.props.data.project_evalphase === "初评" ? false : true} rate={this.props.data.project_evallevel ? this.props.data.project_evallevel : "-"}/>
                    </InfoContent>
                    <InfoTitle title="项目亮点" marginTop="20"/>
                    <InfoDetail content={this.props.data.project_advantage} />
                    <InfoTitle title="行业分析" marginTop="25"/>
                    <InfoDetail content={this.props.data.project_industryany} />
                    <InfoTitle title="运营/财务数据" marginTop="25"/>
                    <InfoDetail content={this.props.data.project_operation} />
                    <InfoTitle title="资金用途" marginTop="25"/>
                    <InfoDetail content={this.props.data.project_moneyuse} />
                </div>
            </div>
        )
    }
}

class EditProjectDetail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            pname: this.props.data.project_name,
            advantage: this.props.data.project_advantage,
            industryany: this.props.data.project_industryany,
            operation: this.props.data.project_operation,
            moneyuse: this.props.data.project_moneyuse,
            finilimt: this.props.data.project_finilimt,
            sharetype: this.props.data.project_sharetype,
            shares: [],
            treat_id: this.props.data.treat_id,
            treat_name: this.props.data.treat_name,
            phase: this.props.data.fphase_id,
            schedule: [],
            industrys: [],
            org_id: this.props.data.orginfo_id,
            org_name: this.props.data.orginfo_name,
            pnote: this.props.data.project_note,
            tags: [],

            psource: this.props.data.project_source,
            recmndins: this.props.data.project_recmnd_ins,
            recmndinsid: this.props.data.project_recmnd_insid,
            recmnd: this.props.data.project_recmnd,
            interrecmnd: this.props.data.project_interrecmnd,
            interrecmndid: this.props.data.project_interrecmndid,
            leader: this.props.data.project_leader,
            leaderid: this.props.data.project_leaderid,

            project_evallevel: this.props.data.project_evallevel,
            project_evalphase: this.props.data.project_evalphase,
            project_score: this.props.data.project_score,

            team: [],
            treatData: []
        }
    }

    componentWillMount = () => {
        let industry = [];
        let tags = [];
        let sharesData = [];
        for(let i=0;i<this.props.data.industry.length;i++){
            industry.push(this.props.data.industry[i].industry_id);
        }
        for(let i=0;i<this.props.data.tags.length;i++){
            tags.push(this.props.data.tags[i].tag_id);
        }
        for(let i=0;i<this.props.data.share.length;i++){
            sharesData.push({
                extId: this.props.data.share[i].invest_id,
                name: this.props.data.share[i].invest_personname,
                org: this.props.data.share[i].invest_orgname
            })
        }
        this.setState({
            industrys: industry,
            tags: tags,
            sharesData: sharesData
        },()=>{
            ProjectAction.queryTreats((data)=>{
                this.setState({
                    treatData: data
                });
            })
        });
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeEnterprise = (obj) => {
        this.handle("org_id",obj.id);
        this.handle("org_name",obj.name);
    }

    changeSource = (name,data) => {
        this.setState({
            [name]: data,
            recmndins: "",
            recmndinsid: "",
            recmnd: "",
            interrecmnd: "",
            interrecmndid: "",
        })
    }

    changeOrg= (obj) => {
        this.handle("recmndins",obj.name);
        this.handle("recmndinsid",obj.id);
    }

    changeInterrecmnd = (obj) => {
        this.handle("interrecmnd",obj.name);
        this.handle("interrecmndid",obj.id);
    }

    changeLeader = (obj) => {
        this.handle("leader",obj.name);
        this.handle("leaderid",obj.id);
    }

    rate = (value,callback) => {
        this.setState({
            project_evalphase: "正式",
            project_evallevel: value
        },() => {
            callback
        })
    }

    _submit = () => {
        ProjectAction.updateProject(this.state,(data)=>{
            layer.open({
                content: "项目信息修改成功！",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            setTimeout(()=>{
                this.props.complete("info");
            },3000)
        })
    }

    _delete = () => {
        ProjectAction.deleteProject(this.state.id,()=>{
            layer.open({
                content: "项目删除成功！",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            setTimeout(()=>{
                this.props.delete();
            },3000)
        })
    }

    render() {
        return(
            <div>
                <div style={{paddingTop: 15, paddingBottom: 40, backgroundColor: "#ffffff"}}>
                    <InfoTitle title="基本信息"/>
                    <div style={{paddingLeft: 30}}>
                        <FormItem title="项目名称" titleWidth="86" marginTop="26">
                            <Input name="pname" value={this.state.pname} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="轮次" titleWidth="86" marginTop="26">
                            <RadioTip name="phase" getData="queryInvestRounds" init={this.state.phase} handle={this.handle} />
                        </FormItem>
                        <FormItem title="标签" titleWidth="86" marginTop="26">
                            <Tag name="tags" type={[1]} handle={this.handle} init={this.state.tags} />
                        </FormItem>
                        <FormItem title="行业领域" titleWidth="86" marginTop="26">
                            <CheckTip name="industrys" getData="queryIndustries" init={this.state.industrys} handle={this.handle} />
                        </FormItem>
                        <FormItem title="金额" titleWidth="86" marginTop="26">
                            <Input name="finilimt" value={this.state.finilimt} handle={this.handle} style={{width: 236}} tip="万元" />
                        </FormItem>
                        <FormItem title="企业名称" titleWidth="86" marginTop="26">
                            <AutoCompleteEnterprise value={this.state.org_name} handle={this.changeEnterprise} />
                        </FormItem>
                        <FormItem title="备注" titleWidth="86" marginTop="26">
                            <TextArea name="pnote" value={this.state.pnote} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                    </div>
                    <InfoTitle title="项目来源" marginTop="35"/>
                    <div style={{paddingLeft: 30}}>
                        <FormItem title="渠道" titleWidth="48" marginTop="26">
                            <RadioTip getData="listProjectSources" name="psource" init={this.state.psource} handle={this.changeSource} />
                        </FormItem>
                        {
                            (()=>{
                                switch (parseInt(this.state.psource)){
                                    case 1:
                                        return (
                                            <FormItem title="内部推荐人" titleWidth="136" marginTop="26">
                                                <AutoCompleteStaff value={this.state.interrecmnd} handle={this.changeInterrecmnd} />
                                            </FormItem>
                                        )
                                        break;
                                    case 2:
                                        return (
                                            <FormItem title="外部推荐机构" titleWidth="136" marginTop="26">
                                                <AutoCompleteOrg value={this.state.recmndins} handle={this.changeOrg} />
                                            </FormItem>
                                        )
                                        break;
                                    case 3:
                                        return (
                                            <FormItem title="外部推荐人" titleWidth="136" marginTop="26">
                                                <Input name="recmnd" value={this.state.recmnd} handle={this.handle} style={{width: 236}} />
                                            </FormItem>
                                        )
                                        break;
                                }
                            })()
                        }
                        <FormItem title="项目经理" titleWidth="134" marginTop="26">
                            <AutoCompleteStaff value={this.state.leader} handle={this.changeLeader} />
                        </FormItem>
                        <FormItem title="录入人" titleWidth="134" marginTop="26">
                            <p>{this.props.data.createbyName}</p>
                        </FormItem>
                    </div>
                    <InfoTitle title="评定" marginTop="25"/>
                    <div style={{paddingLeft: 30}}>
                        <FormItem title="问卷得分：" titleWidth="102" marginTop="26">
                            <FormQuestion score={this.state.project_score ? this.state.project_score : 0} handle={this.handle}/>
                        </FormItem>
                        <FormItem title="录入人建议：" titleWidth="102" marginTop="26">
                            <p>{this.props.data.project_evaltreatname}</p>
                        </FormItem>
                        <FormItem title={"评级(" + this.state.project_evalphase + ")："} titleWidth="102" marginTop="26">
                            <FormRate isEdit={this.state.project_evalphase === "初评" ? false : true} rate={this.state.project_evallevel ? this.state.project_evallevel : "-"} handle={this.rate}/>
                        </FormItem>
                    </div>
                </div>
                <div style={{marginTop: 10, padding: "26px 0", backgroundColor: "#ffffff"}}>
                    <InfoTitle title="项目亮点"/>
                    <div style={{marginTop: 26, padding: "0 30px"}}>
                      <TextArea name="advantage" value={this.state.advantage} handle={this.handle} style={{width: "100%"}} />
                    </div>
                    <InfoTitle title="行业分析" marginTop="26"/>
                    <div style={{marginTop: 26, padding: "0 30px"}}>
                        <TextArea name="industryany" value={this.state.industryany} handle={this.handle} style={{width: "100%"}} />
                    </div>
                    <InfoTitle title="运营/财务数据" marginTop="26"/>
                    <div style={{marginTop: 26, padding: "0 30px"}}>
                        <TextArea name="operation" value={this.state.operation} handle={this.handle} style={{width: "100%"}} />
                    </div>
                    <InfoTitle title="资金用途" marginTop="26"/>
                    <div style={{marginTop: 26, padding: "0 30px"}}>
                        <TextArea name="moneyuse" value={this.state.moneyuse} handle={this.handle} style={{width: "100%"}} />
                    </div>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="删除该项目"
                                confirm={{
                                    content: <span>确认要删除该项目吗？（<span style={{color: "#ff530c"}}>慎重</span>）</span>,
                                    saveHandle: this._delete
                                }}
                                style={{marginRight: 20, backgroundColor: "#17b2e5"}}
                    />
                    <FormButton buttonName="保存"
                                confirm={{
                                    content: "确认要提交所修改的信息吗？",
                                    saveHandle: this._submit
                                }}
                                style={{backgroundColor: "#ff530c"}}
                    />
                </div>
            </div>
        )
    }
}

export class ProjectIntention extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            data: {},
            investlistLeader: [],
            investlist: []
        };
        this.titleStyle = {
            lineHeight: "40px"
        };
        this.valueStyle = {
            lineHeight: "40px",
            fontSize: 16,
            fontWeight: "bold"
        };
    }

    componentDidMount = () => {
        this.getProjectInvest(this.props.id);
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.getProjectInvest(nextProps.id);
        }
    }

    getProjectInvest = (id) => {
        ProjectAction.getProjectInvest(id,(data)=>{
            let investlistLeader = [];
            let investlist = [];
            for(let i=0;i<data.investlist.length;i++){
                if(data.investlist[i].invlist_isleader === "Y"){
                    investlistLeader.push(data.investlist[i]);
                }else{
                    investlist.push(data.investlist[i]);
                }
            }
            this.setState({
                data: data,
                investlist: investlist,
                investlistLeader: investlistLeader
            })
        })
    }

    render() {
        return(
            <div>
                <div style={{padding: "15px 0 26px", backgroundColor: "#fff"}}>
                    <InfoTitle title="基本信息"/>
                    <div className="flex flex-row flex-start" style={{marginTop: 2}}>
                        <InfoContent title="拟融资金额：" width="110" contentWidth="244" titleStyle={this.titleStyle}>
                            <p style={this.valueStyle}>{this.state.data.project_finilimt}</p>
                            {
                                this.state.data.project_finilimt ?  <p style={this.valueStyle}>万元</p> : ""
                            }
                        </InfoContent>
                        {/*<InfoContent title="拟出让股份：" width="110" contentWidth="244" titleStyle={this.titleStyle}>*/}
                            {/*<p style={this.valueStyle}>{this.state.data.project_finshare}</p>*/}
                            {/*{*/}
                                {/*this.state.data.project_finshare ?  <p style={this.valueStyle}>股</p> : ""*/}
                            {/*}*/}
                        {/*</InfoContent>*/}
                        <InfoContent title="拟投后估值：" width="110" contentWidth="244" titleStyle={this.titleStyle}>
                            <p style={this.valueStyle}>{this.state.data.project_finvalue}</p>
                            {
                                this.state.data.project_finvalue ?  <p style={this.valueStyle}>万元</p> : ""
                            }
                        </InfoContent>
                        <InfoContent title="可谈空间预计：" width="110" titleStyle={this.titleStyle}>
                            <p style={this.valueStyle}>{this.state.data.project_offvalue}</p>
                            {
                                this.state.data.project_offvalue ?  (
                                    <div>
                                        <span style={this.valueStyle}>%</span>
                                        <span style={{marginLeft: 16}}>
                                            <span style={this.valueStyle}>Off</span>
                                        </span>
                                    </div>
                                ) : ""
                            }
                        </InfoContent>
                    </div>
                    <div className="flex flex-row flex-start">
                        <InfoContent title="实际融资金额：" width="110" contentWidth="244" titleStyle={this.titleStyle}>
                            <p style={this.valueStyle}>{this.state.data.project_afinilimt}</p>
                            {
                                this.state.data.project_afinilimt ?  <p style={this.valueStyle}>万元</p> : ""
                            }
                        </InfoContent>
                        {/*<InfoContent title="实际出让股份：" width="110" contentWidth="244" titleStyle={this.titleStyle}>*/}
                            {/*<p style={this.valueStyle}>{this.state.data.project_afinshare}</p>*/}
                            {/*{*/}
                                {/*this.state.data.project_afinshare ?  <p style={this.valueStyle}>股</p> : ""*/}
                            {/*}*/}
                        {/*</InfoContent>*/}
                        <InfoContent title="实际投后估值：" width="110" contentWidth="244" titleStyle={this.titleStyle}>
                            <p style={this.valueStyle}>{this.state.data.project_afinvalue}</p>
                            {
                                this.state.data.project_afinvalue ?  <p style={this.valueStyle}>万元</p> : ""
                            }
                        </InfoContent>
                    </div>
                    <InfoContent title="资金用途：" value={this.state.data.project_moneyuse} width="110" titleStyle={this.titleStyle} valueStyle={{padding: "7px 0", lineHeight: "26px"}}/>
                    <InfoTitle title="领投信息" marginTop="12" />
                    <div style={{padding: "0 20px"}}>
                        <InfoTable dataSource={this.state.investlistLeader} tableStyle={{ marginTop: 15 }}>
                            <InfoColumn title="投资人" index="invlist_investor" width="150" padding="0 14px 0 46px"/>
                            <InfoColumn title="投资机构" index="invlist_investorg" width="150"/>
                            <InfoColumn title="投资金额" index="invlist_planmoney" width="150"/>
                            <InfoColumn title="进度状态" index="fstatus_name" width="150" padding="0 46px 0 0"/>
                        </InfoTable>
                    </div>
                    <InfoTitle title="跟投信息" marginTop="25" />
                    <div style={{padding: "0 20px"}}>
                        <InfoTable dataSource={this.state.investlist} tableStyle={{ marginTop: 15 }}>
                            <InfoColumn title="投资人" index="invlist_investor" width="150" padding="0 14px 0 46px"/>
                            <InfoColumn title="投资机构" index="invlist_investorg" width="150"/>
                            <InfoColumn title="投资金额" index="invlist_planmoney" width="150"/>
                            <InfoColumn title="进度状态" index="fstatus_name" width="150" padding="0 46px 0 0"/>
                        </InfoTable>
                    </div>
                </div>
            </div>
        )
    }
}

class EditProjectIntention extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            finilimt: "",
            finshare: "",
            offvalue: "",
            finvalue: "",
            afinilimt: "",
            afinshare: "",
            afinvalue: "",
            moneyuse: "",
            investlistLeader: [],
            investlistFollow: [],
            investlist: []
        }
    }

    componentDidMount = () => {
        this.getProjectInvest(this.props.id);
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.getProjectInvest(nextProps.id);
            this.setState({
                id: nextProps.id
            })
        }
    }

    getProjectInvest = (id) => {
        ProjectAction.getProjectInvest(id,(data)=>{
            this.setState({
                finilimt: data.project_finilimt,
                finshare: data.project_finshare,
                finvalue: data.project_finvalue,
                offvalue: data.project_offvalue,
                afinilimt: data.project_afinilimt,
                afinshare: data.project_afinshare,
                afinvalue: data.project_afinvalue,
                moneyuse: data.project_moneyuse,
            });
            let investlistLeader = [];
            let investlistFollow = [];
            for(let i=0;i<data.investlist.length;i++){
                if(data.investlist[i].invlist_isleader === "Y"){
                    investlistLeader.push(data.investlist[i]);
                }else{
                    investlistFollow.push(data.investlist[i]);
                }
            }
            this.setState({
                investlistLeader: investlistLeader,
                investlistFollow: investlistFollow
            });
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    _submit = () => {
        let investlist = [];
        let investData = this.refs.investorLeader.state.investlist.concat(this.refs.investorFollow.state.investlist);
        for(let i=0;i<investData.length;i++){
            if(investData[i].investorid){
                investlist.push(investData[i]);
            }
        }
        this.setState({
            investlist: investlist
        },()=>{
            ProjectAction.updateProjectInvest(this.state,(data)=>{
                layer.open({
                    content: "项目投资意向信息修改成功！",
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                setTimeout(()=>{
                    this.props.complete("intention");
                },3000)
            })
        })
    }

    _cancel = () => {
        this.props.cancel();
    }

    render() {
        return(
            <div>
                <div style={{padding: "15px 0 26px", backgroundColor: "#fff"}}>
                    <InfoTitle title="基本信息"/>
                    <div style={{padding: "0px 10px 0 20px"}}>
                        <div className="flex flex-row flex-start" style={{marginTop: 26}}>
                            <FormItem title="拟融资金额" titleWidth="108">
                                <Input name="finilimt" value={this.state.finilimt} handle={this.handle} filter={Filter.checkNum} style={{width: 60}} tip="万元"/>
                            </FormItem>
                            {/*<FormItem title="拟出让股份" titleWidth="108" marginLeft="58">*/}
                                {/*<Input name="finshare" value={this.state.finshare} handle={this.handle} filter={Filter.checkNum} style={{width: 80}} tip="股"/>*/}
                            {/*</FormItem>*/}
                            <FormItem title="拟投后估值" titleWidth="108" marginLeft="58">
                                <Input name="finvalue" value={this.state.finvalue} handle={this.handle} filter={Filter.checkNum} style={{width: 60}} tip="万元"/>
                            </FormItem>
                            <FormItem title="可谈空间预计" titleWidth="100" marginLeft="40">
                                <Input name="offvalue" value={this.state.offvalue} handle={this.handle} filter={Filter.checkPercent} style={{width: 60}} tip={<div><span>%</span><span style={{marginLeft: 16}}>Off</span></div>}/>
                            </FormItem>
                        </div>
                        <div className="flex flex-row flex-start" style={{marginTop: 26}}>
                            <FormItem title="实际融资金额" titleWidth="108">
                                <Input name="afinilimt" value={this.state.afinilimt} handle={this.handle} filter={Filter.checkNum} style={{width: 60}} tip="万元"/>
                            </FormItem>
                            {/*<FormItem title="实际出让股份" titleWidth="108" marginLeft="58">*/}
                                {/*<Input name="afinshare" value={this.state.afinshare} handle={this.handle} filter={Filter.checkNum} style={{width: 80}} tip="股"/>*/}
                            {/*</FormItem>*/}
                            <FormItem title="实际投后估值" titleWidth="108" marginLeft="58">
                                <Input name="afinvalue" value={this.state.afinvalue} handle={this.handle} filter={Filter.checkNum} style={{width: 60}} tip="万元"/>
                            </FormItem>
                        </div>
                        <FormItem title="资金用途" titleWidth="108" marginTop="26">
                            <div className="flex1">
                                <TextArea name="moneyuse" value={this.state.moneyuse} handle={this.handle} style={{width: "100%"}}/>
                            </div>
                        </FormItem>
                    </div>
                    <InfoTitle title="领投信息" marginTop="26" />
                    <div style={{padding: "0 20px"}}>
                        <ProjectInvestor ref="investorLeader" isLeader="Y" init={this.state.investlistLeader} />
                    </div>
                    <InfoTitle title="跟投信息" marginTop="26" />
                    <div style={{padding: "0 20px"}}>
                        <ProjectInvestor ref="investorFollow" isLeader="N" init={this.state.investlistFollow} isDelete={true} isAdd={true} />
                    </div>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="保存"
                                confirm={{
                                    content: "确认要提交所修改的信息吗",
                                    saveHandle: this._submit
                                }}
                                style={{marginRight: 20, backgroundColor: "#17b2e5"}}
                    />
                    <FormButton buttonName="取消"
                                confirm={{
                                    content: "确认要放弃修改吗？",
                                    saveHandle: this._cancel
                                }}
                                style={{backgroundColor: "#ff530c"}}
                    />
                </div>
            </div>
        )
    }
}

export class ProjectInteract extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: "",
            data: [],
            title: "",
            stime: "",
            etime: "",
            type: 1,
            way: "",
            director: Utils.getLoginData().platform_id,
            staff: Utils.getLoginData().platform_personname,
            record: "",
            obj_projects: [],
            files: [],
            site: "",
            remark: "",
            isEdit: false
        }
    }

    componentDidMount = () => {
        let data = this.props.data.actors;
        for(let i=0;i<data.length;i++){
            if(data[i].files_path){
                data[i].files = <a download href={data[i].files_path}>会议记录附件</a>;
            }
        }
        this.setState({
            id: this.props.id,
            data: data,
            title: "对项目【" + this.props.data.project_name + "】的单方拜访"
        })
    }

    componentWillReceiveProps = (nextProps) => {
        let data = nextProps.data.actors;
        for(let i=0;i<data.length;i++){
            if(data[i].files_path){
                data[i].files = <a download href={data[i].files_path}>会议记录附件</a>;
            }
        }
        this.setState({
            id: nextProps.id,
            data: data,
            title: "对项目【" + nextProps.data.project_name + "】的单方拜访"
        })
    }

    changeIsEdit = () => {
        this.setState({
            isEdit: !this.state.isEdit
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeStaff = (obj) => {
        this.handle("director",obj.id);
        this.handle("staff",obj.name);
    }

    getTime = (value, dateString) => {
        this.handle("stime",dateString);
    }

    getFiles = (name,fileId) => {
        if(fileId === "loading"){
            this.handle(name,fileId);
        }else{
            let files = [];
            files.push(fileId);
            this.handle(name,files);
        }
    }

    _submit = (e) => {
        e.preventDefault();
        let obj_projects = [];
        obj_projects.push({
            id:this.state.id,
            staff:""});
        this.setState({
            obj_projects: obj_projects,
        },()=>{
            ActivityAction.createActivity(this.state,(data)=>{
                this.setState({
                    title: "",
                    stime: "",
                    etime: "",
                    type: 1,
                    way: "",
                    director: Utils.getLoginData().platform_id,
                    staff: Utils.getLoginData().platform_personname,
                    record: "",
                    obj_projects: [],
                    files: [],
                    site: "",
                    remark: ""
                },()=>{
                    this.refs.way.reset();
                    this.refs.files.reset();
                    this.props.complete();
                });
            },()=>{return false});
        });
    }

    render() {
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
            <div>
                <div style={{padding: "10px 0 20px", backgroundColor: "#fff"}}>
                    <div className={"flex flex-row flex-start " + Style.infoList}>
                        <p>累计活动<span>{this.state.data.length}</span>次</p>
                        <p>本年度活动<span>{this.props.data.actors_thisyear}</span>次</p>
                    </div>
                    <div style={{ padding: "0 10px"}}>
                        <InfoTable dataSource={this.state.data} tableStyle={{ width: "100%" }}>
                            <InfoColumn title="活动时间" index="actor_stime" width="200" padding="0 14px 0 20px"/>
                            <InfoColumn title="活动主题" index="actor_title" width="202"/>
                            <InfoColumn title="活动类型" index="acttype_name" width="124"/>
                            <InfoColumn title="活动对象" index="objecttyp_name" width="120"/>
                            <InfoColumn title="活动负责人" index="platform_personname" width="114"/>
                            <InfoColumn title="活动形式" index="actorchnlogtyp_name" width="102"/>
                            <InfoColumn title="会议记录附件" index="files" width="162" padding="0 20px 0 0"/>
                        </InfoTable>
                    </div>
                </div>
                <div className={"flex flex-row flex-start align-center " + Style.activeToggle}>
                    <a className="flex flex-row flex-start align-center" onClick={this.changeIsEdit}>
                        <i className={this.state.isEdit ? Style.show : ""}></i>
                        <span>新增相关业务活动</span>
                    </a>
                </div>
                {
                    this.state.isEdit ? (
                        <form style={{padding: 30, backgroundColor: "#fff"}} onSubmit={this._submit.bind(this)}>
                            <FormItem title="活动主题" titleWidth="106">
                                <Input name="title" value={this.state.title} handle={this.handle} style={{width: 236}} need={true}/>
                            </FormItem>
                            <FormItem title="活动时间" titleWidth="106" marginTop="26">
                                <DatePicker
                                    value={this.state.stime ? moment(this.state.stime, 'YYYY-MM-DD HH:mm') : ""}
                                    showTime={{format: "HH:mm"}}
                                    format="YYYY-MM-DD HH:mm"
                                    allowClear={false}
                                    onChange={this.getTime}
                                    style={{width: 236}}
                                    getCalendarContainer={() => document.getElementById('slide')}
                                />
                                <span style={{marginLeft: 20, lineHeight: "28px", color: "#ff530c"}}>*</span>
                            </FormItem>
                            <FormItem title="活动方式" titleWidth="91" marginTop="26">
                                <RadioTip ref="way" init={this.state.way} name="way" data={way} handle={this.handle} style={{paddingRight: 70}} need={true}/>
                            </FormItem>
                            <FormItem title="活动负责人" titleWidth="106" marginTop="26">
                                <AutoCompleteStaff value={this.state.staff} handle={this.changeStaff} />
                            </FormItem>
                            <FormItem title="地点" titleWidth="106" marginTop="20">
                                <Input name="site" value={this.state.site} handle={this.handle} style={{width: 236}} />
                            </FormItem>
                            <FormItem title="会议纪要" titleWidth="106" marginTop="26">
                                <TextArea name="record" value={this.state.record} handle={this.handle} style={{width: 236}} need={true}/>
                            </FormItem>
                            <FormItem title="备注" titleWidth="106" marginTop="26">
                                <TextArea name="remark" value={this.state.remark} handle={this.handle} style={{width: 236}}/>
                            </FormItem>
                            <FormItem title="附件" titleWidth="106" marginTop="26">
                                <FormUpload ref="files" name="files" handle={this.getFiles}/>
                            </FormItem>
                            <input type="submit" value="添加" className={Style.projectSubmit} />
                        </form>
                    ) : ("")
                }
            </div>
        )
    }
}

export class ProjectFile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            data: [],
            fileData: []
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            data: this.props.data.attaches
        })
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            id: nextProps.id,
            data: nextProps.data.attaches
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    deleteFile = (attachid) => {
        ProjectAction.projectAttachDelete(attachid,this.state.id,(data)=>{
            this.props.complete();
        })
    }

    _submit = (e) => {
        e.preventDefault();
        let fileData = [];
        let files = this.refs.files.state.files;
        if(files[files.length - 1].fileStatus === "loading"){
            layer.open({
                content: '请等待附件上传完成或删除该附件',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            this.setState({
                submitStatus: true
            });
            return false;
        }
        for(let i=0;i<files.length;i++){
            if(files[i].id){
                fileData.push({
                    id: files[i].id,
                    desc: files[i].desc
                });
            }
        }
        this.setState({
            fileData: fileData
        },()=>{
            ProjectAction.projectAttachData(this.state,(data)=>{
                this.refs.files.reset();
                this.props.complete();
            })
        })
    }

    render() {
        return(
            <div>
                <div style={{padding: "20px 20px 30px", backgroundColor: "#fff"}}>
                    <div className={"flex flex-row flex-start " + Style.fileTitle}>
                        <p style={{width: 140}}>文件名</p>
                        <p style={{width: 120}}>上传人</p>
                        <p style={{width: 208}}>上传时间</p>
                        <p style={{width: 128}}>备注</p>
                        <p>操作</p>
                    </div>
                    {
                        this.state.data.map((file,i)=>{
                            return(
                                <div className={"flex flex-row flex-start " + Style.fileName} key={i}>
                                    <a download href={file.prjattach_path} style={{width: 140}}>{file.prjattach_name}</a>
                                    <p style={{width: 120}}>{file.createbyname}</p>
                                    <p style={{width: 208}}>{file.createat}</p>
                                    <p style={{width: 128}}>{file.prjattach_note}</p>
                                    <div className="flex flex-column flex-center">
                                        <Popconfirm placement="topRight" title={"确认要删除文件名为" + file.prjattach_name + "(" + file.prjattach_note + ")的文件吗？"} onConfirm={()=>{this.deleteFile(file.prjattach_id)}} onCancel={this.cancel} okText="Yes" cancelText="No" getPopupContainer={() => document.getElementById('slide')}>
                                            <div>
                                                <Icon name="iconFalseSmall" />
                                            </div>
                                        </Popconfirm>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                {
                    this.props.isWatch ? ("") : (
                        <form onSubmit={this._submit.bind(this)} style={{marginTop: 10}}>
                            <div style={{ marginTop: 10, padding: "25px 0 30px", backgroundColor: "#fff"}}>
                                <InfoTitle title="新增相关附件"/>
                                <div style={{padding: "0 20px"}}>
                                    <FormFile marginTop="20" ref="files" />
                                    <input type="submit" value="添加" className={Style.projectSubmit} />
                                </div>
                            </div>
                        </form>
                    )
                }
            </div>
        )
    }
}

class Visible extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectStatus: false,
            data: [{
                name: "公开",
                value: 0
            }, {
                name: "私密",
                value: 1
            }, {
                name: "指定投资人("+ this.props.sharesData.length + "人)",
                value: 2
            }],
            confirmStatus: false,
            content: "",
            name: "",
            appointStatus: false
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: [{
                name: "公开",
                value: 0
            }, {
                name: "私密",
                value: 1
            }, {
                name: "指定投资人("+ nextProps.sharesData.length + "人)",
                value: 2
            }]
        })
    }

    choose = () => {
        if(!this.state.selectStatus){
            this.refs.input.focus();
            this.setState({
                selectStatus: true
            })
        }else{
            return false
        }
    }

    _blur = () => {
        setTimeout(()=>{
            this.setState({
                selectStatus: false
            })
        },200)
    }

    close = () => {
        this.setState({
            confirmStatus: false,
            appointStatus: false
        })
    }

    confirm = (obj) => {
        if(obj.value !== 2) {
            this.setState({
                confirmStatus: true,
                content: "确定将该项目可见性设为【" + obj.name + "】吗",
                name: obj.name
            })
        }else{
            this.setState({
                name: "指定",
                appointStatus: true
            })
        }
    }

    changeVisible = () => {
        ProjectAction.updateProjectVisable(this.state.name,[],this.props.id,(data)=>{
            this.props.complete();
            this.close();
        })
    }

    handle = (obj,value) => {
        let data = [];
        for(let i=0;i<value.length;i++){
            data.push(value[i].extId);
        }
        ProjectAction.updateProjectVisable(this.state.name,data,this.props.id,(data)=>{
            this.props.complete();
            this.close();
        })
    }

    render() {
        return (
            <div className={"flex flex-row flex-between align-center " + Style.priority}>
                {
                    this.state.confirmStatus ? <ConfirmWindow content={this.state.content} saveHandle={this.changeVisible} cancelHandle={this.close} /> : ""
                }
                {
                    this.state.appointStatus ? <AppointInvestor data={this.props.sharesData} handle={this.handle} closeHandle={this.close} /> : ""
                }
                <InfoTitle title="可见性" />
                <div className={Style.selectArea}>
                    <span onClick={this.choose} style={{border: this.state.selectStatus ? "1px solid #ff530c" : "1px solid #dadbde"}}>
                        {this.props.name}
                        <i></i>
                    </span>
                    <input type="text" readonly unselectable="on" className={Style.inputSelect} ref="input" onBlur={this._blur} />
                    {
                        this.state.selectStatus ? (
                            <div className={Style.selectItem} style={{border: this.state.selectStatus ? "1px solid #ff530c" : "1px solid #1px solid #dadbde", borderTop: "none"}}>
                                {
                                    this.state.data.map((item,i)=>{
                                        return(
                                            <a key={i} onClick={()=>{this.confirm(item)}}>{item.name}</a>
                                        )
                                    })
                                }
                            </div>
                        ) : ('')
                    }
                </div>
            </div>
        )
    }
}

class Priority extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selectStatus: false,
            treatData: [],
            confirmStatus: false,
            content: "",
            treatId: ""
        }
    }

    componentWillMount = () => {
        ProjectAction.queryTreats((data)=>{
            this.setState({
                treatData: data
            });
        })
    }

    choose = () => {
        if(!this.state.selectStatus){
            this.refs.input.focus();
            this.setState({
                selectStatus: true
            })
        }else{
            return false
        }
    }

    _blur = () => {
        setTimeout(()=>{
            this.setState({
                selectStatus: false
            })
        },200)
    }

    close = () => {
        this.setState({
            confirmStatus: false
        })
    }

    confirm = (obj) => {
        this.setState({
            confirmStatus: true,
            content: "确定将该项目优先级设为【" + obj.treat_name + "】吗",
            treatId: obj.treat_id
        })
    }

    changeTreat = () => {
        ProjectAction.updateProjectPriority(this.state.treatId,this.props.id,(data)=>{
            this.props.complete();
            this.close();
        })
    }

    render() {
        return(
            <div className={"flex flex-row flex-between align-center " + Style.priority}>
                {
                    this.state.confirmStatus ? <ConfirmWindow content={this.state.content} saveHandle={this.changeTreat} cancelHandle={this.close} /> : ""
                }
                <InfoTitle title="优先级" />
                <div className={Style.selectArea}>
                    <span onClick={this.choose} style={{border: this.state.selectStatus ? "1px solid #ff530c" : "1px solid #dadbde"}}>
                        {this.props.name}
                        <i></i>
                    </span>
                    <input type="text" readonly unselectable="on" className={Style.inputSelect} ref="input" onBlur={this._blur} />
                    {
                        this.state.selectStatus ? (
                            <div className={Style.selectItem} style={{border: this.state.selectStatus ? "1px solid #ff530c" : "1px solid #1px solid #dadbde", borderTop: "none"}}>
                                {
                                    this.state.treatData.map((treat,i)=>{
                                        return(
                                            <a key={i} style={{color: treat.treat_id === this.state.treat_id ? "#ff530c" : ""}} onClick={()=>{this.confirm(treat)}}>{treat.treat_name}</a>
                                        )
                                    })
                                }
                            </div>
                        ) : ('')
                    }
                </div>
            </div>
        )
    }
}

class Schedule extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            updateTimeStatus: false,
            confirmStatus: false,
            scheduleData: [],
            next: "",
            nextId: "",
            nextTime: "",
            content: "",
            schedule_id: ""
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(!nextProps.data){
            return false
        }else{
            let id = nextProps.data.length ? nextProps.data[0].fstatus_id : 0;
            this.setState({
                nextTime: nextProps.data.length ? nextProps.data[0].prjschedule_at : ""
            });
            if(this.state.scheduleData && this.state.scheduleData.length){
                this.getNext(id);
            }else{
                ProjectAction.queryFinStatus((data)=>{
                    this.setState({
                        scheduleData: data
                    },()=>{
                        this.getNext(id);
                    });
                });
            }
        }
    }

    getNext = (id) => {
        if(id < 8){
            for(let i=0;i<this.state.scheduleData.length;i++){
                if(id === 0){
                    this.setState({
                        next: this.state.scheduleData[0].fstatus_name,
                        nextId: this.state.scheduleData[0].fstatus_id
                    })
                }else if(id == this.state.scheduleData[i].fstatus_id){
                    this.setState({
                        next: this.state.scheduleData[i+1].fstatus_name,
                        nextId: this.state.scheduleData[i+1].fstatus_id
                    })
                }
            }
        }else{
            this.setState({
                next: "",
                nextId: ""
            })
        }
    }

    updateTime = () => {
        this.setState({
            updateTimeStatus: true
        })
    }

    close = () => {
        this.setState({
            updateTimeStatus: false,
            confirmStatus: false
        })
    }

    complete = () => {
        this.props.complete();
        this.close();
    }

    confirm = (obj) => {
        if(obj.fstatus_id == 8){
            this.setState({
                schedule_id: parseInt(obj.fstatus_id) + 1
            })
        }else{
            this.setState({
                schedule_id: obj.fstatus_id
            })
        }
        this.setState({
            confirmStatus: true,
            content: "确认删除进度 【" + obj.fstatus_name + "】 吗？"
        })
    }

    deleteStatus = () => {
        if(this.state.schedule_id === 9){
            ProjectAction.deleteFinStatus(this.state.schedule_id,this.props.id,(data)=>{
                this.setState({
                    schedule_id: this.state.schedule_id - 1
                },()=>{
                    ProjectAction.deleteFinStatus(this.state.schedule_id,this.props.id,(data)=>{
                        this.props.complete();
                        this.close();
                    })
                })
            })
        }else{
            ProjectAction.deleteFinStatus(this.state.schedule_id,this.props.id,(data)=>{
                this.props.complete();
                this.close();
            })
        }
    }

    render() {
        return(
            <div className={Style.schedule}>
                {
                    this.state.updateTimeStatus ? <UpdateStatusTime projectid={this.props.id} name={this.state.next} id={this.state.nextId} time={this.state.nextTime} closeHandle={this.close} complete={this.complete} /> : ("")
                }
                {
                    this.state.confirmStatus ? <ConfirmWindow content={this.state.content} saveHandle={this.deleteStatus} cancelHandle={this.close} /> : ""
                }
                <InfoTitle title="进度"/>
                {
                    this.state.next ? <a className={Style.updateNext} onClick={this.updateTime}>NEXT {this.state.next}</a> : ""
                }
                <div className={Style.scheduleList}>
                    {
                        this.props.data && this.props.data.length ? (
                            this.props.data.map((item,i)=>{
                                return(
                                    <div className={"flex flex-row flex-start align-center " + Style.scheduleListItem}>
                                        <p>{item.prjschedule_at}</p>
                                        <p style={{marginLeft: 12}}>{item.fstatus_name}</p>
                                        {
                                            this.props.data.length === 9 ? (
                                                i === 1 ? (
                                                    <a className={Style.scheduleDelete}>
                                                        <DeleteButton handle={()=>{this.confirm(item)}} />
                                                    </a>
                                                ) : ("")
                                            ) : (
                                                i === 0 ? (
                                                    <a className={Style.scheduleDelete}>
                                                        <DeleteButton handle={()=>{this.confirm(item)}} />
                                                    </a>
                                                ) : ("")
                                            )

                                        }
                                    </div>
                                )
                            })
                        ) : ("")
                    }
                </div>
            </div>
        )
    }
}

class Team extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addProjectMemberStatus: false,
            confirmStatus: false,
            content: "",
            platform_id: ""
        }
    }

    addProjectMember = () => {
        this.setState({
            addProjectMemberStatus: true
        })
    }

    close = () => {
        this.setState({
            addProjectMemberStatus: false,
            confirmStatus: false
        })
    }

    complete = () => {
        this.props.complete();
        this.close();
    }

    confirm = (obj) => {
        this.setState({
            confirmStatus: true,
            content: "确认将 " + obj.platformor_fullname + "(" + obj.raid_role + ") 从参与成员列表中删除吗？",
            platform_id: obj.platform_id
        })
    }

    deleteMember = () => {
        ProjectAction.deleteProjectMember(this.state.platform_id,this.props.id,(data)=>{
            this.complete();
        })
    }

    render() {
        return(
            <div>
                {
                    this.state.addProjectMemberStatus ? (
                        <AddProjectMember handle={this.close} complete={this.complete} id={this.props.id} />
                    ) : ("")
                }
                {
                    this.state.confirmStatus ? <ConfirmWindow content={this.state.content} saveHandle={this.deleteMember} cancelHandle={this.close} /> : ""
                }
                <InfoTitle title="参与成员" marginTop="20" />
                <div className={Style.teamList}>
                    {
                        this.props.data && this.props.data.length ? (
                            this.props.data.map((item)=>{
                                return (
                                    <div className={"flex flex-row flex-start align-center " + Style.teamListItem}>
                                        <p style={{width: 72}}>{item.platformor_fullname}</p>
                                        <p style={{width: 90}}>{item.raid_role}</p>
                                        <a className={Style.memberDelete}>
                                            <DeleteButton handle={()=>{this.confirm(item)}} />
                                        </a>
                                    </div>
                                )
                            })
                        ) : ("")
                    }
                </div>
                <a className={Style.addButton} onClick={this.addProjectMember}>+</a>
            </div>
        )
    }
}