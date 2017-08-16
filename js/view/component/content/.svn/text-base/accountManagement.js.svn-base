/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import Style from "./css/manage.css";
import Search from "../common/search";
import SearchTypes from "../common/searchTypes";
import {Table, Column} from "../common/table";
import Pagination from "../common/pagination";
import { Popconfirm } from 'antd';

import ManageAction from "../../../store/manageAction";

export default class AccountManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: [],
            searchkey: "",
            frole: "",
            isdiabled: "",
            page_index: 1,
            page_cap: 10,
            count: "",
        }
    }

    componentDidMount = () => {
        this.listUsers();
    }

    cancel = (e) => {
        console.log(e);
    }

    listUsers = () => {
        ManageAction.listUsers(this.state,(count,table)=>{
            let userData = table;
            for(let i=0;i<userData.length;i++){
                userData[i].able = userData[i].login_isdisabled === "N" ? "正常" : "已锁定";
                userData[i].controller = (
                    <div>
                        <Popconfirm placement="topRight" title={userData[i].login_isdisabled === "N" ? "确认锁定？" : "确认解锁？"} onConfirm={()=>{this.clock(userData[i].login_isdisabled,userData[i].login_id)}} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <a>{userData[i].login_isdisabled === "N" ? "锁定" : "解锁"}</a>
                        </Popconfirm>
                        丨
                        <Popconfirm placement="topRight" title="确定重置密码？" onConfirm={()=>{this.reset(userData[i].login_id)}} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <a style={{color: "#ff530c"}}>重置密码</a>
                        </Popconfirm>
                    </div>
                );
            }
            this.setState({
                count: count,
                data: userData
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        },()=>{
            this.listUsers();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.listUsers();
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
                this.listUsers();
            })
        }
    }

    clock = (disable,id) => {
        if(disable === "N"){
            ManageAction.disableUser("Y",id,(data)=>{
                this.listUsers();
            });
        }else{
            ManageAction.disableUser("N",id,(data)=>{
                this.listUsers();
            });
        }
    }

    reset = (id) => {
        ManageAction.resetPassword(id,(data)=>{
            console.log(data)
        })
    }

    render() {
        return(
            <div>
                <div className={Style.container}>
                    <Search name="searchkey" handle={this.handle} placeholder="用户账号、用户编号" areaStyle={{width: "100%"}} />
                    <div className={Style.select}>
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <Table dataSource={this.state.data}>
                        <Column title="用户编号" index="login_id" width="155" paddingLeft="20"/>
                        <Column title="用户账号" index="login_phone" width="155"/>
                        <Column title="账号类型" index="login_rrolename" width="155"/>
                        <Column title="账号状态" index="able" width="155"/>
                        <Column title="创建时间" index="login_createat" width="155"/>
                        <Column title="创建渠道" index="login_createsrc" width="155"/>
                        <Column title="操作" index="controller" width="155"/>
                    </Table>
                    {
                        this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                    }
                </div>
            </div>
        )
    }
}