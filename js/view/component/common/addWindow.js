/**
 * Created by Galaxy065 on 2017/6/26.
 */
import React from "react";
import Style from "./css/infoWindow.css";
import Shadow from "./shadow";
import { CloseInfoButton, CancelButton } from "./defaultButton";
import Header from "./header";
import FreeScrollBar from "react-free-scrollbar";
import AddProject from "../content/addProject";
import AddEnterprise from "../content/addEnterprise";
import AddInvestor from "../content/addInvestor";
import AddAgency from "../content/addAgency";
import AddBusiness from "../content/addBusiness";
import AddImport from "../content/addImport";

class AddWindow extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Shadow>
                <div className={Style.window}>
                    <CancelButton style={{position: "absolute", zIndex:999, top:0, right:20}} handle={this.props.close} />
                    <CloseInfoButton style={{position: "absolute", top: -28, right: -28}}
                                     handle={this.props.close}
                    />
                    <Header title={this.props.title} style={{position: "absolute", width: "100%"}} />
                    <div className={Style.mainContainer}>
                        <div className={Style.container}>
                            <FreeScrollBar autohide={true}>
                                {this.props.children}
                            </FreeScrollBar>
                        </div>
                    </div>
                </div>
            </Shadow>
        )
    }
}

export class AddProjectWindow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <AddWindow close={this.props.close} title="添加项目">
                <AddProject org_id={this.props.org_id} org_name={this.props.org_name} complete={this.props.complete} />
            </AddWindow>
        )
    }
}

export class AddEnterpriseWindow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <AddWindow close={this.props.close} title="添加企业">
                <AddEnterprise complete={this.props.complete} />
            </AddWindow>
        )
    }
}

export class AddInvestorWindow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <AddWindow close={this.props.close} title="添加投资人">
                <AddInvestor complete={this.props.complete} />
            </AddWindow>
        )
    }
}

export class AddAgencyWindow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <AddWindow close={this.props.close} title="添加投资机构">
                <AddAgency complete={this.props.complete} />
            </AddWindow>
        )
    }
}

export class AddBusinessWindow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <AddWindow close={this.props.close} title="添加业务活动">
                <AddBusiness complete={this.props.complete} />
            </AddWindow>
        )
    }
}

export class AddImportWindow extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Shadow>
                <div className={Style.importWindow} style={{height: 558}}>
                    <FreeScrollBar autohide={true}>
                        <AddImport type={this.props.type} close={this.props.close} complete={this.props.complete} />
                    </FreeScrollBar>
                </div>
            </Shadow>
        )
    }
}