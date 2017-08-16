/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Link } from "react-router-dom";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import ProjectInfo from "./projectInfo";
import Search from "../common/search";
import SearchTypes from "../common/searchTypes";
import SearchTag from "../common/searchTag";
import { Table, Column } from "../common/table";
import Pagination from "../common/pagination";
import { AddProjectWindow, AddImportWindow } from "../common/addWindow";
import { UpdateStatus } from "../common/alertWindow";
import { Popover } from "antd";

import Utils from "../../../store/utils";
import ProjectAction from "../../../store/projectAction";

export default class ProjectManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addProject: false,
            addImport: false,
            isOpen: false,
            id: "",
            data: [],
            searchkey: "",
            industrys: [],
            fphases: [],
            treats: [],
            firstevals: [],
            tags: [],
            page_index: 1,
            page_cap: 10,
            count: "",
            tab: "",
            projectStatus: [],
            updateStatus: {}
        }
    }

    componentDidMount = () => {
        Utils.closeSlideBox(()=>{
            this.setState({
                isOpen: false
            })
        });
        this.listProjects();
        ProjectAction.queryFinStatus(data=>{
            this.setState({
                projectStatus: data
            })
        })
    }

    listProjects = (callback) => {
        ProjectAction.listProjects(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].tagContent = (
                    <div>
                        {
                            records[i].tags && records[i].tags.length ? (
                                records[i].tags.map((tag,j)=>{
                                    return(
                                        <p>{tag.name}</p>
                                    )
                                })
                            ) : (
                              null
                            )
                        }
                    </div>
                );
                records[i].name = (
                    <div>
                        {
                            records[i].tags && records[i].tags.length ? (
                                <Popover content={records[i].tagContent}>
                                    <a onClick={this.showDetail.bind(this,records[i].project_id,0)}>{records[i].project_name}</a>
                                </Popover>
                            ) : (
                                <a onClick={this.showDetail.bind(this,records[i].project_id,0)}>{records[i].project_name}</a>
                            )
                        }
                    </div>
                );
                records[i].intent = <a onClick={this.showDetail.bind(this,records[i].project_id,1)}>{records[i].project_afinilimt ? records[i].project_afinilimt : "-"} / {records[i].project_finilimt ? records[i].project_finilimt : "-"} {records[i].project_afinilimt || records[i].project_finilimt ? "万元" : ""}</a>;
                records[i].rate = <div>{records[i].project_evallevel ? records[i].project_evallevel : "-"}({records[i].project_evalphase})</div>;
                records[i].fstatusName = <a onClick={()=>{this.update(i)}}>{records[i].fstatus_name}</a>;
                records[i].project_note = (
                    <Popover content={records[i].project_note} placement="topRight" mouseEnterDelay="2" overlayStyle={{width: 148}}>
                        <p>{records[i].project_note}</p>
                    </Popover>
                );
            }
            this.setState({
                count: count,
                data: records
            },()=>{
                if(callback){
                    callback();
                }
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data,
            page_index: 1
        },()=>{
            this.listProjects();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.listProjects();
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
                this.listProjects();
            })
        }
    }

    showDetail = (id,tab,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            id: id,
            tab: tab,
            isOpen: true
        })
    }

    update = (i) => {
        this.setState({
            updateStatus: this.state.data[i],
            shadowStatus: true
        })
    }

    close = () => {
        this.setState({
            shadowStatus: false
        });
    }

    updateStatus = (id,callback) => {
        this.listProjects(()=>{
            for(let i=0;i<this.state.data.length;i++){
                if(id === this.state.data[i].project_id){
                    this.setState({
                        updateStatus: this.state.data[i]
                    },()=>{
                        callback();
                    });
                    break;
                }
            }
        });
    }

    complete = (value) => {
        if(value === "info"){
            this.setState({
                tab: 0
            },()=>{
                this.refs.tags.reset();
                this.listProjects();
            })
        }else if(value === "intention"){
            this.setState({
                tab: 1
            },()=>{
                this.listProjects();
            })
        }
    }

    _delete = () => {
        this.setState({
            isOpen: false
        });
        this.listProjects();
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
        this.refs.key.reset();
        this.refs.industrys.reset();
        this.refs.fphases.reset();
        this.refs.treats.reset();
        this.refs.firstevals.reset();
        this.refs.tags.reset();
        this.setState({
            searchkey: "",
            industrys: [],
            fphases: [],
            treats: [],
            firstevals: [],
            tags: [],
            page_index: 1
        },()=>{
            this.listProjects();
        });
        layer.open({
            content: "添加项目成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        this.closeAddProjectWindow();
    }

    openAddImportWindow = () => {
        this.setState({
            addImport: true
        })
    }

   closeAddImportWindow = () => {
        this.setState({
            addImport: false
        })
    }

    completeAddImportWindow = () => {
        this.refs.key.reset();
        this.refs.industrys.reset();
        this.refs.fphases.reset();
        this.refs.treats.reset();
        this.refs.firstevals.reset();
        this.refs.tags.reset();
        this.setState({
            addImport: false,
            searchkey: "",
            industrys: [],
            fphases: [],
            treats: [],
            firstevals: [],
            tags: [],
            page_index: 1
        },()=>{
            this.listProjects();
        });
    }

    render() {
        const rate = [
            {
                name: "5级",
                id: 5
            },
            {
                name: "4级",
                id: 4
            },
            {
                name: "3级",
                id: 3
            },
            {
                name: "2级",
                id: 2
            },
            {
                name: "1级",
                id: 1
            },
        ];
        return(
            <div>
                {
                    this.state.addProject ? <AddProjectWindow close={this.closeAddProjectWindow} complete={this.completeAddProject} /> : ""
                }
                {
                    this.state.addImport ? <AddImportWindow type="project" close={this.closeAddImportWindow} complete={this.completeAddImportWindow} /> : ""
                }
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="项目详情">
                                <ProjectInfo id={this.state.id} tab={this.state.tab} delete={this._delete} complete={this.complete} />
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                {
                    this.state.shadowStatus ? (
                        <UpdateStatus data={this.state.updateStatus} status={this.state.projectStatus} closeHandle={this.close} complete={this.updateStatus} />
                    ) : ("")
                }
                <div className={Style.container}>
                    <div className="flex flex-row flex-between">
                        <Search ref="key" name="searchkey" handle={this.handle} placeholder="项目名称、项目经理、备注"/>
                        <div className={"flex flex-row flex-start align-center " + Style.insertMethod}>
                            <p onClick={this.openAddProjectWindow}>录入新项目</p>
                            <a onClick={this.openAddImportWindow}>文件导入</a>
                        </div>
                    </div>
                    <div className={Style.select}>
                        <SearchTypes ref="industrys" title="领域：" name="industrys" handle={this.handle} getData="queryIndustries" more={true} />
                        <SearchTypes ref="fphases" title="轮次：" name="fphases" handle={this.handle} getData="queryInvestRounds" />
                        <SearchTypes ref="treats" title="工作状态：" name="treats" handle={this.handle} getData="queryTreats" />
                        <SearchTypes ref="firstevals" title="评级：" name="firstevals" handle={this.handle} data={rate} />
                        <SearchTag ref="tags" title="标签：" name="tags" type={[1]} handle={this.handle} />
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <Table dataSource={this.state.data}>
                        <Column title="项目名称" index="name" width="128" paddingLeft="20"/>
                        <Column title="轮次" index="fphase_name" width="88"/>
                        <Column title="领域" index="industrys" width="154"/>
                        <Column title="评级" index="rate" width="76"/>
                        <Column title="优先级" index="treat_name" width="84"/>
                        <Column title="进度" index="fstatusName" width="86"/>
                        <Column title="投资意向" index="intent" width="84"/>
                        <Column title="项目经理" index="project_leader" width="82"/>
                        <Column title="录入时间" index="createat" width="130"/>
                        <Column title="备注" index="project_note" width="98"/>
                    </Table>
                    {
                        this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                    }
                </div>
            </div>
        )
    }
}