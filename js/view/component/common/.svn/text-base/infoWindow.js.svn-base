/**
 * Created by Galaxy065 on 2017/6/19.
 */
import React from "react";
import Style from "./css/infoWindow.css";
import Shadow from "./shadow";
import Tab from "../common/tab";
import { CloseInfoButton } from "./defaultButton";
import { EnterpriseDetail, EnterpriseFinancing, EnterpriseTrend } from "../content/enterpriseInfo";
import { ProjectDetail, ProjectIntention, ProjectInteract, ProjectFile } from "../content/projectInfo";
import { WatchOrg } from "../content/agencyInfo";
import FreeScrollBar from 'react-free-scrollbar';

import CompanyAction from "../../../store/companyAction";
import ProjectAction from "../../../store/projectAction";
import OrgAction from "../../../store/orgAction";

export class InfoWindow extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Shadow>
                <div className={Style.window}>
                    <CloseInfoButton style={{position: "absolute", top: -28, right: -28}}
                                     handle={this.props.handle}
                    />
                    <FreeScrollBar autohide={true}>
                        {this.props.children}
                    </FreeScrollBar>
                </div>
            </Shadow>
        )
    }
}

export class EnterpriseInfoWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id,
            data: {},
            tabData: [
                {
                    name: "企业概况",
                    width: 104,
                    active: true
                },
                {
                    name: "历史融资",
                    width: 104,
                    active: false
                },
                {
                    name: "企业与行业动态",
                    width: 150,
                    active: false
                }
            ],
            tabNow: 0
        }
    }

    componentDidMount = () => {
        CompanyAction.queryCompany(this.state,(data)=>{
            this.setState({
                data: data
            })
        })
    }

    changeTab = (value,tabData) => {
        this.setState({
            tabData: tabData,
            tabNow: value
        })
    }

    render(){
        return(
            <InfoWindow handle={this.props.closeWindow}>
                <div>
                    <Tab tabData={this.state.tabData} handle={this.changeTab} />
                    {
                        (()=>{
                            switch (this.state.tabNow){
                                case 0:
                                    return <EnterpriseDetail data={this.state.data} />;
                                    break;
                                case 1: return <EnterpriseFinancing id={this.state.id} name={this.state.data.name} isWatch={true} />;
                                    break;
                                case 2: return <EnterpriseTrend id={this.state.id} isWatch={true} />;
                                    break;
                            }
                        })()
                    }
                </div>
            </InfoWindow>
        )
    }
}

export class ProjectInfoWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            id: this.props.id,
            data: {},
            tabData: [
                {
                    name: "项目信息",
                    width: 104,
                    active: true
                },
                {
                    name: "投资意向",
                    width: 104,
                    active: false
                },
                {
                    name: "互动记录",
                    width: 104,
                    active: false
                },
                {
                    name: "相关附件",
                    width: 104,
                    active: false
                },
            ],
            tabNow: 0
        }
    }

    componentDidMount = () => {
        ProjectAction.getProjectInfo(this.state,(data)=>{
            this.setState({
                data: data
            })
        })
    }

    changeTab = (value,tabData) => {
        this.setState({
            isWatch: true,
            tabData: tabData,
            tabNow: value
        })
    }

    render() {
        return(
            <InfoWindow handle={this.props.closeWindow}>
                <Tab tabData={this.state.tabData} handle={this.changeTab}>
                </Tab>
                {
                    (()=>{
                        switch (this.state.tabNow) {
                            case 0:
                                return <ProjectDetail data={this.state.data} />;
                            case 1:
                                return <ProjectIntention id={this.state.id} />;
                                break;
                            case 2:
                                return <ProjectInteract id={this.state.id} data={this.state.data} isWatch={true} />;
                                break;
                            case 3:
                                return <ProjectFile id={this.state.id} data={this.state.data} isWatch={true} />;
                                break;
                        }
                    })()
                }
            </InfoWindow>
        )
    }
}

export class AgencyInfoWindow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id: this.props.id,
            data: {}
        }
    }

    componentDidMount = () => {
        OrgAction.queryInvestOrg(this.state,(data)=>{
            this.setState({
                data: data
            })
        })
    }

    render() {
        return(
            <InfoWindow handle={this.props.closeWindow}>
                <WatchOrg data={this.state.data} isWatch={true} />
            </InfoWindow>
        )
    }
}