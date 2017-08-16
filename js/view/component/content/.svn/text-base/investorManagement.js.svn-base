/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Route, Link } from "react-router-dom";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import InvestorInfo from "./investorInfo";
import Search from "../common/search";
import SearchTypes from "../common/searchTypes";
import SearchTag from "../common/searchTag";
import {Table, Column} from "../common/table";
import Pagination from "../common/pagination";
import { AddInvestorWindow, AddImportWindow } from "../common/addWindow";
import { AgencyInfoWindow } from "../common/infoWindow";
import { Popover } from "antd";

import Utils from "../../../store/utils";
import InvestorAction from "../../../store/investorAction";

export default class InvestorManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addInvestor: false,
            addImport: false,
            agencyInfoWindow: null,
            isOpen: false,
            id: "",
            name: "",
            rounds: "",
            fields: "",
            tags: [],
            auth_type: "",
            invest_types: "",
            page_index: 1,
            page_cap: 10,
            data: [],
            count: ""
        }
    }

    componentDidMount = () => {
        Utils.closeSlideBox(()=>{
            this.setState({
                isOpen: false
            })
        });
        this.searchInvestors();
    }

    searchInvestors = () => {
        InvestorAction.searchInvestors(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].tagContent = (
                    <div>
                        {
                            records[i].tags && records[i].tags.length ? (
                                records[i].tags.map((tag,j)=>{
                                    return(
                                        <p>{tag}</p>
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
                                    <a onClick={this.showDetail.bind(this,records[i].id)}>{records[i].name}</a>
                                </Popover>
                            ) : (
                                <a onClick={this.showDetail.bind(this,records[i].id)}>{records[i].name}</a>
                            )
                        }
                    </div>

                );
                records[i].org_type = (
                    records[i].invest_type === "个人" ? <p>个人</p> : (
                        <a onClick={()=>{this.showInvestorInfo(records[i].org_id)}}>{records[i].org_name}</a>
                    )
                )
                records[i].size = (
                    <p>{records[i].single_invest_size_min} - {records[i].single_invest_size_max}{records[i].single_invest_size_min && records[i].single_invest_size_min ? "万元" : ""}</p>
                )
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
            this.searchInvestors();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.searchInvestors();
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
                this.searchInvestors();
            })
        }
    }

    showDetail = (id,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(false);
        this.setState({
            id: id,
            isOpen: true
        })
    }

    complete = () => {
        this.refs.tags.reset();
        this.searchInvestors();
    }

    _delete = () => {
        this.setState({
            isOpen: false
        });
        this.searchInvestors();
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
        this.refs.key.reset();
        this.refs.rounds.reset();
        this.refs.fields.reset();
        this.refs.tags.reset();
        this.refs.invest_types.reset();
        this.setState({
            name: "",
            rounds: "",
            fields: "",
            tags: [],
            auth_type: "",
            invest_types: "",
            page_index: 1
        },()=>{
            this.searchInvestors();
        });
        layer.open({
            content: "添加投资人成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        this.closeAddInvestorWindow();
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
        this.refs.rounds.reset();
        this.refs.fields.reset();
        this.refs.tags.reset();
        this.refs.invest_type.reset();
        this.setState({
            addImport: false,
            name: "",
            rounds: "",
            fields: "",
            tags: [],
            auth_type: "",
            invest_type: "",
            page_index: 1
        },()=>{
            this.searchInvestors();
        });
    }

    showInvestorInfo = (id) => {
        this.setState({
            agencyInfoWindow: <AgencyInfoWindow id={id} closeWindow={this.closeWindow} />
        })
    }

    closeWindow = () => {
        this.setState({
            agencyInfoWindow: null
        })
    }

    render() {
        return(
            <div>
                {
                    this.state.addInvestor ? <AddInvestorWindow close={this.closeAddInvestorWindow} complete={this.completeAddInvestor} /> : ""
                }
                {
                    this.state.addImport ? <AddImportWindow type="investor" close={this.closeAddImportWindow} complete={this.completeAddImportWindow} /> : ""
                }
                {this.state.agencyInfoWindow}
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="投资人详情">
                                <InvestorInfo id={this.state.id} delete={this._delete} complete={this.complete} />
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                <div className={Style.container}>
                    <div className="flex flex-row flex-between">
                        <Search ref="key" name="name" handle={this.handle} placeholder="投资人姓名 ／ 所在机构名称" />
                        <div className={"flex flex-row flex-start align-center " + Style.insertMethod}>
                            <p onClick={this.openAddInvestorWindow}>添加投资人</p>
                            <a onClick={this.openAddImportWindow}>文件导入</a>
                        </div>
                    </div>
                    <div className={Style.select}>
                        <SearchTypes ref="invest_types" title="投资人类型：" name="invest_types" handle={this.handle} getData="queryInvestorTypes" />
                        <SearchTypes ref="fields" title="关注领域：" name="fields" handle={this.handle} getData="queryIndustries" more={true}/>
                        <SearchTypes ref="rounds" title="关注阶段：" name="rounds" handle={this.handle} getData="queryInvestRounds"/>
                        <SearchTag ref="tags" title="标签：" name="tags" type={[3]} handle={this.handle} />
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <Table dataSource={this.state.data}>
                        <Column title="投资人姓名" index="name" width="120" paddingLeft="20"/>
                        <Column title="投资机构" index="org_type" width="120"/>
                        <Column title="投资人类型" index="invest_types" width="120"/>
                        <Column title="关注领域" index="fields" width="128"/>
                        <Column title="关注阶段" index="rounds" width="128"/>
                        <Column title="单笔投资规模" index="size" width="184"/>
                        <Column title="电话" index="phone" width="106"/>
                        <Column title="录入人" index="creator" width="80"/>
                        <Column title="来源" index="source" width="108"/>
                        <Column title="备注" index="remark" width="64"/>
                    </Table>
                    {
                        this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                    }
                </div>
            </div>
        )
    }
}