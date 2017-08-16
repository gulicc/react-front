/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Link, History } from "react-router-dom";
import Style from "./css/header.css";

import Utils from "../../../store/utils";
import ManageAction from "../../../store/manageAction";

export default class Header extends React.Component {
    constructor(props){
        super(props)
    }

    logout = () => {
        ManageAction.logout();
        window.localStorage.removeItem("loginData");
        window.localStorage.removeItem("expireTime");
        setTimeout(() => {
            this.props.history.push("/login");
        },10);
    }

    render() {
        return(
            <header className={"flex flex-row flex-between align-center " + Style.header} style={this.props.style}>
                <h2>{this.props.title}</h2>
                {
                    this.props.user && Utils.getLoginData() ? (
                        <div className={"flex flex-row flex-start align-center " + Style.user}>
                            <span></span>
                            <p>欢迎您，
                                <a className={Style.userName}>
                                    {Utils.getLoginData().platform_personname}
                                    <div className={Style.userHandle}>
                                        <div>
                                            <Link to="/userInfo" className={Style.userInfo}>个人信息</Link>
                                            <a onClick={this.logout} className={Style.logOut}>退出</a>
                                        </div>
                                    </div>
                                </a>
                                （{Utils.getLoginData().roles[0].platact_name}）
                            </p>
                        </div>
                    ) : ("")
                }
            </header>
        )
    }
}