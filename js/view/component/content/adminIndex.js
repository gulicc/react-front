/**
 * Created by Galaxy065 on 2017/5/8.
 */
import React from "react";
import IndexHeader from "../common/indexHeader";
import { SlideBox, SlideInfo } from "../common/slideBox";
import ProjectInfo from "./projectInfo";
import { Table, Column } from "../common/table";
import { SpeedRate } from "../common/alertWindow";
import Pagination from "../common/pagination";

import Utils from "../../../store/utils";
import ProjectAction from "../../../store/projectAction";

export default class AdminIndex extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            data: [],
            shadowStatus: false,
            page_index: 1,
            page_cap: 10,
            count: "",
            tab: 0,
            speedRateData: {}
        }
    }

    componentDidMount = () => {
        Utils.closeSlideBox(()=>{
            this.setState({
                isOpen: false
            })
        });
        this.listAdminProjects();
    }

    closeSlide = () => {
        this.setState({
            isOpen: false
        });
    }

    listAdminProjects = () => {
        ProjectAction.listAdminProjects(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].name = <a onClick={this.showDetail.bind(this,records[i].project_id)}>{records[i].project_name}</a>;
                records[i].rate = <p>{records[i].project_evallevel ? records[i].project_evallevel + "级" : "-"}</p>;
                records[i].fstatusName = <p>{records[i].fstatus_name}</p>;
                records[i].controller = <a onClick={()=>{this.modify(i)}}>快速评定</a>;
            }
            this.setState({
                count: count,
                data: records
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data,
            page_index: 1
        },()=>{
            this.listAdminProjects();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.listAdminProjects();
        })
    }

    chooseShow = (count) => {
        if(count === this.state.page_cap){
            return;
        }else{
            this.setState({
                page_index: 1,
                page_cap: count
            },()=>{
                this.listAdminProjects();
            })
        }
    }

    modify = (i) => {
        this.setState({
            speedRateData: this.state.data[i],
            shadowStatus: true
        })
    }

    close = () => {
        this.setState({
            shadowStatus: false
        })
    }

    showDetail = (id,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(false);
        this.setState({
            id: id,
            isOpen: true
        })
    }

    render() {
        return(
            <div className="rk-container">
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="项目详情">
                                <ProjectInfo id={this.state.id} tab={this.state.tab} closeSlide={this.closeSlide} />
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                {
                    this.state.shadowStatus ? (
                        <SpeedRate data={this.state.speedRateData} closeHandle={this.close} complete={()=>{this.close();this.listAdminProjects();}}/>
                    ) : ("")
                }
                <IndexHeader title="待评定项目"/>
                <Table dataSource={this.state.data} marginTop="20">
                    <Column title="项目名称" index="name" width="160" paddingLeft="20" />
                    <Column title="轮次" index="fphase_name" width="74" />
                    <Column title="领域" index="industrys" width="170" />
                    <Column title="项目经理" index="project_leader" width="96" />
                    <Column title="初步评级" index="rate" width="96" />
                    <Column title="录入时间" index="createat" width="138" />
                    <Column title="待评定项" index="fstatusName" width="210" />
                    <Column title="操作" index="controller" width="82" />
                </Table>
                {
                    this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                }
            </div>
        )
    }
}