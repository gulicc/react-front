/**
 * Created by Galaxy065 on 2017/5/10.
 */
import React from "react";
import { History } from "react-router-dom";
import Style from "./css/agencyInfo.css";
import { InfoTitle, InfoContent, InfoTable, InfoColumn } from "../common/infoArea";
import { FormItem } from "../common/formArea";
import {Input, TextArea, Check, RadioTip, CheckTip} from "../common/defaultInput";
import Tag from "../common/tag";
import { EditButton, WatchButton, FormButton } from "../common/defaultButton";
import { AgencyTeam } from "./common/common";
import { Select } from "antd";

import Utils from "../../../store/utils";
import OrgAction from "../../../store/orgAction";

export default class AgencyInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: "",
            data: {},
            isWatch: true
        }
    }

    componentDidMount = () => {
        this.setState({
            id: this.props.id
        },()=>{
            this.queryInvestOrg();
        })
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.id !== this.props.id){
            this.setState({
                id: nextProps.id,
                isWatch: true
            },()=>{
                this.queryInvestOrg();
            })
        }
    }

    queryInvestOrg = () => {
        OrgAction.queryInvestOrg(this.state,(data)=>{
            this.setState({
                data: data
            })
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
        this.queryInvestOrg();
        this.props.complete();
    }

    render() {
        return(
            <div>
                <div className={"flex flex-row flex-start " + Style.header}>
                    <h3>{this.state.data.name}</h3>
                    {
                        this.state.data.tags && this.state.data.tags.length ? (
                            this.state.data.tags.map((tag,i)=>{
                                return(
                                    <p key={i}>{tag}</p>
                                )
                            })
                        ) : ("")
                    }
                </div>
                {
                    this.state.isWatch ? <WatchOrg data={this.state.data} changeWatchAndEdit={()=>{this.changeWatchAndEdit(false)}} /> : <EditOrg data={this.state.data} id={this.state.id} delete={this.props.delete} complete={this.complete} changeWatchAndEdit={()=>{this.changeWatchAndEdit(true)}} />
                }
            </div>
        )
    }
}

export class WatchOrg extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            allData: [],
        }
    }

    componentDidMount = () => {
        let data = this.props.data.invest_records ? this.props.data.invest_records.all : [];
        data.map((datas)=>{
            datas.fund_amount =  datas.fund_amount + "万元";
        });
        this.setState({
            allData: data
        });
    }

    componentWillReceiveProps = (nextProps) => {
        let data = nextProps.data.invest_records ? nextProps.data.invest_records.all : [];
        data.map((datas)=>{
            datas.fund_amount =  datas.fund_amount + "万元";
        });
        this.setState({
            allData: data
        });
    }

    render() {
        return(
            <div className={Style.container}>
                {
                    this.props.isWatch ? ("") : <EditButton handle={this.props.changeWatchAndEdit} style={{right: 20}} />
                }
                <div>
                    <InfoTitle title="基本信息"/>
                    <InfoContent title="投资机构名称：" value={this.props.data.name} width="110" marginTop="5" />
                    <InfoContent title="机构简称：" value={this.props.data.name_abbr} width="110" />
                    <InfoContent title="机构类型：" value={this.props.data.type} width="110" />
                    <InfoContent title="主页：" value={this.props.data.web} width="110" />
                    <InfoContent title="公司地址：" value={this.props.data.address} width="110" />
                    <div className="flex flex-row flex-start">
                        <InfoContent title="资金规模：" value={Utils.findFundSize(this.props.data.fund_size)} width="110" contentWidth="504" />
                        <InfoContent title="人数：" value={Utils.findStaffSize(this.props.data.staff_size)} width="64" />
                    </div>
                    <InfoContent title="关注领域：" value={this.props.data.preffered_fields} width="110" />
                    <InfoContent title="关注阶段：" value={this.props.data.preffered_rounds} width="110" />
                    <InfoContent title="简介：" value={this.props.data.intro} width="110" />
                    <InfoContent title="标签："  width="110" >
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
                    <InfoContent title="创建日期：" value={this.props.data.create_time} width="110" />
                </div>
                <div>
                    <InfoTitle title="团队成员" marginTop="30"/>
                    {
                        this.props.data.team && this.props.data.team.length ? (
                            <div style={{marginTop: 7}}>
                                <div className={"flex flex-row flex-start " + Style.team}>
                                    <p style={{width: 130}}>职位</p>
                                    <p style={{width: 130}}>姓名</p>
                                    <p>简介</p>
                                </div>
                                {
                                    this.props.data.team.map((teams,i)=>{
                                        return(
                                            <div className={"flex flex-row flex-start " + Style.team} key={i}>
                                                <p style={{width: 130}}>{teams.name}</p>
                                                <p style={{width: 130}}>{teams.job}</p>
                                                <p>{teams.intro}</p>
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
                    <InfoTitle title="投资记录" marginTop="30"/>
                    <div style={{padding: "0 20px"}}>
                        <InfoTable dataSource={this.state.allData } tableStyle={{ marginTop: 20 }}>
                            <InfoColumn title="项目名称" index="project_name" width="198" padding="0 14px 0 54px"/>
                            <InfoColumn title="领域" index="fields" width="260"/>
                            <InfoColumn title="轮次" index="rounds" width="126"/>
                            <InfoColumn title="投资金额" index="fund_amount" width="144"/>
                            <InfoColumn title="投资角色" index="role" width="140"/>
                            <InfoColumn title="投资人" index="investor_name" width="162" padding="0 46px 0 0"/>
                        </InfoTable>
                    </div>
                </div>
            </div>
        )
    }
}

class EditOrg extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id,
            name: this.props.data.name,
            is_galaxy: this.props.data.is_galaxy,
            name_abbr: this.props.data.name_abbr,
            type: this.props.data.type_id,
            address: this.props.data.address,
            web: this.props.data.web,
            fund_size: this.props.data.fund_size,
            staff_size: this.props.data.staff_size,
            pref_fields: this.props.data.preffered_field_ids,
            pref_phases: this.props.data.preffered_round_ids,
            intro: this.props.data.intro,
            tags: this.props.data.tag_ids,
            team: this.props.data.team
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeFundSize = (value) => {
        this.handle("fund_size",value);
    }

    changeStaffSize = (value) => {
        this.handle("staff_size",value);
    }

    deleteOrg = () => {
        OrgAction.deleteInvestOrg(this.state,(data)=>{
            layer.open({
                content: "投资机构删除成功！",
                skin: 'msg',
                style: 'color:#ffffff;bottom:0;',
                time: 3
            });
            setTimeout(()=>{
                this.props.delete();
            },3000)
        });
    }

    _submit = () => {
        let team = [];
        let teamData = this.refs.team.state.team;
        for(let i=0;i<teamData.length;i++){
            if(teamData[i].name){
                team.push({
                    name: teamData[i].name,
                    job: teamData[i].job,
                    intro: teamData[i].intro
                })
            }
        }
        this.setState({
            team: team
        },()=>{
            OrgAction.editInvestOrg(this.state,(data)=>{
                layer.open({
                    content: "投资机构信息修改成功！",
                    skin: 'msg',
                    style: 'color:#ffffff;bottom:0;',
                    time: 3
                });
                setTimeout(()=>{
                    this.props.complete();
                },3000)
            })
        })
    }

    render() {
        const fundSize = [
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
        ];
        const staffSize = [
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
        ];
        const Option = Select.Option;
        return(
            <div>
                <div className={Style.container}>
                    <WatchButton handle={this.props.changeWatchAndEdit} style={{right: 20}}/>
                    <InfoTitle title="基本信息"/>
                    <div style={{paddingLeft: 30}}>
                        <FormItem title="机构名称" titleWidth="136" marginTop="24">
                            <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                            <Check isChecked={this.state.is_galaxy === "Y"} handle={() => {this.handle("is_galaxy",this.state.is_galaxy === "Y" ? "N" : "Y")}} style={{marginLeft: 60}}>
                                <p style={{marginLeft: 10}}>是否属于星河集团</p>
                            </Check>
                        </FormItem>
                        <FormItem title="机构简称" titleWidth="136" marginTop="26">
                            <Input name="name_abbr" value={this.state.name_abbr} handle={this.handle} style={{width: 236}} need={true}/>
                        </FormItem>
                        <FormItem title="标签" titleWidth="136" marginTop="26">
                            <Tag name="tags" type={[4]} handle={this.handle} init={this.props.data.tag_ids}/>
                        </FormItem>
                        <FormItem title="机构类型" titleWidth="121" marginTop="26">
                            <RadioTip name="type" init={this.props.data.type_id} getData="queryInvestOrgTypes" handle={this.handle} style={{paddingRight: 70}}/>
                        </FormItem>
                        <FormItem title="主页" titleWidth="136" marginTop="26">
                            <Input name="web" value={this.state.web} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="公司地址" titleWidth="136" marginTop="26">
                            <Input name="address" value={this.state.address} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 106}}>
                            <FormItem title="资金规模" titleWidth="136">
                                <Select value={this.state.fund_size ? parseInt(this.state.fund_size) : ""} style={{ width: 236 }} getPopupContainer={() => document.getElementById('slide')} onChange={this.changeFundSize}>
                                    {
                                        fundSize.map((data,i)=>{
                                            return(
                                                <Option key={i} value={data.id}>{data.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormItem>
                            <FormItem title="人数" titleWidth="88">
                                <Select value={this.state.staff_size ? parseInt(this.state.staff_size) : ""} style={{ width: 236 }} getPopupContainer={() => document.getElementById('slide')} onChange={this.changeStaffSize}>
                                    {
                                        staffSize.map((data,i)=>{
                                            return(
                                                <Option key={i} value={data.id}>{data.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </div>
                        <FormItem title="关注领域" titleWidth="75" marginTop="26">
                            <CheckTip name="pref_fields" init={this.props.data.preffered_field_ids} getData="queryIndustries" handle={this.handle} />
                        </FormItem>
                        <FormItem title="关注阶段" titleWidth="75" marginTop="16">
                            <CheckTip name="pref_phases" init={this.props.data.preffered_round_ids} getData="queryInvestRounds" handle={this.handle} />
                        </FormItem>
                        <FormItem title="简介" titleWidth="136" marginTop="26">
                            <TextArea name="intro" value={this.state.intro} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="创建日期" titleWidth="90" marginTop="26">
                            <p style={{lineHeight: "28px"}}>{this.props.data.create_time}</p>
                        </FormItem>
                    </div>
                    <InfoTitle title="团队成员" marginTop="26"/>
                    <div style={{paddingLeft: 30}}>
                        <AgencyTeam ref="team" init={this.props.data.team} />
                    </div>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="删除该投资机构"
                                confirm={{
                                    content: <span>确认要删除该投资机构吗？（<span style={{color: "#ff530c"}}>慎重</span>）</span>,
                                    saveHandle: this.deleteOrg
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