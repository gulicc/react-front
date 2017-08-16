/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import { RoleDetail, RoleModify } from "./roleInfo";
import {Table, Column} from "../common/table";
import Shadow from "../common/shadow";
import { AlertWindow, WindowContent } from "../common/alertWindow";
import { Input, TextArea } from "../common/defaultInput";
import { Tree, Popconfirm } from 'antd';
const TreeNode = Tree.TreeNode;
import FreeScrollBar from 'react-free-scrollbar';

import Utils from "../../../store/utils";
import PlatformAction from "../../../store/platformAction";

export default class AgencyManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            slideType: "",
            infoData: {},
            data: [],
            shadowStatus: false,
        }
    }

    componentDidMount = () => {
        Utils.closeSlideBox(()=>{
            this.setState({
                isOpen: false
            })
        });
        this.getOrgActorList();
    }

    componentWillUnmount = () => {
        layer.closeAll();
    }

    closeSlide = () => {
        this.setState({
            isOpen: false
        });
        this.getOrgActorList();
    }

    getOrgActorList = () => {
        PlatformAction.getOrgActorList((data)=>{
            let roleData = data;
            for(let i=0;i<roleData.length;i++){
                roleData[i].name = <a onClick={this.showDetail.bind(this,data[i],"watch")}>{roleData[i].platact_name}</a>;
                roleData[i].controller = (
                    <div>
                        <a onClick={this.showDetail.bind(this,data[i],"modify")}>修改</a> 丨
                        <Popconfirm placement="topRight" title="是否要删除该员工？" onConfirm={()=>{this.deleteRole(roleData[i].platact_id,roleData[i].used_count)}} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <a style={{color: "#ff530c"}}>删除</a>
                        </Popconfirm>
                    </div>
                )
            }
            this.setState({
                data: roleData
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
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

    addRole = () => {
        this.setState({
            shadowStatus: true
        })
    }

    deleteRole = (id,count) => {
        if(count){
            layer.open({
                content: "该角色下有员工绑定，禁止删除",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }else {
            PlatformAction.deleteOrgActors(id, (data) => {
                this.getOrgActorList();
            })
        }
    }

    close = (value) => {
        this.setState({
            shadowStatus: false,
            roleData: {}
        })
        if(value === "modify"){
            this.getOrgActorList();
        }
    }

    render() {
        return(
            <div>
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="角色详情">
                                {
                                    (()=>{
                                        switch (this.state.slideType){
                                            case "watch":
                                                return <RoleDetail data={this.state.infoData} />;
                                                break;
                                            case "modify":
                                                return <RoleModify data={this.state.infoData} closeSlide={this.closeSlide} />;
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
                        <Shadow>
                            <AlertWindow style={{width: 820, height: 520}}
                                         handle={this.close}
                            >
                                <RoleInfoWindow handle={this.close} />
                            </AlertWindow>
                        </Shadow>
                    ) : ("")
                }
                <div className={Style.container}>
                    <div className="flex flex-row flex-end">
                        <a onClick={this.addRole} className={"flex flex-row flex-start align-center " + Style.addTag}>
                            <i></i>
                            <span>新增角色</span>
                        </a>
                    </div>
                    <Table dataSource={this.state.data} marginTop="20">
                        <Column title="角色名称" index="name" width="174" paddingLeft="46"/>
                        <Column title="应用人数" index="used_count" width="140"/>
                        <Column title="备注" index="platact_descript" width="146"/>
                        <Column title="操作" index="controller" />
                    </Table>
                </div>
            </div>
        )
    }
}

class RoleInfoWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            actorname: "",
            actordesc: "",
            actorpowers: [],
            treeData: []
        }
    }

    componentDidMount = () => {
        PlatformAction.getAllOrgPowers((data)=>{
            let treeData = this.sortData(data);
            this.setState({
                treeData: treeData
            })
        })
    }

    sortData = (data) => {
        let newData = [];
        for (let i in data) {
            if (data.hasOwnProperty(i)){
                newData.push(
                    {
                        name: i,
                        child: this.sortData(data[i].children).concat(data[i].powers)
                    }
                );
            }
        }
        return newData;
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    _submit = () => {
        PlatformAction.createOrgActor(this.state,()=>{
            this.props.handle("modify");
        })
    }

    onCheck = (checkedKeys, info) => {
        let infoData = [];
        for(let i in info.checkedNodes){
            if(info.checkedNodes[i].key !== null){
                infoData.push(info.checkedNodes[i].key);
            }
        }
        this.setState({
            actorpowers: infoData
        })
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.child) {
                return (
                    <TreeNode key={item.id} title={item.name ? item.name : item.power} >
                        {loop(item.child)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} title={item.name ? item.name : item.power} />;
        });
        return(
            <div className={Style.window}>
                <h4>角色信息</h4>
                <div className="flex flex-row flex-start" style={{padding: "10px 64px 0"}}>
                    <div>
                        <WindowContent title="角色名称" titleStyle={{width: 86}}>
                            <Input name="actorname" value={this.state.actorname} handle={this.handle} style={{width: 180}}/>
                        </WindowContent>
                        <WindowContent title="备注" titleStyle={{width: 86}} style={{marginTop: 28}}>
                            <TextArea name="actordesc" value={this.state.actordesc} handle={this.handle} style={{width: 180}}/>
                        </WindowContent>
                    </div>
                    <div className="flex1" style={{marginLeft: 102}}>
                        <WindowContent title="权限" titleStyle={{width: 78}}>
                            <div style={{width: "100%", height: 334}}>
                                <FreeScrollBar autohide={true}>
                                    {
                                        this.state.treeData.length ? (
                                            <Tree checkable autoExpandParent={true} onCheck={this.onCheck}>
                                                {loop(this.state.treeData)}
                                            </Tree>
                                        ) : ("")
                                    }
                                </FreeScrollBar>
                            </div>
                        </WindowContent>
                    </div>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 36}}>
                    <a onClick={this._submit} className={Style.save} style={{marginRight: 20}}>保存</a>
                    <a onClick={this.props.handle} className={Style.cancel}>取消</a>
                </div>
            </div>
        )
    }
}