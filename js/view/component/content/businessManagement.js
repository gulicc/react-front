/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import BusinessInfo from "./businessInfo";
import Search from "../common/search";
import SearchTimeRange from "../common/searchTimeRange";
import SearchTypes from "../common/searchTypes";
import {Table, Column} from "../common/table";
import Pagination from "../common/pagination";
import { AddBusinessWindow } from "../common/addWindow";
import { Popconfirm } from "antd";

import Utils from "../../../store/utils";
import ActivityAction from "../../../store/activityAction";

export default class BusinessManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            addBusiness: false,
            isOpen: false,
            id: "",
            key: "",
            start_time: "",
            end_time: "",
            type: "",
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
        this.searchActivities();
    }

    searchActivities = () => {
        ActivityAction.searchActivities(this.state,(count,records)=>{
            for(let i=0;i<records.length;i++){
                records[i].title = <a onClick={this.showDetail.bind(this,records[i].id)}>{records[i].title}</a>;
                records[i].delete = (
                    <Popconfirm placement="topRight" title="是否要删除该活动？" onConfirm={this.deleteActive.bind(this,records[i].id)} onCancel={this.cancel} okText="Yes" cancelText="No">
                        <a style={{color: "#ff530c"}}>删除</a>
                    </Popconfirm>
                );
                records[i].file = records[i].files.length ? <a download={records[i].files[0].path.name} href={records[i].files[0].path.path}>附件</a> : ""
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
            this.searchActivities();
        })
    }

    changePage = (value) => {
        this.setState({
            page_index: value
        },()=>{
            this.searchActivities();
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
                this.searchActivities();
            })
        }
    }

    showDetail = (i,e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(false);
        this.setState({
            id: i,
            isOpen: true
        })
    }

    deleteActive = (id,e) => {
        e.nativeEvent.stopImmediatePropagation();
        ActivityAction.removeActivity(id,()=>{
            this.searchActivities();
            layer.open({
                content: "业务活动删除成功！",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
        })
    }

    openAddBusinessWindow = () => {
        this.setState({
            addBusiness: true
        })
    }

    closeAddBusinessWindow = () => {
        this.setState({
            addBusiness: false
        })
    }

    completeAddBusiness = () => {
        this.refs.key.reset();
        this.refs.timeRange.reset();
        this.refs.type.reset();
        this.setState({
            key: "",
            start_time: "",
            end_time: "",
            type: "",
            page_index: 1
        },()=>{
            this.searchActivities();
        });
        layer.open({
            content: "添加业务活动成功！",
            skin: 'msg',
            style: 'bottom:0;',
            time: 3
        });
        this.closeAddBusinessWindow();
    }

    render() {
        const type = [
            {
                name: "单方拜访",
                id: "单方拜访"
            },
            {
                name: "投资人会议",
                id: "投资人会议"
            }
        ];
        return(
            <div>
                {
                    this.state.addBusiness ? <AddBusinessWindow close={this.closeAddBusinessWindow} complete={this.completeAddBusiness} /> : ""
                }
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="业务活动详情">
                                <BusinessInfo id={this.state.id}/>
                            </SlideInfo>
                        ) : ("")
                    }
                </SlideBox>
                <div className={Style.container}>
                    <div className="flex flex-row flex-between">
                        <Search ref="key" name="key" handle={this.handle} placeholder="跟进人 / 拜访主题" />
                        <div className={"flex flex-row flex-start align-center " + Style.insertMethod}>
                            <p onClick={this.openAddBusinessWindow}>添加业务活动</p>
                        </div>
                    </div>
                    <div className={Style.select}>
                        <SearchTimeRange ref="timeRange" title="活动时间：" handle={this.handle} />
                        <SearchTypes ref="type" title="活动类型：" type="radio" name="type" data={type} handle={this.handle} />
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <Table dataSource={this.state.data}>
                        <Column title="活动主题" index="title" width="168" paddingLeft="20"/>
                        <Column title="活动类型" index="type" width="112"/>
                        <Column title="活动对象" index="object" width="130"/>
                        <Column title="活动时间" index="start_time" width="160"/>
                        <Column title="负责人" index="director" width="94"/>
                        <Column title="活动形式" index="way" width="106"/>
                        <Column title="备注" index="remark" width="100"/>
                        <Column title="附件" index="file" width="90"/>
                        <Column title="删除" index="delete" width="72"/>
                    </Table>
                    {
                        this.state.data.length ? <Pagination count={this.state.count} page={this.state.page_index} showCount={this.state.page_cap} handle={this.changePage} chooseShow={this.chooseShow} style={{marginTop: 35}}/> : ""
                    }
                </div>
            </div>
        )
    }
}