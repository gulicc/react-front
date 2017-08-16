/**
 * Created by Galaxy065 on 2017/5/5.
 */
import React from "react";
import { History } from "react-router-dom";
import { FormArea, FormItem, FormSubmit } from "../common/formArea";
import {Input, TextArea, Check, RadioTip, CheckTip} from "../common/defaultInput";
import Tag from "../common/tag";
import { AgencyTeam } from "./common/common";
import { Select } from 'antd';

import OrgAction from "../../../store/orgAction";

export default class AddAgency extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            //防止重复提交
            submitStatus: true,
            name: "",
            is_galaxy: "N",
            name_abbr: "",
            type: "",
            address: "",
            web: "",
            fund_size: "",
            staff_size: "",
            pref_fields: "",
            pref_phases: "",
            intro: "",
            tags: [],
            team: []
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

    _submit = (e) => {
        e.preventDefault();
        if(this.state.submitStatus){
            this.setState({
                submitStatus: false
            })
        }else{
            return false
        }
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
            OrgAction.createInvestOrg(this.state,(data)=>{
                this.props.complete();
            },()=>{
                this.setState({
                    submitStatus: true
                })
            });
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
            <form onSubmit={this._submit.bind(this)}>
                <FormArea title="基本信息"  paddingBottom="17">
                    <FormItem title="机构名称" titleWidth="136" marginTop="24">
                        <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                        <Check isChecked={this.state.is_galaxy === "Y"} handle={() => {this.handle("is_galaxy",this.state.is_galaxy === "Y" ? "N" : "Y")}} style={{marginLeft: 60}}>
                            <p style={{marginLeft: 10}}>是否属于星河集团</p>
                        </Check>
                    </FormItem>
                    <FormItem title="机构简称" titleWidth="136" marginTop="26">
                        <Input name="name_abbr" value={this.state.name_abbr} handle={this.handle} style={{width: 236}} need={true} />
                    </FormItem>
                    <FormItem title="机构类型" titleWidth="121" marginTop="26">
                        <RadioTip name="type" getData="queryInvestOrgTypes" handle={this.handle} style={{paddingRight: 70}} need={true} />
                    </FormItem>
                    <FormItem title="主页" titleWidth="136" marginTop="26">
                        <Input name="web" value={this.state.web} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="公司地址" titleWidth="136" marginTop="26">
                        <Input name="address" value={this.state.address} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <div className="flex flex-row flex-between" style={{marginTop: 26, paddingRight: 106}}>
                        <FormItem title="资金规模" titleWidth="136">
                            <Select style={{ width: 236 }} onChange={this.changeFundSize}>
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
                            <Select style={{ width: 236 }} onChange={this.changeStaffSize}>
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
                        <CheckTip name="pref_fields" getData="queryIndustries" handle={this.handle} />
                    </FormItem>
                    <FormItem title="关注阶段" titleWidth="75" marginTop="16">
                        <CheckTip name="pref_phases" getData="queryInvestRounds" handle={this.handle} />
                    </FormItem>
                    <FormItem title="简介" titleWidth="136" marginTop="26">
                        <TextArea name="intro" value={this.state.intro} handle={this.handle} style={{width: 236}} />
                    </FormItem>
                    <FormItem title="标签" titleWidth="136" marginTop="26">
                        <Tag name="tags" type={[4]} handle={this.handle}/>
                    </FormItem>
                </FormArea>
                <FormArea title="团队成员" marginTop="10" paddingBottom="30">
                    <AgencyTeam ref="team"/>
                </FormArea>
                <FormSubmit value="提交" />
            </form>
        )
    }
}