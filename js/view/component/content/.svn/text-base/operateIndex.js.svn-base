/**
 * Created by Galaxy065 on 2017/5/9.
 */
import React from "react";
import { History } from "react-router-dom";
import Style from "./css/operateIndex.css";
import { AddProjectWindow, AddInvestorWindow, AddEnterpriseWindow, AddAgencyWindow } from "../common/addWindow";

export default class OperateIndex extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={"rk-container " + Style.container} style={{padding: 0}}>
                <Project {...this.props} />
                <Investor {...this.props} />
                <Enterprise {...this.props} />
                <Agency {...this.props} />
            </div>
        )
    }
}

class Project extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addProject: false
        }
    }

    openAddProjectWindow = () => {
        this.setState({
            addProject: true
        })
    }

    closeAddProjectWindow = () => {
        this.setState({
            addProject: false
        })
    }

    completeAddProject = () => {
        layer.open({
            content: "添加项目成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        setTimeout(()=>{
            this.closeAddProjectWindow();
            this.props.history.push("/projectManagement");
        },3000)
    }

    render() {
        return(
            <div className={Style.item}>
                {
                    this.state.addProject ? <AddProjectWindow close={this.closeAddProjectWindow} complete={this.completeAddProject} /> : ""
                }
                <div className={"flex flex-row align-center " + Style.content}>
                    <a onClick={this.openAddProjectWindow} className="flex flex-row flex-start align-center">
                        <div className={"flex flex-row flex-center align-center " + Style.icon}>
                            <span className={Style.icon1}></span>
                        </div>
                        <p>添加项目</p>
                    </a>
                </div>
            </div>
        )
    }
}

class Investor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addInvestor: false
        }
    }

    openAddInvestorWindow = () => {
        this.setState({
            addInvestor: true
        })
    }

    closeAddInvestorWindow = () => {
        this.setState({
            addInvestor: false
        })
    }

    completeAddInvestor = () => {
        layer.open({
            content: "添加投资人成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        setTimeout(()=>{
            this.closeAddInvestorWindow();
            this.props.history.push("/investorManagement");
        },3000)
    }

    render() {
        return(
            <div className={Style.item}>
                {
                    this.state.addInvestor ? <AddInvestorWindow close={this.closeAddInvestorWindow} complete={this.completeAddInvestor} /> : ""
                }
                <div className={Style.heightLine}></div>
                <div className={"flex flex-row align-center " + Style.content}>
                    <a onClick={this.openAddInvestorWindow} className="flex flex-row flex-start align-center">
                        <div className={"flex flex-row flex-center align-center " + Style.icon}>
                            <span className={Style.icon2}></span>
                        </div>
                        <p>添加投资人</p>
                    </a>
                </div>
            </div>
        )
    }
}

class Enterprise extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addEnterprise: false
        }
    }

    openAddEnterpriseWindow = () => {
        this.setState({
            addEnterprise: true
        })
    }

    closeAddEnterpriseWindow = () => {
        this.setState({
            addEnterprise: false
        })
    }

    completeAddEnterprise = () => {
        layer.open({
            content: "添加企业成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        setTimeout(()=>{
            this.closeAddEnterpriseWindow();
            this.props.history.push("/enterpriseManagement");
        },3000)
    }

    render() {
        return(
            <div className={Style.item}>
                {
                    this.state.addEnterprise ? <AddEnterpriseWindow close={this.closeAddEnterpriseWindow} complete={this.completeAddEnterprise} /> : ""
                }
                <div className={Style.widthLine}></div>
                <div className={"flex flex-row align-center " + Style.content}>
                    <a onClick={this.openAddEnterpriseWindow} className="flex flex-row flex-start align-center">
                        <div className={"flex flex-row flex-center align-center " + Style.icon}>
                            <span className={Style.icon3}></span>
                        </div>
                        <p>添加企业</p>
                    </a>
                </div>
            </div>
        )
    }
}

class Agency extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addAgency: false
        }
    }

    openAddAgencyWindow = () => {
        this.setState({
            addAgency: true
        })
    }

    closeAddAgencyWindow = () => {
        this.setState({
            addAgency: false
        })
    }

    completeAddAgency = () => {
        layer.open({
            content: "添加投资机构成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        setTimeout(()=>{
            this.closeAddAgencyWindow();
            this.props.history.push("/agencyManagement");
        },3000)
    }

    render() {
        return(
            <div className={Style.item}>
                {
                    this.state.addAgency ? <AddAgencyWindow close={this.closeAddAgencyWindow} complete={this.completeAddAgency} /> : ""
                }
                <div className={Style.heightLine}></div>
                <div className={Style.widthLine}></div>
                <div className={"flex flex-row align-center " + Style.content}>
                    <a onClick={this.openAddAgencyWindow} className="flex flex-row flex-start align-center">
                        <div className={"flex flex-row flex-center align-center " + Style.icon}>
                            <span className={Style.icon4}></span>
                        </div>
                        <p>添加投资机构</p>
                    </a>
                </div>
            </div>
        )
    }
}