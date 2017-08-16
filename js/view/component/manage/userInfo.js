/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Link } from "react-router-dom";
import Style from "./css/user.css";
import UserContent from "./common/userComponent";

import Utils from "../../../store/utils";
import ManageAction from "../../../store/manageAction";

export default class UserInfo extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userData: {}
        }
    }

    componentDidMount = () => {
        ManageAction.getMemberInfo((data)=>{
            this.setState({
                userData: data
            })
        })
    }

    render() {
        return(
            <div className={Style.container}>
                <UserContent title="姓名：" value={this.state.userData.platformor_fullname} />
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
                <UserContent title="手机号：" value={Utils.getLoginData().login_phone} />
                <UserContent title="邮箱：" value={this.state.userData.platformor_email} />
                <div className={"flex flex-row flex-center " + Style.button}>
                    <Link to="/userInfo/modifyPassword" className={Style.modifyPassword}>修改密码</Link>
                    <Link to={{pathname: "/userInfo/modifyUserInfo", query: {userData: this.state.userData}}} className={Style.modifyUserInfo}>修改信息</Link>
                </div>
            </div>
        )
    }
}