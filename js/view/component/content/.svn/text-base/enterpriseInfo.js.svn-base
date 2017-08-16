/**
 * Created by Galaxy065 on 2017/5/10.
 */
import React from "react";
import Style from "./css/enterpriseInfo.css";
import Tab from "../common/tab";
import { InfoTitle, InfoContent, InfoDetail } from "../common/infoArea";
import { EditButton, WatchButton, FormButton, AddButton, DeleteButton } from "../common/defaultButton";
import { FormItem } from "../common/formArea";
import {Input, TextArea, CheckTip} from "../common/defaultInput";
import { ProjectInfoWindow } from "../common/infoWindow";
import { Team, Stock, Compete, Fin } from "./common/common";
import { AddProjectWindow } from "../common/addWindow";
import { Select, DatePicker, Upload } from 'antd';
import moment from 'moment';

import Utils from "../../../store/utils";
import Filter from "../../../store/filter";
import CompanyAction from "../../../store/companyAction";

export default class EnterpriseInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            data: {},
            tabData: [
                {
                    name: "企业概况",
                    width: 104,
                    active: true
                },
                {
                    name: "历史融资",
                    width: 104,
                    active: false
                },
                {
                    name: "企业与行业动态",
                    width: 150,
                    active: false
                }
            ],
            tabNow: 0,
            isWatch: true
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            isWatch: true
        },()=>{
            this.queryCompany();
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.setState({
                id: nextProps.id,
                isWatch: true
            },()=>{
                this.queryCompany();
            })
        }
    }

    queryCompany = () => {
        CompanyAction.queryCompany(this.state,(data)=>{
            this.setState({
                data: data
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

    complete = () => {
        this.changeWatchAndEdit(true);
        this.queryCompany();
        this.props.complete();
    }

    render() {
        return(
            <div>
                <div className={"flex flex-row flex-start " + Style.header}>
                    <img src={this.state.data.logo_path ? this.state.data.logo_path.path : ""} />
                    <div>
                        <h3>{this.state.data.name}</h3>
                        <div className="flex flex-row flex-start align-center">
                            <p>{this.state.data.fields}</p>
                        </div>
                    </div>
                </div>
                <Tab tabData={this.state.tabData} handle={this.changeTab} areaStyle={{marginTop: 10}}>
                    {
                        this.state.tabNow === 0 ? (
                            this.state.isWatch ? <EditButton handle={() => {this.changeWatchAndEdit(false)}} style={{right: 20}} /> : <WatchButton handle={() => {this.changeWatchAndEdit(true)}} style={{right: 20}} />
                        ) : ("")
                    }
                </Tab>
                {
                    (()=>{
                        switch (this.state.tabNow){
                            case 0:
                                return (
                                    this.state.isWatch ? <EnterpriseDetail data={this.state.data} /> : <EditEnterpriseDetail data={this.state.data} id={this.props.id} delete={this.props.delete} complete={this.complete} />
                                );
                                break;
                            case 1: return <EnterpriseFinancing id={this.state.id} name={this.state.data.name} />;
                                break;
                            case 2: return <EnterpriseTrend id={this.state.id} />;
                                break;
                        }
                    })()
                }
            </div>
        )
    }
}

export class EnterpriseDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: nextProps.data
        })
    }

    render() {
        return(
            <div className={Style.enterpriseDetailContainer}>
                <div>
                    <InfoTitle title="基本信息"/>
                    <InfoContent title="企业全称：" value={this.state.data.name} width="110" marginTop="5" />
                    <InfoContent title="企业简称：" value={this.state.data.abbrname} width="110" />
                    <div className="flex flex-row flex-start">
                        <InfoContent title="成立时间：" value={this.state.data.regist_time} width="110" contentWidth="504"/>
                        <InfoContent title="法定代表人：" value={this.state.data.legal_person} width="110"/>
                    </div>
                    <div className="flex flex-row flex-start">
                        <InfoContent title="注册资本：" value={this.state.data.regist_capital ? this.state.data.regist_capital + "万元" : this.state.data.regist_capital} width="110" contentWidth="504"/>
                        <InfoContent title="企业规模：" value={Utils.findStaffSize(parseInt(this.state.data.staff_size))} width="110"/>
                    </div>
                    <InfoContent title="注册地址：" value={this.state.data.address} width="110" />
                    <InfoContent title="公司网站：" value={this.state.data.web} width="110" />
                    <InfoContent title="上市情况：" value={Utils.findIpoSize(parseInt(this.state.data.ipo_status))} width="110" />
                    <InfoContent title="公司简介：" value={this.state.data.intro} width="110" />
                    <InfoContent title="录入人：" value={this.state.data.creator} width="110" />
                </div>
                <div>
                    <InfoTitle title="团队信息" marginTop="30"/>
                    {
                        this.state.data.team && this.state.data.team.length ? (
                            this.state.data.team.map((teams, i) => {
                                return (
                                    <div className={"flex flex-row flex-start align-center " + Style.team} key={i}>
                                        <img src={teams.photo.path} />
                                        <div>
                                            <div className="flex flex-row flex-start align-center">
                                                <p>{teams.name}</p>
                                                <div className={Style.line}></div>
                                                <p className={Style.teamHonor}>{teams.title}</p>
                                            </div>
                                            <p>{teams.duty}</p>
                                        </div>
                                        <InfoDetail content={teams.intro} className="flex1"
                                                    style={{margin: "0 0 0 10px", padding: "12px 20px"}}/>
                                    </div>
                                )
                            })
                        ) : (
                            <p className={Style.null}>此项无数据</p>
                        )
                    }
                </div>
                <div>
                    <InfoTitle title="股权结构" marginTop="30"/>
                    {
                        this.state.data.stock_struct && this.state.data.stock_struct.length ? (
                            <div style={{marginTop: 7}}>
                                <div className={"flex flex-row flex-start " + Style.content}>
                                    <p style={{width: 178}}>姓名/机构名称</p>
                                    <p>持股比例</p>
                                </div>
                                {
                                    this.state.data.stock_struct.map((stock, i) => {
                                        return (
                                            <div className={"flex flex-row flex-start " + Style.content}>
                                                <p style={{width: 178}}>{stock.name}</p>
                                                <p>{stock.scale}%</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <p className={Style.null}>此项无数据</p>
                        )
                    }
                </div>
                <div>
                    <InfoTitle title="竞争对手" marginTop="30"/>
                    {
                        this.state.data.competitors && this.state.data.competitors.length ? (
                            <div style={{marginTop: 7}}>
                                <div className={"flex flex-row flex-start " + Style.content}>
                                    <p style={{width: 198}}>企业名称</p>
                                    <p style={{width: 178}}>地区</p>
                                    <p style={{width: 178}}>主营业务</p>
                                    <p>竞争业务</p>
                                </div>
                                {
                                    this.state.data.competitors.map((compete, i) => {
                                        return (
                                            <div className={"flex flex-row flex-start " + Style.content}
                                                 key={i}>
                                                <p style={{width: 198}}>{compete.name}</p>
                                                <p style={{width: 178}}>{compete.address}</p>
                                                <p style={{width: 178}}>{compete.primary_business}</p>
                                                <p>{compete.compete_description}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <p className={Style.null}>此项无数据</p>
                        )
                    }
                </div>
                <div>
                    <InfoTitle title="产品与服务" marginTop="30"/>
                    <InfoContent title="主营业务：" value={this.state.data.primary_business} width="90" marginTop="5"/>
                    <InfoContent title="商业模式：" value={this.state.data.business_model} width="90"/>
                    <InfoContent title="业务介绍：" width="90">
                        {
                            this.state.data.business_intro ?  <InfoDetail content={this.state.data.business_intro} style={{margin: 0, width: "100%"}}/> : ""
                        }
                    </InfoContent>
                </div>
                <div style={{paddingBottom: 15}}>
                    <InfoTitle title="财务数据" marginTop="30"/>
                    {
                        this.state.data.financial_data && this.state.data.financial_data.length ? (
                            <div style={{marginTop: 5}}>
                                <div className={"flex flex-row flex-start " + Style.finance}>
                                    <p style={{width: 180}}>时间段</p>
                                    <p style={{width: 170}}>收入</p>
                                    <p style={{width: 170}}>收入来源</p>
                                    <p style={{width: 161}}>净利润</p>
                                    <p>净利润来源</p>
                                </div>
                                {
                                    this.state.data.financial_data.map((fin, i) => {
                                        return (
                                            <div className={"flex flex-row flex-start " + Style.finance}
                                                 key={i}>
                                                <p style={{width: 180}}>{fin.start_time + "年"}</p>
                                                <p style={{width: 170}}>{fin.revenue ? fin.revenue + "万元" : ""}</p>
                                                <p style={{width: 170}}>{fin.revenue_source}</p>
                                                <p style={{width: 161}}>{fin.net_margin ? fin.net_margin + "万元" : ""}</p>
                                                <p>{fin.margin_source}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        ) : (
                            <p className={Style.null}>此项无数据</p>
                        )
                    }
                </div>
            </div>
        )
    }
}

export class EditEnterpriseDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id,
            name: this.props.data.name,
            abbrname: this.props.data.abbrname,
            logo: this.props.data.logo_id,
            imageUrl: this.props.data.logo_path ? this.props.data.logo_path.path : "",
            fields: this.props.data.field_ids,
            regist_time: this.props.data.regist_time,
            regist_capital: this.props.data.regist_capital,
            legal_person: this.props.data.legal_person,
            staff_size: this.props.data.staff_size,
            address: this.props.data.address,
            web: this.props.data.web,
            ipo_status: this.props.data.ipo_status,
            intro: this.props.data.intro,
            primary_business: this.props.data.primary_business,
            business_model: this.props.data.business_model,
            business_intro: this.props.data.business_intro,
            team: [],
            stock_struct: [],
            competitors: [],
            financial_data: []
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    getTime = (date,dateString) => {
        this.handle("regist_time",dateString);
    }

    changeSize = (value) => {
        this.handle("staff_size",value);
    }

    changeIpo = (value) => {
        this.handle("ipo_status",value);
    }

    uploadImage = (info) => {
        if (info.file.status === 'done') {
            Utils.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            this.handle("logo",info.file.response.data.id);
        }
    }

    _submit = () => {
        let team = [];
        let teamData = this.refs.team.state.team;
        for(let i=0;i<teamData.length;i++){
            if(teamData[i].name){
                team.push({
                    name: teamData[i].name,
                    title: teamData[i].title,
                    duty: teamData[i].duty,
                    intro: teamData[i].intro,
                    photo: teamData[i].photo
                })
            }
        }
        let stock_struct = [];
        let stockData = this.refs.stock.state.stock_struct;
        for(let i=0;i<stockData.length;i++){
            if(stockData[i].name && stockData[i].scale){
                stock_struct.push({
                    name: stockData[i].name,
                    scale: stockData[i].scale
                })
            }
        }
        let competitors = [];
        let competitorsData = this.refs.compete.state.competitors;
        for(let i=0;i<competitorsData.length;i++){
            if(competitorsData[i].name && competitorsData[i].address){
                competitors.push({
                    name: competitorsData[i].name,
                    address: competitorsData[i].address,
                    primary_business: competitorsData[i].primary_business,
                    compete_description: competitorsData[i].compete_description
                })
            }
        }
        let financial_data = [];
        let finData = this.refs.fin.state.financial_data;
        for(let i=0;i<finData.length;i++){
            if(finData[i].start_time && finData[i].revenue){
                financial_data.push({
                    start_time: finData[i].start_time,
                    end_time: finData[i].start_time,
                    revenue: finData[i].revenue,
                    revenue_source: finData[i].revenue_source,
                    net_margin: finData[i].net_margin,
                    margin_source: finData[i].margin_source
                })
            }
        }
        this.setState({
            team: team,
            stock_struct: stock_struct,
            competitors: competitors,
            financial_data: financial_data
        },()=>{
            CompanyAction.editCompany(this.state,(data)=>{
                layer.open({
                    content: "企业信息修改成功！",
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                setTimeout(()=>{
                    this.props.complete();
                },3000)
            });
        })
    }

    _delete = () => {
        CompanyAction.deleteCompany(this.state,(data)=>{
            layer.open({
                content: "删除企业成功！",
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
        const Option = Select.Option;
        return(
            <div>
                <div className={Style.enterpriseDetailContainer}>
                    <InfoTitle title="基本信息"/>
                    <div style={{padding: "0 30px"}}>
                        <FormItem title="企业全称" titleWidth="136" marginTop="24">
                            <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                        </FormItem>
                        <FormItem title="企业简称" titleWidth="136" marginTop="26">
                            <Input name="abbrname" value={this.state.abbrname} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="企业LOGO" titleWidth="136" marginTop="26">
                            <Upload
                                className="avatar-uploader"
                                name="userfile"
                                showUploadList={false}
                                action={Utils.url + "UploadFile.php"}
                                beforeUpload={Utils.beforeUpload}
                                onChange={this.uploadImage}
                            >
                                {
                                    this.state.imageUrl ?
                                        <img src={this.state.imageUrl} alt="" className="avatar" /> :
                                        <div className="pic-upload"></div>
                                }
                            </Upload>
                        </FormItem>
                        <FormItem title="行业领域" titleWidth="75" marginTop="26">
                            <CheckTip name="fields" getData="queryIndustries" init={this.state.fields} handle={this.handle} />
                        </FormItem>
                        <div className="flex flex-row flex-between" style={{marginTop: 26,paddingRight: 56}}>
                            <FormItem title="成立时间" titleWidth="136">
                                <DatePicker
                                    defaultValue={this.state.regist_time ? moment(this.state.regist_time, 'YYYY-MM-DD') : ""}
                                    format="YYYY-MM-DD"
                                    allowClear={false}
                                    onChange={this.getTime}
                                    style={{width: 236}}
                                    getCalendarContainer={() => document.getElementById('slide')}
                                />
                            </FormItem>
                            <FormItem title="注册资本" titleWidth="88">
                                <Input name="regist_capital" value={this.state.regist_capital} handle={this.handle} filter={Filter.checkNum} style={{width: 236}} />
                                <p style={{marginLeft: 10, width: 40}}>万元</p>
                            </FormItem>
                        </div>
                        <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 106}}>
                            <FormItem title="法定代表人" titleWidth="136">
                                <Input name="legal_person" value={this.state.legal_person} handle={this.handle} style={{width: 236}} />
                            </FormItem>
                            <FormItem title="企业规模" titleWidth="88">
                                <Select value={this.state.staff_size ? parseInt(this.state.staff_size) : ""} style={{ width: 236 }} getPopupContainer={() => document.getElementById('slide')} onChange={this.changeSize}>
                                    {
                                        Utils.staffSize.map((data,i)=>{
                                            return(
                                                <Option key={i} value={data.id}>{data.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </div>
                        <div className="flex flex-row flex-start" style={{marginTop: 26, paddingRight: 106}}>
                            <FormItem title="注册地址" titleWidth="136" className="flex1">
                                <Input name="address" value={this.state.address} handle={this.handle} areaClassName="flex1" className="flex1" />
                            </FormItem>
                        </div>
                        <FormItem title="公司网站" titleWidth="136" marginTop="26">
                            <Input name="web" value={this.state.web} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="上市情况" titleWidth="136" marginTop="26">
                            <Select value={this.state.ipo_status ? parseInt(this.state.ipo_status) : ""} style={{ width: 236 }} getPopupContainer={() => document.getElementById('slide')} onChange={this.changeIpo}>
                                {
                                    Utils.ipoSize.map((data,i)=>{
                                        return(
                                            <Option key={i} value={data.id}>{data.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </FormItem>
                        <FormItem title="公司简介" titleWidth="136" marginTop="26">
                            <TextArea name="intro" value={this.state.intro} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                    </div>
                    <InfoTitle title="团队信息" marginTop="26"/>
                    <div style={{padding: "0 30px"}}>
                        <Team ref="team" init={this.props.data.team} />
                    </div>
                    <InfoTitle title="股权结构" marginTop="26"/>
                    <div style={{padding: "0 30px"}}>
                        <Stock ref="stock" init={this.props.data.stock_struct} />
                    </div>
                    <InfoTitle title="竞争对手"/>
                    <div style={{padding: "0 30px"}}>
                        <Compete ref="compete" init={this.props.data.competitors} modify={true} />
                    </div>
                    <InfoTitle title="产品与服务" marginTop="26"/>
                    <div style={{padding: "0 30px"}}>
                        <FormItem title="主营业务" titleWidth="136" marginTop="24">
                            <Input name="primary_business" value={this.state.primary_business} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="商业模式" titleWidth="136" marginTop="26">
                            <Input name="business_model" value={this.state.business_model} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="业务介绍" titleWidth="136" marginTop="26">
                            <TextArea name="business_intro" value={this.state.business_intro} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                    </div>
                    <InfoTitle title="财务数据" marginTop="26"/>
                    <div style={{padding: "0 30px"}}>
                        <Fin ref="fin" init={this.props.data.financial_data} />
                    </div>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="删除该企业"
                                confirm={{
                                    content: <span>确认要删除该企业吗？（<span style={{color: "#ff530c"}}>慎重</span>）</span>,
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

export class EnterpriseFinancing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            page_index: 1,
            page_cap: "",
            data: [],
            projectStatus: false,
            projectInfoWindow: null,
            addProject: false
        }
    }

    componentDidMount = () => {
        this.queryCompanyFinHis();
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.setState({
                id: nextProps.id
            },()=>{
                this.queryCompanyFinHis();
            })
        }
    }

    queryCompanyFinHis = () => {
        CompanyAction.queryCompanyFinHis(this.state,(count,records)=>{
            this.setState({
                data: records
            })
        })
    }

    showProjectInfo = (id) => {
        this.setState({
            projectInfoWindow: <ProjectInfoWindow id={id} closeWindow={this.closeWindow} />
        })
    }

    closeWindow = () => {
        this.setState({
            projectInfoWindow: null
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
        this.queryCompanyFinHis();
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
            <div>
                {this.state.projectInfoWindow}
                {
                    this.state.addProject ? <AddProjectWindow org_id={this.state.id} org_name={this.props.name} close={this.closeAddProjectWindow} complete={this.completeAddProject} /> : ""
                }
                <div className={Style.enterpriseDetailContainer} style={{padding: "30px 20px"}}>
                    {
                        this.props.isWatch ? ("") : <AddButton handle={this.openAddProjectWindow} large={true} name="添加一条融资记录" style={{width: 192}} />
                    }
                    {
                        this.state.data.map((datas,i)=>{
                            return(
                                <div className={"flex flex-row flex-between align-center " + Style.financingHistory} style={{padding: "10px 30px 10px 0"}}>
                                    <div>
                                        <div className="flex flex-row flex-start align-center">
                                            <p>{datas.name}</p>
                                            <div className={Style.line}></div>
                                            <p>{datas.round}</p>
                                            <div className={Style.line}></div>
                                            <p>{datas.fund_amount ? datas.fund_amount + "万元" : ""}</p>
                                        </div>
                                        <p>领投：
                                            {
                                                datas.leader_fund.map((leader,i)=>{
                                                    return leader
                                                })
                                            }
                                        </p>
                                        <p>合投：
                                            {
                                                datas.crowd_fund.map((crowd,i)=>{
                                                    return (
                                                        i === datas.crowd_fund.length - 1 ? crowd : crowd + "、"
                                                    )
                                                })
                                            }
                                        </p>
                                    </div>
                                    {
                                        this.props.isWatch ? ("") : (
                                            <div>
                                                <a onClick={()=>{this.showProjectInfo(datas.id)}} className={Style.watchInfo}>点击查看详情</a>
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export class EnterpriseTrend extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.id,
            title: "",
            content: "",
            data: []
        }
    }

    componentDidMount = () => {
        this.queryCompanyNews();
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.setState({
                id: nextProps.id
            },()=>{
                this.queryCompanyNews();
            })
        }
    }

    queryCompanyNews = () => {
        CompanyAction.queryCompanyNews(this.state,(count,records)=>{
            this.setState({
                data: records
            });
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    _delete = (id) => {
        CompanyAction.deleteCompanyNews(id,()=>{
            this.queryCompanyNews();
        })
    }

    _add = () => {
        CompanyAction.createCompanyNews(this.state,(data)=>{
            this.setState({
                title: "",
                content: ""
            });
            this.queryCompanyNews();
        })
    }

    render() {
        return(
            <div>
                <div className={Style.enterpriseDetailContainer} style={{padding: "0 20px"}}>
                    {
                        this.state.data.map((datas,i)=>{
                            return(
                                <div className={"flex flex-row flex-between " + Style.trend}>
                                    <div>
                                        <div className="flex flex-row flex-start align-center">
                                            <p>{datas.title}</p>
                                            <div className={Style.line}></div>
                                            <p>{datas.create_time}</p>
                                        </div>
                                        <p>{datas.content}</p>
                                    </div>
                                    {
                                        this.props.isWatch ? ("") : <DeleteButton handle={()=>{this._delete(datas.id)}} style={{marginTop: 10}}/>
                                    }
                                </div>
                            )
                        })
                    }
                </div>
                {
                    this.props.isWatch ? ("") : (
                        <div className={Style.enterpriseDetailContainer} style={{marginTop: 10, padding: "24px 20px 30px"}}>
                            <FormItem title="标题" titleWidth="106">
                                <Input name="title" value={this.state.title} handle={this.handle} style={{width: 236}} />
                            </FormItem>
                            <FormItem title="动态内容" titleWidth="106" marginTop="26">
                                <TextArea name="content" value={this.state.content} handle={this.handle} style={{width: 236}} />
                            </FormItem>
                            <AddButton large="true" name="添加一条动态" handle={this._add} style={{margin: "30px auto 0", width: 192}}/>
                        </div>
                    )
                }
            </div>
        )
    }
}