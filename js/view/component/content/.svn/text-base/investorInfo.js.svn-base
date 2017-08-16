/**
 * Created by Galaxy065 on 2017/5/10.
 */
import React from "react";
import Style from "./css/investorInfo.css";
import Icon from "../common/defaultIcon";
import Tab from "../common/tab";
import { InfoTitle, InfoContent, InfoTable, InfoColumn } from "../common/infoArea";
import { FormItem, FormUpload } from "../common/formArea";
import {Input, Check, TextArea, CheckTip, RadioTip} from "../common/defaultInput";
import Tag from "../common/tag";
import { EditButton, WatchButton, FormButton } from "../common/defaultButton";
import { AutoCompleteOrg, AutoCompleteStaff } from "../common/autoComplete";
import { AgencyInfoWindow } from "../common/infoWindow";
import { DatePicker, Upload } from "antd";
import moment from 'moment';

import Utils from "../../../store/utils";
import Filter from "../../../store/filter";
import InvestorAction from "../../../store/investorAction";
import ActivityAction from "../../../store/activityAction";

export default class InvestorInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            tabData: [
                {
                    name: "投资人信息",
                    width: 120,
                    active: true
                },
                {
                    name: "投资案例",
                    width: 104,
                    active: false
                },
                {
                    name: "互动记录",
                    width: 104,
                    active: false
                }
            ],
            tabNow: 0,
            isWatch: true,
            data: {}
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id,
            isWatch: true
        },()=>{
            this.queryInvestor();
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.setState({
                id: nextProps.id,
                isWatch: true
            },()=>{
                this.queryInvestor();
            })
        }
    }

    queryInvestor = () => {
        InvestorAction.queryInvestor(this.state,(data)=>{
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
        this.setState({
            isWatch: bool
        })
    }

    complete = () => {
        this.changeWatchAndEdit(true);
        this.queryInvestor();
        this.props.complete();
    }

    render() {
        return(
            <div>
                <div className={"flex flex-row flex-start align-center " + Style.header}>
                    <h3>{this.state.data.name}</h3>
                    {
                        (()=>{
                            switch (this.state.data.sex){
                                case "男":
                                    return <Icon name="iconMaleLarge" style={{marginRight: 46}}/>;
                                    break;
                                case "女":
                                    return <Icon name="iconFemaleLarge" style={{marginRight: 46}}/>;
                                    break;
                            }
                        })()
                    }
                    {
                        (()=>{
                            switch (this.state.data.auth_type){
                                case "领投人":
                                    return <Icon name="iconLeader" style={{marginRight: 46}}/>;
                                    break;
                                case "投资人":
                                    return <Icon name="iconInvestor" style={{marginRight: 46}}/>;
                                    break;
                                default: break;
                            }
                        })()
                    }
                    {
                        this.state.data.tags && this.state.data.tags.length ? (
                            this.state.data.tags.map((tag,i) => {
                                return(
                                    <p key={i}>{tag}</p>
                                )
                            })
                        ) : ("")
                    }
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
                                    this.state.isWatch ? <InvestorDetail data={this.state.data} /> : <EditInvestorDetail data={this.state.data} id={this.props.id} delete={this.props.delete} complete={this.complete}/>
                                );
                                break;
                            case 1: return <EnterpriseFinancing data={this.state.data} />;
                                break;
                            case 2: return <EnterpriseTrend id={this.state.id} data={this.state.data} complete={this.queryInvestor} />;
                                break;
                        }
                    })()
                }
            </div>
        )
    }
}

class InvestorDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.data,
            agencyInfoWindow: null

        }
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState({
            data: nextProps.data
        })
    }

    showProjectInfo = () => {
        this.setState({
            agencyInfoWindow: <AgencyInfoWindow id={this.props.data.org_id} closeWindow={this.closeWindow} />
        })
    }

    closeWindow = () => {
        this.setState({
            agencyInfoWindow: null
        })
    }

    render() {
        return(
            <div className={Style.investorDetailContainer}>
                {this.state.agencyInfoWindow}
                <div>
                    <InfoTitle title="基本信息"/>
                    <div className={"flex flex-row flex-start align-center " + Style.userInfo}>
                        <img src={this.state.data.head_portrait_path ? this.state.data.head_portrait_path.path : ""} />
                        <div>
                            <div className="flex flex-row flex-start align-center">
                                <p>{this.state.data.name}</p>
                                <div className={Style.line}></div>
                                <p>{this.state.data.name_en}</p>
                                {
                                    (()=>{
                                        switch (this.state.data.sex){
                                            case "男":
                                                return <Icon name="iconMaleSmall" style={{marginLeft: 20}}/>;
                                                break;
                                            case "女":
                                                return <Icon name="iconFemaleSmall" style={{marginLeft: 20}}/>;
                                                break;
                                        }
                                    })()
                                }
                            </div>
                            <p>{this.state.data.mobile}</p>
                        </div>
                    </div>
                    <InfoContent title="标签：" width="110" marginTop="10">
                        {
                            this.props.data.tags && this.props.data.tags.length ? (
                                this.props.data.tags.map((tag,i)=>{
                                    return(
                                        <span key={i} style={{marginRight: 10, lineHeight: "34px"}}>{tag}</span>
                                    )
                                })
                            ) : ("")
                        }
                    </InfoContent>
                    <InfoContent title="认证类型：" value={this.state.data.auth_type} width="110" />
                    <InfoContent title="投资人类型：" value={this.state.data.investtype} width="110" />
                    {
                        this.state.data.invest_type === "投资机构" ? (
                            <div>
                                <InfoContent title="投资机构：" width="110" >
                                    <a onClick={()=>{this.showProjectInfo()}}>{this.state.data.org_name}</a>
                                </InfoContent>
                                <div className="flex flex-row flex-between" style={{paddingRight: 76}}>
                                    <InfoContent title="部门名称：" value={this.state.data.org_department} width="110" />
                                    <InfoContent title="职位：" value={this.state.data.org_job} width="82" />
                                    <InfoContent title="职位内部影响力：" value={this.state.data.internal_power} width="152" />
                                </div>
                            </div>
                        ) : ("")
                    }
                    <InfoContent title="关注阶段：" value={this.state.data.preffered_rounds} width="110" />
                    <InfoContent title="关注领域：" value={this.state.data.preffered_fields} width="110" />
                    <InfoContent title="单笔投资规模" value={(this.state.data.single_invest_size_min ? this.state.data.single_invest_size_min : "") + "-" + (this.state.data.single_invest_size_max ? this.state.data.single_invest_size_max : "") + (this.state.data.single_invest_size_min && this.state.data.single_invest_size_max ? "万元" : "")} width="110" />
                </div>
                <div>
                    <InfoTitle title="个人附加信息" marginTop="25"/>
                    <div className="flex flex-row flex-start" style={{marginTop: 5}}>
                        <InfoContent title="微信号：" value={this.state.data.wechat} width="110" contentWidth="462" />
                        <InfoContent title="QQ号：" value={this.state.data.qq} width="90" />
                    </div>
                    <div className="flex flex-row flex-start">
                        <InfoContent title="Email：" value={this.state.data.email} width="110" contentWidth="462" />
                        <InfoContent title="生日：" value={this.state.data.birthday} width="90" />
                    </div>
                    <InfoContent title="家庭住址：" value={this.state.data.homeaddress} width="110" />
                    <InfoContent title="简介：" value={this.state.data.intro} width="110" />
                </div>
                <div>
                    <InfoTitle title="关系" marginTop="25"/>
                    <InfoContent title="渠道：" value="线下" width="110" marginTop="5"/>
                    <InfoContent title="来源：" value={this.state.data.source_type} width="110" />
                    <InfoContent title="是否认识公司内人员：" value={this.state.data.hasConn ? this.state.data.hasConn : "否"} width="176" />
                    <InfoContent title="客户经理：" value={this.state.data.cusManager_name} width="110" />
                    <InfoContent title="备注：" value={this.state.data.remark} width="110" />
                    <InfoContent title="创建日期：" value={this.state.data.create_time} width="110" />
                    <InfoContent title="录入人：" value={this.state.data.creator_name} width="110" />
                </div>
            </div>
        )
    }
}

