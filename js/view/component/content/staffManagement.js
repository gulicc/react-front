/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import { StaffDetail, StaffModify } from "./staffInfo";
import Search from "../common/search";
import SearchTypes from "../common/searchTypes";
import {Table, Column} from "../common/table";
import { AddStaffWindow } from "../common/alertWindow";
import Pagination from "../common/pagination";
import { Popconfirm } from 'antd';

import Utils from "../../../store/utils";
import PlatformAction from "../../../store/platformAction";

export default class StaffManagement extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            slideType: "",
            infoData: {},
            data: [],
            shadowStatus: false,
            searchkey: "",
            actor: "",
            page_index: 1,
            page_cap: 10,
            count: "",
            platformdel: true
        };
    }

    componentDidMount = () => {
        Utils.closeSlideBox(()=>{
            this.setState({
                isOpen: false
            })
        });
        this.listMembers();
    }

    closeSlide = () => {
        this.setState({
            isOpen: false
        });
        this.listMembers();
    }

    listMembers = () => {
        PlatformAction.listMembers(this.state,(count,table)=>{
            let staffData = table;
            for(let i=0;i<staffData.length;i++){
                staffData[i].name = <a onClick={this.showDetail.bind(this,table[i],"watch")}>{staffData[i].platformor_fullname}</a>;
                staffData[i].gender = staffData[i].platformor_sex ? staffData[i].platformor_sex === "M" ? "男" : "女" : "";
                staffData[i].controller = (
                    <div>
                        <a onClick={this.showDetail.bind(this,table[i],"modify")}>修改</a>丨
                        <Popconfirm placement="topRight" title="是否要删除该员工？" onConfirm={()=>{this.deleteStaff(staffData[i].platform_id)}} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <a style={{color: "#ff530c"}}>删除</a>
                        </Popconfirm>
                    </div>
                );
            }
            this.setState({
                count: count,
                data: staffData
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data,
            page_index: 1
        },()=>{
            this.listMembers();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.listMembers();
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
                this.listMembers();
            })
        }
    }

    showDetail = (data,type,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(false);
        this.setState({
            slideType: type,
            infoData: data,
            isOpen: true
        })
    }

    addStaff = () => {
        this.setState({
            shadowStatus: true
        })
    }

    deleteStaff = (id) => {
        PlatformAction.deleteOrgMember(id,this.state,(data)=>{
            this.listMembers();
        })
    }

    close = (value) => {
        this.setState({
            shadowStatus: false
        })
        if(value === "add"){
            this.listMembers();
        }
    }

    render() {
        return(
            <div>
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="员工详情">
                                {
                                    (()=>{
                                        switch (this.state.slideType){
                                            case "watch":
                                                return <StaffDetail data={this.state.infoData} />;
                                                break;
                                            case "modify":
                                                return <StaffModify data={this.state.infoData} closeSlide={this.closeSlide}/>;
                                                break;
                                        }
                                    })()
                                }
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                {
                    this.state.shadowStatus ? (
                        <AddStaffWindow handle={this.close} />
                    ) : ("")
                }
                <div className={Style.container}>
                    <div className="flex flex-row flex-between">
                        <Search name="searchkey" handle={this.handle} placeholder="人员姓名 / 手机号"/>
                        <div className={"flex flex-row flex-start align-center " + Style.insertMethod}>
                            <p onClick={this.addStaff}>添加新员工</p>
                        </div>
                    </div>
                    <div className={Style.select}>
                        <SearchTypes title="角色：" name="actor" handle={this.handle} getData="getOrgActorList"/>
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <Table dataSource={this.state.data}>
                        <Column title="姓名" index="name" width="88" paddingLeft="20"/>
                        <Column title="员工号" index="platformor_sn" width="84"/>
                        <Column title="性别" index="gender" width="52"/>
                        <Column title="所属公司" index="platorg_name" width="108"/>
                        <Column title="所属部门" index="platdprt_nodename" width="100"/>
                        <Column title="岗位" index="platformor_jobtitle" width="84"/>
                        <Column title="角色" index="platact_name" width="88"/>
                        <Column title="手机号" index="login_phone" width="116"/>
                        <Column title="邮箱" index="platformor_email" width="190"/>
                        <Column title="操作" index="controller" width="120"/>
                    </Table>
                    {
                        this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                    }
                </div>
            </div>
        )
    }
}