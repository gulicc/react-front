/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { History } from "react-router-dom";
import Style from "./css/user.css";
import UserContent from "./common/userComponent";
import { Input } from "../common/defaultInput";
import Icon from "../common/defaultIcon";
import Shadow from "../common/shadow";
import {AlertButton, AlertWindow} from "../common/alertWindow";

import Utils from "../../../store/utils";
import ManageAction from "../../../store/manageAction";

export default class ModifyUserInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userData: {},
            oldMobile: Utils.getLoginData().login_phone,
            mobile: Utils.getLoginData().login_phone,
            email: "",
            checkMobile: false,
            shadowStatus: false
        }
    }

    componentDidMount = () => {
        if(this.props.location.query){
            this.setState({
                userData: this.props.location.query.userData,
                email: this.props.location.query.userData.platformor_email
            })
        }else{
            ManageAction.getMemberInfo((data)=>{
                this.setState({
                    userData: data,
                    email: data.platformor_email
                })
            })
        }
    }

    _input = (name,value) => {
        this.setState({
            [name]: value
        })
        if(name === "mobile"){
            ManageAction.checkExist(value,(data)=>{
                if(data.status_code === 9000){
                    this.setState({
                        checkMobile: true
                    })
                }else{
                    this.setState({
                        checkMobile: false
                    })
                }
            })
        }
    }

    _submit = (e) => {
        e.preventDefault();
        if(Utils.checkEmail(this.state.email)){
            if(this.state.oldMobile == this.state.mobile){
                ManageAction.updateMemberInfo(this.state.mobile,this.state.email,()=>{
                    this.props.history.push('/userInfo');
                });
            }else{
                if(Utils.checkMobile(this.state.mobile)){
                    this.setState({
                        shadowStatus: true
                    })
                }
            }
        }
    }

    save = () => {
        ManageAction.updateMemberInfo(this.state.mobile,this.state.email,()=>{
            window.localStorage.removeItem("loginData");
            setTimeout(() => {
                this.props.history.push('/login')
            },10);
        });
    }

    close = () => {
        this.setState({
            shadowStatus: false
        })
    }

    render() {
        return(
            <form onSubmit={this._submit.bind(this)} className={Style.container}>
                {
                    this.state.shadowStatus ? (
                        <Shadow>
                            <AlertWindow style={{marginTop: -100, marginLeft: -200, padding: "", width: 400, height: 200}}
                                         handle={this.close}
                            >
                                <CheckMobileWindow saveHandle={this.save} cancelHandle={this.close} mobile={this.state.mobile} />
                            </AlertWindow>
                        </Shadow>
                    ) : ("")
                }
                <UserContent title="姓名：" value={this.state.userData.platformor_name} />
                <UserContent title="员工号：" value={this.state.userData.platformor_sn} />
                <UserContent title="性别：" value={
                    (()=>{
                        switch (this.state.userData.platformor_sex){
                            case "M":
                                return "男";
                                break;
                            case "F":
                                return "女";
                                break;
                        }
                    })()
                } />
                <UserContent title="所属公司：" value={Utils.getLoginData().platform_orgname} />
                <UserContent title="所属部门：" value={Utils.getLoginData().platform_department} />
                <UserContent title="岗位：" value={this.state.userData.platformor_jobtitle} />
                <UserContent title="角色：" value={Utils.getLoginData().roles[0].platact_name} />
                <UserContent title="手机号：">
                    <div className="flex flex-row flex-start align-center">
                        <Input value={this.state.mobile} name="mobile" handle={this._input} style={{width: 236}} />
                        {
                            this.state.checkMobile ? <Icon name="iconTrueSmall" style={{marginLeft: 20}} /> : ""
                        }
                    </div>
                </UserContent>
                <UserContent title="邮箱：" style={{marginTop: 10}}>
                    <Input value={this.state.email} name="email" handle={this._input} style={{width: 236}} />
                </UserContent>
                <div className={"flex flex-row flex-center " + Style.button} style={{marginTop: 24}}>
                    <input type="submit" value="保存" className={Style.modifySave}/>
                </div>
            </form>
        )
    }
}

class CheckMobileWindow extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div>
                <div className={Style.modifyMobileContent}>
                    <p>手机号将修改为<span>{this.props.mobile}</span></p>
                    <p>登录账号也将随之更改为新的手机号</p>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 42}}>
                    <AlertButton name="仍要修改" className="save" style={{marginRight: 20}} handle={this.props.saveHandle}/>
                    <AlertButton name="取消" className="cancel" handle={this.props.cancelHandle}/>
                </div>
            </div>
        )
    }
}