class EditInvestorDetail extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id,
            imageUrl: this.props.data.head_portrait_path.path,
            head_portrait: this.props.data.head_portrait_id,
            name: this.props.data.name,
            name_en: this.props.data.name_en,
            mobile: this.props.data.mobile,
            sex: this.props.data.sex === "男" ? "M" : "F",
            invest_types: this.props.data.investtype_ids ? this.props.data.investtype_ids: [],
            is_org: this.props.data.org_id ? "Y" : "N",
            org_id: this.props.data.org_id,
            org_name: this.props.data.org_name,
            org_department: this.props.data.org_department,
            org_job: this.props.data.org_job,
            internal_power: this.props.data.internal_power,
            preffered_fields: this.props.data.preffered_field_ids,
            preffered_rounds: this.props.data.preffered_round_ids,
            wechat: this.props.data.wechat,
            qq: this.props.data.qq,
            email: this.props.data.email,
            address: this.props.data.homeaddress,
            birthday: this.props.data.birthday,
            introduction: this.props.data.intro,
            has: this.props.data.hasConn ? true : false,
            has_connections: this.props.data.hasConn,
            customer_manager: this.props.data.cusManager_id,
            cusManager_name: this.props.data.cusManager_name,
            remark: this.props.data.remark,
            tags: this.props.data.tag_ids,
            is_online: "N",
            source_type: this.props.data.source_type_id,
            single_invest_size_min: this.props.data.single_invest_size_min,
            single_invest_size_max: this.props.data.single_invest_size_max
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeOrg = (obj) => {
        this.handle("org_id",obj.id);
        this.handle("org_name",obj.name);
    }

    getTime = (date,dateString) => {
        this.handle("birthday",dateString);
    }

    _input = (e) => {
        this.handle("has_connections",e.target.value);
    }

    changeManager = (obj) => {
        this.handle("customer_manager",obj.id);
        this.handle("cusManager_name",obj.name);
    }

    handleChange = (info) => {
        if (info.file.status === 'done') {
            Utils.getBase64(info.file.originFileObj, imageUrl => this.setState({ imageUrl }));
            this.setState({
                head_portrait: info.file.response.data.id
            })
        }
    }

    _submit = () => {
        InvestorAction.editInvestor(this.state,(data)=>{
            layer.open({
                content: "投资人信息修改成功！",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            setTimeout(()=>{
                this.props.complete();
            },3000)
        });
    }

    _delete = () => {
        InvestorAction.deleteInvestor(this.state.id,()=>{
            layer.open({
                content: "删除投资人成功！",
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
        const Style = {
            input: {
                marginBottom: -1,
                marginLeft: 10,
                width: 90,
                border: "none",
                borderBottom: "1px solid #dadbde",
                outline: "none"
            }
        };
        return(
            <form>
                <div style={{padding: "15px 0 20px", backgroundColor: "#ffffff"}}>
                    <InfoTitle title="基本信息"/>
                    <div style={{padding: "0 30px"}}>
                        <FormItem title="头像" titleWidth="86" marginTop="26">
                            <Upload
                                className="avatar-uploader"
                                name="userfile"
                                showUploadList={false}
                                action={Utils.url + "UploadFile.php"}
                                beforeUpload={Utils.beforeUpload}
                                onChange={this.handleChange}
                            >
                                {
                                    this.state.imageUrl ?
                                        <img src={this.state.imageUrl} alt="" className="avatar" /> :
                                        <div className="pic-upload"></div>
                                }
                            </Upload>
                        </FormItem>
                        <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 58}}>
                            <FormItem title="姓名" titleWidth="86">
                                <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}}/>
                            </FormItem>
                            <FormItem title="性别" titleWidth="86">
                                <div className="flex flex-row flex-start align-center" style={{width: 236}}>
                                    <Check isChecked={this.state.sex === "M"} handle={() => {this.handle("sex","M")}}>
                                        <p style={{marginLeft: 12}}>男</p>
                                    </Check>
                                    <Check isChecked={this.state.sex === "F"} handle={() => {this.handle("sex","F")}} style={{marginLeft: 40}}>
                                        <p style={{marginLeft: 12}}>女</p>
                                    </Check>
                                </div>
                            </FormItem>
                        </div>
                        <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 58}}>
                            <FormItem title="英文名" titleWidth="86">
                                <Input name="name_en" value={this.state.name_en} handle={this.handle} style={{width: 236}}/>
                            </FormItem>
                            <FormItem title="手机" titleWidth="86">
                                <Input name="mobile" value={this.state.mobile} handle={this.handle} style={{width: 236}}/>
                            </FormItem>
                        </div>
                        <FormItem title="标签" titleWidth="86" marginTop="26">
                            <Tag name="tags" type={[3]} handle={this.handle} init={this.props.data.tag_ids}/>
                        </FormItem>
                        <FormItem title="认证类型" titleWidth="86" marginTop="26">
                            <p>{this.props.data.auth_type}</p>
                        </FormItem>
                        <FormItem title="投资人类型" titleWidth="86" marginTop="26">
                            <CheckTip name="invest_types" init={this.props.data.investtype_ids} getData="queryInvestorTypes" handle={this.handle} />
                        </FormItem>
                        {
                            this.state.is_org === "Y" ? (
                                <div>
                                    <FormItem title="投资机构" titleWidth="86" marginTop="26">
                                        <AutoCompleteOrg value={this.state.org_name} handle={this.changeOrg} />
                                    </FormItem>
                                    <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 58}}>
                                        <FormItem title="部门名称" titleWidth="86">
                                            <Input name="org_department" value={this.state.org_department} handle={this.handle} style={{width: 236}} />
                                        </FormItem>
                                        <FormItem title="职位" titleWidth="86">
                                            <Input name="org_job" value={this.state.org_job} handle={this.handle} style={{width: 156}} />
                                        </FormItem>
                                        <FormItem title="内部影响力" titleWidth="98">
                                            <Check isChecked={this.state.internal_power === "强"} handle={() => {this.handle("internal_power","强")}}>
                                                <p style={{marginLeft: 12}}>强</p>
                                            </Check>
                                            <Check isChecked={this.state.internal_power === "中"} handle={() => {this.handle("internal_power","中")}} style={{marginLeft: 40}}>
                                                <p style={{marginLeft: 12}}>中</p>
                                            </Check>
                                            <Check isChecked={this.state.internal_power === "弱"} handle={() => {this.handle("internal_power","弱")}} style={{marginLeft: 40}}>
                                                <p style={{marginLeft: 12}}>弱</p>
                                            </Check>
                                        </FormItem>
                                    </div>
                                </div>
                            ) : ("")
                        }
                        <FormItem title="关注领域:" titleWidth="71" marginTop="26">
                            <CheckTip name="preffered_fields" init={this.props.data.preffered_field_ids} getData="queryIndustries" handle={this.handle} />
                        </FormItem>
                        <FormItem title="关注阶段:" titleWidth="71" marginTop="16">
                            <CheckTip name="preffered_rounds" init={this.props.data.preffered_round_ids} getData="queryInvestRounds" handle={this.handle} />
                        </FormItem>
                        <FormItem title="单笔投资规模" titleWidth="120" marginTop="16">
                            <Input name="single_invest_size_min" value={this.state.single_invest_size_min} filter={Filter.checkNum} handle={this.handle} style={{width: 110}} />
                            <p style={{margin: "0 8px", color: "#dadbde"}}>-</p>
                            <Input name="single_invest_size_max" value={this.state.single_invest_size_max} filter={Filter.checkNum} handle={this.handle} style={{width: 110}} />
                            <p style={{marginLeft: 10}}>万元</p>
                        </FormItem>
                    </div>
                    <InfoTitle title="个人附加信息" marginTop="30"/>
                    <div style={{padding: "0 30px"}}>
                        <div className="flex flex-row flex-between" style={{marginTop: 20, paddingRight: 58}}>
                            <FormItem title="微信号" titleWidth="86">
                                <Input name="wechat" value={this.state.wechat} handle={this.handle} style={{width: 236}} />
                            </FormItem>
                            <FormItem title="QQ号" titleWidth="86">
                                <Input name="qq" value={this.state.qq} handle={this.handle} style={{width: 236}} />
                            </FormItem>
                        </div>
                        <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 58}}>
                            <FormItem title="Email" titleWidth="86">
                                <Input name="email" value={this.state.email} handle={this.handle} style={{width: 236}} />
                            </FormItem>
                            <FormItem title="生日" titleWidth="86">
                                <DatePicker
                                    defaultValue={this.props.data.birthday ? moment(this.props.data.birthday, 'YYYY-MM-DD') : ""}
                                    format="YYYY-MM-DD"
                                    allowClear={false}
                                    onChange={this.getTime}
                                    style={{width: 236}}
                                    getCalendarContainer={() => document.getElementById('slide')}
                                />
                            </FormItem>
                        </div>
                        <FormItem title="家庭住址" titleWidth="86" marginTop="26">
                            <Input name="address" value={this.state.address} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="简介" titleWidth="86" marginTop="26">
                            <TextArea name="introduction" value={this.state.introduction} handle={this.handle} style={{width: 236}}/>
                        </FormItem>
                    </div>
                    <InfoTitle title="其他" marginTop="30"/>
                    <div style={{padding: "0 30px"}}>
                        <FormItem title="渠道" titleWidth="90" marginTop="20">
                            <p>线下</p>
                        </FormItem>
                        <FormItem title="来源" titleWidth="86" marginTop="26">
                            <p>{this.props.data.source_type}</p>
                        </FormItem>
                        <FormItem title="是否认识公司内人员：" titleWidth="170" marginTop="26">
                            <Check isChecked={this.state.has} handle={() => {this.handle("has",true)}}>
                                <p style={{marginLeft: 10}}>是</p>
                            </Check>
                            {
                                this.state.has ? <input type="text" value={this.state.has ? this.state.has_connections : ""}  onChange={this._input.bind(this)} style={Style.input} /> : ""
                            }
                            <Check isChecked={!this.state.has} handle={() => {this.handle("has",false);this.setState({has_connections: ""});}} style={{marginLeft: 40}}>
                                <p style={{marginLeft: 10}}>否</p>
                            </Check>
                        </FormItem>
                        <FormItem title="客户经理" titleWidth="86" marginTop="26">
                            <AutoCompleteStaff value={this.state.cusManager_name} handle={this.changeManager} />
                        </FormItem>
                        <FormItem title="备注" titleWidth="86" marginTop="26">
                            <TextArea name="remark" value={this.state.remark} handle={this.handle} style={{width: 236}}/>
                        </FormItem>
                        <FormItem title="创建日期" titleWidth="86" marginTop="26">
                            <p>{this.props.data.create_time}</p>
                        </FormItem>
                        <FormItem title="录入人" titleWidth="86" marginTop="26">
                            <p>{this.props.data.creator_name}</p>
                        </FormItem>
                    </div>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="删除该投资人"
                                confirm={{
                                    content: <span>确认要删除该投资人吗？（<span style={{color: "#ff530c"}}>慎重</span>）</span>,
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
            </form>
        )
    }
}

