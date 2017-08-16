/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Route, Link } from "react-router-dom";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import EnterpriseInfo from "./enterpriseInfo";
import Search from "../common/search";
import SearchTypes from "../common/searchTypes";
import {Table, Column} from "../common/table";
import Pagination from "../common/pagination";
import { AddEnterpriseWindow } from "../common/addWindow";

import Utils from "../../../store/utils";
import CompanyAction from "../../../store/companyAction";

export default class EnterpriseManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addEnterprise: false,
            isOpen: false,
            id: "",
            name: "",
            staff_size: "",
            fields: "",
            page_index: 1,
            page_cap: 10,
            data: []
        }
    }

    componentDidMount = () => {
        console.log(Utils.staffSize);
        Utils.closeSlideBox(()=>{
            this.setState({
                isOpen: false
            })
        });
        this.searchCompanies();
    }

    searchCompanies = () => {
        CompanyAction.searchCompanies(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].name = <a onClick={this.showDetail.bind(this,records[i].id)}>{records[i].name}</a>;
                records[i].reg_capital = records[i].reg_capital ? records[i].reg_capital + "万元" : "";
                records[i].staff_size = Utils.findStaffSize(parseInt(records[i].staff_size));
                records[i].invest_fund_val = records[i].invest_fund_val ? records[i].invest_fund_val + "万元" : "";
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
            this.searchCompanies();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.searchCompanies();
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
                this.searchCompanies();
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

    _delete = () => {
        this.setState({
            isOpen: false
        });
        this.searchCompanies();
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
        this.refs.key.reset();
        this.refs.staff_size.reset();
        this.refs.fields.reset();
        this.setState({
            name: "",
            staff_size: "",
            fields: "",
            page_index: 1
        },()=>{
            this.searchCompanies();
        });
        layer.open({
            content: "添加企业成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        this.closeAddEnterpriseWindow();
    }

    render() {
        const staffSize = [
            {
                id: 1,
                name: "20人以下"
            },
            {
                id: 2,
                name: "20-99人"
            },
            {
                id: 3,
                name: "100-499人"
            },
            {
                id: 4,
                name: "500-999人"
            },
            {
                id: 5,
                name: "1000-9999人"
            },
            {
                id: 6,
                name: "10000人以上"
            }
        ];
        return(
            <div>
                {
                    this.state.addEnterprise ? <AddEnterpriseWindow close={this.closeAddEnterpriseWindow} complete={this.completeAddEnterprise} /> : ""
                }
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="企业详情">
                                <EnterpriseInfo id={this.state.id} delete={this._delete} complete={this.searchCompanies} />
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                <div className={Style.container}>
                    <div className="flex flex-row flex-between">
                        <Search ref="key" name="name" handle={this.handle} placeholder="企业名称"/>
                        <div className={"flex flex-row flex-start align-center " + Style.insertMethod}>
                            <p onClick={this.openAddEnterpriseWindow}>添加新企业</p>
                        </div>
                    </div>
                    <div className={Style.select}>
                        <SearchTypes ref="staff_size" title="企业规模：" name="staff_size" data={staffSize} handle={this.handle} />
                        <SearchTypes ref="fields" title="领域：" name="fields" getData="queryIndustries" handle={this.handle} more={true}/>
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <Table dataSource={this.state.data}>
                        <Column title="企业全称" index="name" width="150" paddingLeft="20"/>
                        <Column title="成立时间" index="reg_time" width="110"/>
                        <Column title="注册资本" index="reg_capital" width="120"/>
                        <Column title="领域" index="fields" width="102"/>
                        <Column title="地区" index="address" width="86"/>
                        <Column title="企业规模" index="staff_size" width="112"/>
                        <Column title="主营业务" index="main_service" width="110"/>
                        <Column title="融资项目数" index="invest_project_num" width="120"/>
                        <Column title="融资总金额" index="invest_fund_val" width="122"/>
                    </Table>
                    {
                        this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                    }
                </div>
            </div>
        )
    }
}