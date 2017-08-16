/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Link } from "react-router-dom";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import AgencyInfo from "./agencyInfo";
import Search from "../common/search";
import SearchTypes from "../common/searchTypes";
import SearchTag from "../common/searchTag";
import { Table, Column } from "../common/table";
import Pagination from "../common/pagination";
import { AddAgencyWindow, AddImportWindow } from "../common/addWindow";
import { Popover } from "antd";

import Utils from "../../../store/utils";
import OrgAction from "../../../store/orgAction";

export default class AgencyManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addAgency: false,
            addImport: false,
            isOpen: false,
            id: "",
            name: "",
            scale: "",
            fields: "",
            tags: [],
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
        this.searchInvestOrgs();
    }

    searchInvestOrgs = () => {
        OrgAction.searchInvestOrgs(this.state,(count,records)=>{
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
                records[i].fund_size = Utils.findFundSize(parseInt(records[i].fund_size));
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
            this.searchInvestOrgs();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.searchInvestOrgs();
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
                this.searchInvestOrgs();
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
        this.searchInvestOrgs();
    }

    _delete = () => {
        this.setState({
            isOpen: false
        })
        this.searchInvestOrgs();
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
        this.refs.key.reset();
        this.refs.scale.reset();
        this.refs.field.reset();
        this.refs.tags.reset();
        this.setState({
            name: "",
            scale: "",
            fields: "",
            tags: [],
            page_index: 1
        },()=>{
            this.searchInvestOrgs();
        });
        layer.open({
            content: "添加投资机构成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        this.closeAddAgencyWindow();
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
        this.refs.scale.reset();
        this.refs.field.reset();
        this.refs.tags.reset();
        this.setState({
            addImport: false,
            name: "",
            scale: "",
            fields: "",
            tags: [],
            page_index: 1
        },()=>{
            this.searchInvestOrgs();
        });
    }

    render() {
        const scale = [
            {
                id: 1,
                name: "1000万元以下"
            },
            {
                id: 2,
                name: "1000-4999万元"
            },
            {
                id: 3,
                name: "5000万元以上"
            }
        ];
        return(
            <div>
                {
                    this.state.addAgency ? <AddAgencyWindow close={this.closeAddAgencyWindow} complete={this.completeAddAgency} /> : ""
                }
                {
                    this.state.addImport ? <AddImportWindow type="agency" close={this.closeAddImportWindow} complete={this.completeAddImportWindow} /> : ""
                }
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="投资机构详情">
                                <AgencyInfo id={this.state.id} delete={this._delete} complete={this.complete} />
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                <div className={Style.container}>
                    <div className="flex flex-row flex-between">
                        <Search ref="key" name="name" handle={this.handle} placeholder="机构名称"/>
                        <div className={"flex flex-row flex-start align-center " + Style.insertMethod}>
                            <p onClick={this.openAddAgencyWindow}>添加投资机构</p>
                            <a onClick={this.openAddImportWindow}>文件导入</a>
                        </div>
                    </div>
                    <div className={Style.select}>
                        <SearchTypes ref="scale" title="资金规模：" name="scale" handle={this.handle} data={scale}/>
                        <SearchTypes ref="field" title="领域：" name="fields" handle={this.handle} getData="queryIndustries" more={true}/>
                        <SearchTag ref="tags" title="标签：" name="tags" type={[4]} handle={this.handle} />
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <Table dataSource={this.state.data}>
                        <Column title="机构名称" index="name" width="160" paddingLeft="20"/>
                        <Column title="机构类型" index="type" width="150"/>
                        <Column title="领域" index="fields" width="250"/>
                        <Column title="资金规模" index="fund_size" width="166"/>
                        <Column title="录入时间" index="create_time" width="162"/>
                        <Column title="录入人" index="create_name" width="140"/>
                    </Table>
                    {
                        this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                    }
                </div>
            </div>
        )
    }
}