class EnterpriseFinancing extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            allData: [],
            ownData: [],
            projectStatus: true
        }
    }

    componentDidMount = () => {
        let data = this.props.data.invest_cases.all;
        data.map((datas)=>{
            datas.fund_amount =  datas.fund_amount + "万元";
        });
        this.setState({
            allData: data
        })
    }

    componentWillReceiveProps = (nextProps) => {
        let data = nextProps.data.invest_cases.all;
        data.map((datas)=>{
            datas.fund_amount =  datas.fund_amount + "万元";
        });
        this.setState({
            allData: data
        })
    }

    changeStatus = (bool) => {
        this.setState({
            projectStatus: bool
        })
    }

    render() {
        return(
            <div style={{padding: "30px 20px", background: "#ffffff"}}>
                <InfoTable dataSource={this.state.allData} tableStyle={{ marginTop: 20 }}>
                    <InfoColumn title="项目名称" index="project_name" width="228" padding="0 14px 0 46px"/>
                    <InfoColumn title="领域" index="fields" width="260"/>
                    <InfoColumn title="轮次" index="rounds" width="176"/>
                    <InfoColumn title="投资金额" index="fund_amount" width="184"/>
                    <InfoColumn title="投资角色" index="role" width="182"/>
                </InfoTable>
            </div>
        )
    }
}

