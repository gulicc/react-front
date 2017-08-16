import React from "react";
import ReactDOM from "react-dom";
import { HashRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();
import Index from "../component/index/index"; // 导入管理系统模块
import Login from "../component/manage/login"; // 导入登录模块
import FindPassword from "../component/manage/findPassword"; // 导入找回密码模块

import Utils from "../../store/utils";
import ManageAction from "../../store/manageAction";

class App extends React.Component {
    render(){
        return(
            <Router>
                <Switch>
                    <Route path="/login" component={Login} />
                    <Route path="/findPassword" component={FindPassword} />
                    <Route path="/" component={CheckLogin} />
                </Switch>
            </Router>
        )
    }
}

class CheckLogin extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            status: false,
            component: ""
        }
    }

    componentWillMount = () => {
        if(Utils.getLoginData()){
            ManageAction.checkLoginStatus((data)=>{
                if(data === 9000){
                    this.setState({
                        status: true,
                        component: <Index />
                    })
                }else{
                    if(window.localStorage.expireTime && Date.parse(new Date()) < window.localStorage.expireTime){
                        ManageAction.loginWithToken(Utils.getLoginData().login_phone,Utils.getLoginData().login_token,(data)=>{
                            if(data.status_code === 9000) {
                                window.localStorage.setItem("loginData",JSON.stringify(data.data));
                                setTimeout(() => {
                                    this.setState({
                                        status: true,
                                        component: <Index />
                                    })
                                },10);
                            }else{
                                window.localStorage.removeItem("loginData");
                                window.localStorage.removeItem("expireTime");
                                this.setState({
                                    status: true,
                                    component: <Redirect to="/login" />
                                })
                            }
                        })
                    }else{
                        this.setState({
                            status: true,
                            component: <Redirect to="/login" />
                        })
                    }
                }
            })
        }else{
            this.setState({
                status: true,
                component: <Redirect to="/login" />
            })
        }
    }

    render() {
        return(
            this.state.status ? (
                this.state.component
            ) : (
                <div></div>
            )
        )
    }
}

ReactDOM.render((
    <App />),document.getElementById('App')
);