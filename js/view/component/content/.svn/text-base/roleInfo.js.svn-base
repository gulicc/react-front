/**
 * Created by Galaxy065 on 2017/5/24.
 */
import React from "react";
import { InfoContent } from "../common/infoArea";
import { FormItem } from "../common/formArea";
import { Input, TextArea } from "../common/defaultInput";
import { FormButton } from "../common/defaultButton";
import { Tree } from 'antd';
const TreeNode = Tree.TreeNode;
import FreeScrollBar from 'react-free-scrollbar';

import PlatformAction from "../../../store/platformAction";

export class RoleDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            actorpowers: [],
            treeData: []
        }
    }

    componentDidMount = () => {
        let powers = this.props.data.powers;
        let powersData = [];
        for(let i in powers){
            powersData.push(powers[i].platpower_id.toString());
        }
        this.setState({
            actorpowers: powersData
        },()=>{
            PlatformAction.getAllOrgPowers((data)=>{
                let treeData = this.sortData(data);
                this.setState({
                    treeData: treeData
                })
            })
        });
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

    render() {
        const loop = data => data.map((item) => {
            if (item.child) {
                return (
                    <TreeNode key={item.id} disableCheckbox title={item.name ? item.name : item.power} >
                        {loop(item.child)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.id} disableCheckbox title={item.name ? item.name : item.power} />;
        });
        return(
            <div className="flex flex-row flex-start" style={{padding: "15px 0", backgroundColor: "#ffffff"}}>
                <div>
                    <InfoContent title="角色名称：" value={this.props.data.platact_name} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                    <InfoContent title="备注：" value={this.props.data.platact_descript} width="110" titleStyle={{lineHeight: "44px"}} valueStyle={{lineHeight: "44px"}}/>
                </div>
                <div className="flex1" style={{marginLeft: 102}}>
                    <FormItem title="权限" titleWidth="110">
                        <div style={{width: "100%", height: 334}}>
                            <FreeScrollBar autohide={true}>
                                {
                                    this.state.treeData.length ? (
                                        <Tree checkable checkedKeys={this.state.actorpowers} defaultExpandAll={true} autoExpandParent={true} onCheck={this.onCheck}>
                                            {loop(this.state.treeData)}
                                        </Tree>
                                    ) : ("")
                                }
                            </FreeScrollBar>
                        </div>
                    </FormItem>
                </div>
            </div>
        )
    }
}

export class RoleModify extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            actid: this.props.data.platact_id,
            actorname: this.props.data.platact_name,
            actordesc: this.props.data.platact_descript,
            actorpowers: [],
            treeData: []
        }
    }

    componentDidMount = () => {
        let powers = this.props.data.powers;
        let powersData = [];
        for(let i in powers){
            powersData.push(powers[i].platpower_id.toString());
        }
        this.setState({
            actorpowers: powersData
        },()=>{
            PlatformAction.getAllOrgPowers((data)=>{
                let treeData = this.sortData(data);
                this.setState({
                    treeData: treeData
                })
            })
        });
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

    _submit = () => {
        PlatformAction.updateOrgActor(this.state,(data)=>{
            this.props.closeSlide();
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
            <div>
                <div className="flex flex-row flex-start" style={{padding: "30px", backgroundColor: "#ffffff"}}>
                    <div>
                        <FormItem title="角色名称" titleWidth="110">
                            <Input name="actorname" value={this.state.actorname}  handle={this.handle} style={{width: 236}} />
                        </FormItem>
                        <FormItem title="备注" titleWidth="110" marginTop="26">
                            <TextArea name="actordesc" value={this.state.actordesc} handle={this.handle} style={{width: 236}} />
                        </FormItem>
                    </div>
                    <div className="flex1" style={{marginLeft: 102}}>
                        <FormItem title="权限" titleWidth="110">
                            <div style={{width: "100%", height: 334}}>
                                <FreeScrollBar autohide={true}>
                                    {
                                        this.state.treeData.length ? (
                                            <Tree checkable checkedKeys={this.state.actorpowers} autoExpandParent={true} onCheck={this.onCheck}>
                                                {loop(this.state.treeData)}
                                            </Tree>
                                        ) : ("")
                                    }
                                </FreeScrollBar>
                            </div>
                        </FormItem>
                    </div>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 20}}>
                    <FormButton buttonName="保存" handle={this._submit} style={{backgroundColor: "#ff530c"}}/>
                </div>
            </div>
        )
    }
}