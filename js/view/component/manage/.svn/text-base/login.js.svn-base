/**
 * Created by Galaxy065 on 2017/5/2.
 */
import React from "react";
import { Link, History } from "react-router-dom";
import Style from "./css/manage.css";
import Input from "./common/input";
import { Check } from "../common/defaultInput";

import Utils from "../../../store/utils";
import ManageAction from "../../../store/manageAction";

export default class Login extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mobile: "",
            password: "",
            validate: "",
            isChecked: false
        }
    }

    _input = (name,value) => {
        this.setState({
            [name]: value
        })
    }

    setChecked = () => {
        this.setState({
            isChecked: !this.state.isChecked
        })
    }

    _submit = (e) => {
        e.preventDefault();
        ManageAction.login(this.state.mobile,this.state.password,this.state.validate,(data)=>{
            window.localStorage.setItem("loginData",JSON.stringify(data));
            if(this.state.isChecked){
                window.localStorage.setItem("expireTime",Date.parse(new Date()) + (7*24*3600*1000));
            }else{
                window.localStorage.removeItem("expireTime");
            }
            setTimeout(() => {
                this.props.history.push('/');
            },10);
        });
    }

    render(){
        return(
            <div className={Style.background} style={{height: window.innerHeight}}>
                <div className={Style.login}>
                    <header className={Style.header}>
                        <h1>星河融快</h1>
                        <p>运营管理系统</p>
                    </header>
                    <form onSubmit={this._submit.bind(this)} className={Style.loginForm}>
                        <Input type="text" placeholder="请输入账号" value={this.state.mobile} handle={this._input} name="mobile" maxLength={11} />
                        <div className={Style.forget}>
                            <Input type="password" placeholder="请输入密码" value={this.state.password} handle={this._input} name="password" />
                        </div>
                        <div className={"flex flex-row flex-between " + Style.validateImgArea}>
                            <Input type="text" placeholder="请输入验证码" value={this.state.validate} handle={this._input} name="validate" maxLength={4} />
                            <ValidateImg />
                        </div>
                        <div className={"flex flex-row flex-between align-center " + Style.controller}>
                            <Check className={Style.remember} isChecked={this.state.isChecked} handle={this.setChecked} checkStyle={{width: 16, height: 16}}>
                                <p>7天内自动登录</p>
                            </Check>
                            <Link to="/findPassword">忘记密码？</Link>
                        </div>
                        <input type="submit" value="登录" className={Style.submit} />
                    </form>
                </div>
            </div>
        )
    }
}

class ValidateImg extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            fresh: true
        }
    }

    freshImg = () => {
        this.setState({
            fresh: false
        },() => {
            this.setState({
                fresh: true
            })
        })
    }

    render() {
        return(
            <div className={Style.validateImg}>
                {
                    this.state.fresh ? <img className={Style.validate} src={Utils.url + "GetVerificationImage.php"} onClick={this.freshImg}/> : ""
                }
            </div>
        )
    }
}