/**
 * Created by Galaxy065 on 2017/5/2.
 */
import React from "react";
import { HashRouter as Router, Route, Redirect, History } from "react-router-dom";
import Slider from "../slider/slider";
import Header from "../common/header";
import BusinessIndex from "../content/businessIndex";
import OperateIndex from "../content/operateIndex";
import AdminIndex from "../content/adminIndex";
import UserInfo from "../manage/userInfo";
import ModifyUserInfo from "../manage/modifyUserInfo";
import ModifyPassword from "../manage/modifyPassword";
import ProjectManagement from "../content/projectManagement";
import InvestorManagement from "../content/investorManagement";
import AgencyManagement from "../content/agencyManagement";
import EnterpriseManagement from "../content/enterpriseManagement";
import BusinessManagement from "../content/businessManagement";
import RoleManagement from "../content/roleManagement";
import StaffManagement from "../content/staffManagement";
import AccountManagement from "../content/accountManagement";
import TagManagement from "../content/tagManagement";
import AddProject from "../content/addProject";
import AddEnterprise from "../content/addEnterprise";
import AddInvestor from "../content/addInvestor";
import AddAgency from "../content/addAgency";
import AddBusiness from "../content/addBusiness";
import AddImport from "../content/addImport";
import FreeScrollBar from 'react-free-scrollbar';

import Utils from "../../../store/utils";

export default class Index extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: true
        }
        this.routes = [
            {
                path: '/',
                exact: true,
                sidebar: "首页",
                main: (() => {
                    if(Utils.getLoginData()){
                        switch (Utils.getLoginData().roles[0].platact_name) {
                            case "业务人员":
                                return BusinessIndex;
                                break;
                            case "运营人员":
                                return OperateIndex;
                                break;
                            case "管理员":
                                return AdminIndex;
                                break;
                            default:
                                return AdminIndex;
                                break;
                        }
                    }
                })(),
                handle: this.toggle
            },
            {
                path: '/userInfo',
                exact: true,
                sidebar: "个人信息",
                main: UserInfo,
            },
            {
                path: '/userInfo/modifyUserInfo',
                sidebar: "个人信息",
                main: ModifyUserInfo,
            },
            {
                path: '/userInfo/modifyPassword',
                sidebar: "修改密码",
                main: ModifyPassword,
            },
            {
                path: '/projectManagement',
                exact: true,
                sidebar: "项目管理",
                main: ProjectManagement
            },
            {
                path: '/projectManagement/addProject',
                sidebar: "添加项目",
                main: AddProject,
            },
            {
                path: '/projectManagement/addImport',
                sidebar: "添加项目",
                main: AddImport,
            },
            {
                path: '/enterpriseManagement',
                exact: true,
                sidebar: "企业管理",
                main: EnterpriseManagement,
                handle: this.toggle
            },
            {
                path: '/enterpriseManagement/addEnterprise',
                sidebar: "添加企业",
                main: AddEnterprise,
            },
            {
                path: '/enterpriseManagement/addImport',
                sidebar: "添加企业",
                main: AddImport,
            },
            {
                path: '/investorManagement',
                exact: true,
                sidebar: "投资人管理",
                main: InvestorManagement,
                handle: this.toggle
            },
            {
                path: '/investorManagement/addInvestor',
                sidebar: "添加投资人",
                main: AddInvestor,
            },
            {
                path: '/investorManagement/addImport',
                sidebar: "添加投资人",
                main: AddImport,
            },
            {
                path: '/agencyManagement',
                exact: true,
                sidebar: "投资机构管理",
                main: AgencyManagement,
                handle: this.toggle
            },
            {
                path: '/agencyManagement/addAgency',
                sidebar: "添加投资机构",
                main: AddAgency,
            },
            {
                path: '/agencyManagement/addImport',
                sidebar: "添加投资机构",
                main: AddImport,
            },
            {
                path: '/businessManagement',
                exact: true,
                sidebar: "业务活动管理",
                main: BusinessManagement,
                handle: this.toggle
            },
            {
                path: '/businessManagement/addBusiness',
                sidebar: "添加业务活动",
                main: AddBusiness,
            },
            {
                path: '/roleManagement',
                exact: true,
                sidebar: "角色管理",
                main: RoleManagement,
                handle: this.toggle
            },
            {
                path: '/staffManagement',
                exact: true,
                sidebar: "员工管理",
                main: StaffManagement,
                handle: this.toggle
            },
            {
                path: '/accountManagement',
                exact: true,
                sidebar: "账户管理",
                main: AccountManagement,
                handle: this.toggle
            },
            {
                path: '/tagManagement',
                exact: true,
                sidebar: "标签管理",
                main: TagManagement,
                handle: this.toggle
            }
        ];
    }

    toggle = (value) => {
        return value
    };

    render() {
        return(
            <Router>
                <div className="flex flex-row flex-start main">
                    <Slider isOpen={this.state.isOpen} handle={this.toggle} />
                    <div id="container" className="flex1" style={{position: "relative", height: "100%"}}>
                        {this.routes.map((route, index) => (
                            <Route key={index}
                                   path={route.path}
                                   exact={route.exact}
                                   render ={props => (
                                       <Header {...props} title={route.sidebar} user={true}/>
                                   )}
                            />
                        ))}
                        <div className="main-container">
                            <div className="container">
                                {this.routes.map((route, index) => (
                                    <Route key={index}
                                           path={route.path}
                                           exact={route.exact}
                                           render={props => (
                                               <route.main {...props} handle={route.handle} />
                                           )}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}