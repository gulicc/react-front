/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { History } from "react-router-dom";
import Style from "./css/user.css";
import UserContent from "./common/userComponent";
import { Input } from "../common/defaultInput";
import Icon from "../common/defaultIcon";

import Utils from "../../../store/utils";
import ManageAction from "../../../store/manageAction";

export default class ModifyPassword extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            oldPassword: "",
            newPassword: "",
            checkNewPassword: ""
        }
    }

    _input = (name,value) => {
        this.setState({
            [name]: value
        })
    }

    _submit = (e) => {
        e.preventDefault();
        if(this.state.newPassword === this.state.checkNewPassword){
            if(Utils.checkPassword(this.state.newPassword)) {
                ManageAction.changePassword(this.state.oldPassword, this.state.newPassword, () => {
                    setTimeout(() => {
                        this.props.history.push('/userInfo')
                    },3000);
                });
            }
        }else{
            layer.open({
                content: '两次密码填写不一致',
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        return(
            <form onSubmit={this._submit.bind(this)} className={Style.container}>
                <UserContent title="账号" value={Utils.getLoginData().login_phone} />
                <UserContent title="原密码" style={{marginTop: 10}}>
                    <Input type="password" value={this.state.oldPassword} name="oldPassword" handle={this._input} style={{width: 236}} />
                </UserContent>
                <UserContent title="新密码" style={{marginTop: 10}}>
                    <div className="flex flex-row flex-start">
                        <Input type="password" value={this.state.newPassword} name="newPassword" handle={this._input} style={{width: 236}} />
                        <p className={Style.passwordTip}>6-16位，可以包含数字和大小写字母</p>
                    </div>
                </UserContent>
                <UserContent title="确认新密码" style={{marginTop: 10}}>
                    <div className="flex flex-row flex-start align-center">
                        <Input type="password" value={this.state.checkNewPassword} name="checkNewPassword" handle={this._input} style={{width: 236}} />
                        {
                            !this.state.newPassword && !this.state.checkNewPassword ? (
                                ""
                            ) : (
                                this.state.newPassword === this.state.checkNewPassword ? <Icon name="iconTrueSmall" style={{marginLeft: 20}} /> : <Icon name="iconFalseSmall" style={{marginLeft: 20}} />
                            )

                        }
                    </div>
                </UserContent>
                <div className={"flex flex-row flex-center " + Style.button} style={{marginTop: 32}}>
                    <input type="submit" value="保存" className={Style.modifySave}/>
                </div>
            </form>
        )
    }
}