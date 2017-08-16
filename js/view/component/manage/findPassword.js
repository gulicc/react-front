/**
 * Created by Galaxy065 on 2017/5/2.
 */
import React from "react";
import { History } from "react-router-dom";
import Style from "./css/manage.css";
import Input from "./common/input";

import ManageAction from "../../../store/manageAction";

export default class FindPassword extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            mobile: "",
            validate: "",
            newPassword: "",
            checkPassword: "",
            checkStatus: -1 // -1为初始化，0为不匹配，1为匹配
        }
    }

    _input = (name,value) => {
        this.setState({
            [name]: value
        },() => {
            if(!this.state.checkPassword){
                this.setState({
                    checkStatus: -1
                })
            }else if(this.state.checkPassword != this.state.newPassword){
                this.setState({
                    checkStatus: 0
                })
            }else {
                this.setState({
                    checkStatus: 1
                })
            }
        })
    }

    _submit = (e) => {
        e.preventDefault();
        ManageAction.forgotPassword(this.state,(data)=>{
            setTimeout(() => {
                this.props.history.push('/login')
            },10);
        })
    }

    render(){
        return(
            <div className={Style.background} style={{height: window.innerHeight}}>
                <div className={Style.find}>
                    <form onSubmit={this._submit.bind(this)} className={Style.findForm}>
                        <div className={"flex flex-row flex-start " + Style.codeButton}>
                            <Input type="text" placeholder="请输入注册手机号" value={this.state.mobile} handle={this._input} name="mobile" maxLength={11} />
                            <ValidateButton value={this.state.mobile} />
                        </div>
                        <Input type="text" placeholder="请输入验证码" value={this.state.validate} handle={this._input} name="validate" marginBottom="25"/>
                        <Input type="password" placeholder="请输入新密码" value={this.state.newPassword} handle={this._input} name="newPassword" marginBottom="25"/>
                        <div className={"flex flex-row flex-start align-center " + Style.checkPassword}>
                            <Input type="password" placeholder="请确认新密码" value={this.state.checkPassword} handle={this._input} name="checkPassword" />
                            {
                                (() => {
                                    switch(this.state.checkStatus){
                                        case -1: return;
                                        break;
                                        case 0: return <span className={Style.checkFalse}></span>
                                        break;
                                        case 1: return <span className={Style.checkTrue}></span>
                                        break;
                                    }
                                })()
                            }
                        </div>
                        <input type="submit" value="提交" className={Style.submit} />
                    </form>
                </div>
            </div>
        )
    }
}

class ValidateButton extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            status: 1, // 0为倒计时，1为发送，2为重新发送
            style: {
                backgroundColor: "#ff530c"
            },
            text: "发送",
            count: this.getCookieValue("findPassword") ? this.getCookieValue("findPassword") : 60
        }
    }

    componentWillMount = () => {
        if(this.state.count){

        }
        this.getCookieValue("123");
    }

    getValidate = () => {
        if(this.state.status){
            ManageAction.getVerifyCode(this.props.value,(data)=>{
                this.setState({
                    status: 0,
                    style: {
                        backgroundColor: "#cac8c8"
                    }
                })
                this.addCookie("findPassword",60,60);
                let time = setInterval(() => {
                    if(this.state.count > 1){
                        this.editCookie("findPassword",this.state.count,this.state.count + 1);
                        this.setState({
                            count: this.state.count - 1
                        })
                    }else{
                        this.setState({
                            status: 2,
                            count: 60,
                            text: "重新发送",
                            style: {
                                backgroundColor: "#ff530c"
                            },
                        })
                        clearInterval(time);
                    }
                },1000)
            });
        }else{
            return false;
        }
    }

    addCookie = (name,value,expiresHours) => {
        let cookieString = name + "=" + escape(value);
        //判断是否设置过期时间,0代表关闭浏览器时失效
        if(expiresHours>0){
            let date=new Date();
            date.setTime(date.getTime()+expiresHours*1000);
            cookieString=cookieString+";expires=" + date.toUTCString();
        }
        document.cookie=cookieString;
    }

    editCookie = (name,value,expiresHours) => {
        let cookieString=name+"="+escape(value);
        if(expiresHours>0){
            let date=new Date();
            date.setTime(date.getTime()+expiresHours*1000); //单位是毫秒
            cookieString=cookieString+";expires=" + date.toGMTString();
        }
        document.cookie=cookieString;
    }

    getCookieValue = (name) => {
        let strCookie = document.cookie;
        let arrCookie = strCookie.split("; ");
        for (let i = 0; i < arrCookie.length; i++) {
            let arr = arrCookie[i].split("=");
            if (arr[0] == name) {
                return unescape(arr[1]);
                break;
            } else {
                return "";
                break;
            }
        }
    }

    render() {
        return(
            <a className={Style.validateButton} style={this.state.style} onClick={() => {this.getValidate()}}>
                {
                    this.state.status ? this.state.text : this.state.count + "s"
                }
            </a>
        )
    }
}