class EnterpriseTrend extends React.Component {
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
            obj_investors: [],
            files: [],
            site: "",
            remark: "",
            isEdit: false
        }
    }

    componentDidMount = () => {
        let data = this.props.data.invest_actv;
        for(let i=0;i<data.length;i++){
            if(data[i].files.length){
                if(data[i].files.length === 1){
                    data[i].filePath = <a download href={data[i].files[0].path.path}>会议记录附件</a>;
                }
            }
        }
        this.setState({
            id: this.props.id,
            data: data,
            title: "对投资人【" + this.props.data.name + "】的单方拜访"
        })
    }

    componentWillReceiveProps = (nextProps) => {
        let data = nextProps.data.invest_actv;
        for(let i=0;i<data.length;i++){
            if(data[i].files.length){
                if(data[i].files.length === 1){
                    data[i].filePath = <a download href={data[i].files[0].path.path}>会议记录附件</a>;
                }
            }
        }
        this.setState({
            id: nextProps.id,
            data: data,
            title: "对投资人【" + nextProps.data.name + "】的单方拜访"
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
        let obj_investors = [];
        obj_investors.push(this.state.id);
        this.setState({
            obj_investors: obj_investors,
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
                    obj_investors: [],
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
                        <p>本年度活动<span>{this.props.data.invest_actv_cnt_curyear}</span>次</p>
                    </div>
                    <div style={{ padding: "0 10px"}}>
                        <InfoTable dataSource={this.state.data} tableStyle={{ width: "100%" }}>
                            <InfoColumn title="活动时间" index="time" width="200" padding="0 14px 0 20px"/>
                            <InfoColumn title="活动主题" index="title" width="202"/>
                            <InfoColumn title="活动类型" index="type" width="124"/>
                            <InfoColumn title="活动对象" index="object" width="120"/>
                            <InfoColumn title="活动负责人" index="follower" width="114"/>
                            <InfoColumn title="活动形式" index="way" width="102"/>
                            <InfoColumn title="会议记录附件" index="filePath" width="162" padding="0 20px 0 0"/>
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
                        <form style={{padding: 30, backgroundColor: "#fff"}}
                              onSubmit={this._submit.bind(this)}>
                            <FormItem title="活动主题" titleWidth="106">
                                <Input name="title" value={this.state.title} handle={this.handle} style={{width: 236}}
                                       need={true}/>
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
                                <RadioTip ref="way" init={this.state.way} name="way" data={way} handle={this.handle}
                                          style={{paddingRight: 70}} need={true}/>
                            </FormItem>
                            <FormItem title="活动负责人" titleWidth="106" marginTop="26">
                                <AutoCompleteStaff value={this.state.staff} handle={this.changeStaff}/>
                            </FormItem>
                            <FormItem title="地点" titleWidth="106" marginTop="20">
                                <Input name="site" value={this.state.site} handle={this.handle} style={{width: 236}}/>
                            </FormItem>
                            <FormItem title="会议纪要" titleWidth="106" marginTop="26">
                                <TextArea name="record" value={this.state.record} handle={this.handle}
                                          style={{width: 236}} need={true}/>
                            </FormItem>
                            <FormItem title="备注" titleWidth="106" marginTop="26">
                                <TextArea name="remark" value={this.state.remark} handle={this.handle}
                                          style={{width: 236}}/>
                            </FormItem>
                            <FormItem title="附件" titleWidth="106" marginTop="26">
                                <FormUpload ref="files" name="files" handle={this.getFiles}/>
                            </FormItem>
                            <input type="submit" value="添加" className={Style.projectInteractSubmit}/>
                        </form>
                    ) : ("")
                }
            </div>
        )
    }
}