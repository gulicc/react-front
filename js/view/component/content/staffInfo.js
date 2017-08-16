/**
 * Created by Galaxy065 on 2017/5/24.
 */
import React from "react";
import { InfoContent } from "../common/infoArea";
import { FormItem } from "../common/formArea";
import { Input, Check, Need } from "../common/defaultInput";
import { FormButton } from "../common/defaultButton";
import { Select } from 'antd';

import PlatformAction from "../../../store/platformAction";

export class StaffDetail extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <div style={{padding: "15px 0", backgroundColor: "#ffffff"}}>
                <InfoContent title="姓名：" value={this.props.data.platformor_fullname} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="性别：" value={this.props.data.platformor_sex === "M" ? "男" : "女"} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="所属公司：" value={this.props.data.platorg_name} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="所属部门：" value={this.props.data.platdprt_nodename} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="员工号：" value={this.props.data.platformor_sn} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="岗位：" value={this.props.data.platformor_jobtitle} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="角色：" value={this.props.data.platact_name} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="手机号：" value={this.props.data.login_phone} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                <InfoContent title="邮箱：" value={this.props.data.platformor_email} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
            </div>
        )
    }
}

export class StaffModify extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            platformid: this.props.data.platform_id,
            mbname: this.props.data.platformor_fullname,
            mbsex: this.props.data.platformor_sex,
            mborg: this.props.data.platorg_id,
            mbdep: this.props.data.platdprt_nodename,
            mbdepid: this.props.data.mbdepid,
            mbsn: this.props.data.platformor_sn,
            mbjobtitle: this.props.data.platformor_jobtitle,
            mbrole: this.props.data.platact_id,
            mbphone: this.props.data.login_phone,
            mbemail: this.props.data.platformor_email,
            orgData: [],
            orgActorData: []
        }
    }

    componentDidMount = () => {
        PlatformAction.getOrgActorList((data)=>{
            this.setState({
                orgActorData: data
            })
        });
        PlatformAction.getOrgList((data)=>{
            this.setState({
                orgData: data
            })
        });
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeRole = (value) => {
        this.setState({
            mbrole: value
        })
    }

    changeOrg = (value) => {
        this.setState({
            mborg: value
        })
    }

    _submit = () => {
        PlatformAction.updateMemberInfo(this.state,(data)=>{
            this.props.closeSlide();
        })
    }

    render() {
        const Option = Select.Option;
        return(
            <div>
                <div style={{padding: "30px", backgroundColor: "#ffffff"}}>
                    <FormItem title="姓名" titleWidth="110">
                        <Input name="mbname" value={this.state.mbname}  handle={this.handle} style={{width: 236}} need={true}/>
                    </FormItem>
                    <FormItem title="性别" titleWidth="110" marginTop="26">
                        <div className="flex flex-row flex-start">
                            <Check isChecked={this.state.mbsex === "M"} handle={() => {this.handle("mbsex","M")}}>
                                <p style={{marginLeft: 12}}>男</p>
                            </Check>
                            <Check isChecked={this.state.mbsex === "F"} handle={() => {this.handle("mbsex","F")}} style={{marginLeft: 40}}>
                                <p style={{marginLeft: 12}}>女</p>
                            </Check>
                        </div>
                    </FormItem>
                    <FormItem title="所属公司" titleWidth="110" marginTop="26">
                        <Select value={this.state.orgData.length ? this.state.orgData[0].platorg_id : ""} getPopupContainer={() => document.getElementById('slide')} style={{ width: 236 }} onChange={this.changeOrg}>
                            {
                                this.state.orgData.map((org,i)=>{
                                    return(
                                        <Option key={i} value={org.platorg_id}>{org.platorg_name}</Option>
                                    )
                                })
                            }
                        </Select>
                    </FormItem>
                    <FormItem title="所属部门" titleWidth="110" marginTop="26">
                        <Input name="mbdep" value={this.state.mbdep}  handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="员工号" titleWidth="110" marginTop="26">
                        <Input name="mbsn" value={this.state.mbsn}  handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="岗位" titleWidth="110" marginTop="26">
                        <Input name="mbjobtitle" value={this.state.mbjobtitle}  handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                    <FormItem title="角色" titleWidth="110" marginTop="26">
                        <Select ref="select" defaultValue={this.props.data.platact_name} getPopupContainer={() => document.getElementById('slide')} style={{ width: 236 }} onChange={this.changeRole}>
                            {
                                this.state.orgActorData.map((orgActor,i)=>{
                                    return(
                                        <Option key={i} value={orgActor.platact_id}>{orgActor.platact_name}</Option>
                                    )
                                })
                            }
                        </Select>
                        <Need />
                    </FormItem>
                    <FormItem title="手机号" titleWidth="110" marginTop="26">
                        <Input name="mbphone" value={this.state.mbphone}  handle={this.handle} style={{width: 236}} need={true}/>
                    </FormItem>
                    <FormItem title="邮箱" titleWidth="110" marginTop="26">
                        <Input name="mbemail" value={this.state.mbemail}  handle={this.handle} style={{width: 236}}/>
                    </FormItem>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="保存" handle={this._submit} style={{backgroundColor: "#ff530c"}}/>
                </div>
            </div>
        )
    }
}