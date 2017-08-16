/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Route, Link } from "react-router-dom";
import Style from "./css/manage.css"
import { SlideBox, SlideInfo } from "../common/slideBox";
import { TagDetail, TagModify } from "./tagInfo";
import Search from "../common/search";
import SearchTypes from "../common/searchTypes";
import {Table, Column} from "../common/table";
import Shadow from "../common/shadow";
import { AlertWindow, WindowContent } from "../common/alertWindow";
import {Input, Check, TextArea} from "../common/defaultInput";
import { Select, Popconfirm } from 'antd';

import Utils from "../../../store/utils";
import TagsAction from "../../../store/tagsAction";

export default class AgencyManagement extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isOpen: false,
            slideType: "",
            infoData: {},
            data: [],
            checkAll: false,
            shadowStatus: false,
            windowStatus: "",
            searchkey: "",
            type: [],
            page_index: 1,
            page_cap: 10,
            count: "",
            mergeData: [],
            tagsData: {}
        }
    }

    componentDidMount = () => {
        Utils.closeSlideBox(()=>{
            this.setState({
                isOpen: false
            })
        });
        this.listTags();
    }

    closeSlide = () => {
        this.setState({
            isOpen: false
        });
        this.listTags();
    }

    listTags = () => {
        TagsAction.listTags(this.state,(count,table)=>{
            let tagData = table;
            for(let i=0;i<tagData.length;i++){
                tagData[i].isChecked = false;
                tagData[i].check = <Check isChecked={false} handle={()=>{this.check(i)}} />;
                tagData[i].name = <a onClick={this.showDetail.bind(this,table[i],"watch")}>{tagData[i].tag_name}</a>;
                tagData[i].controller = (
                    <div>
                        <Popconfirm placement="topRight" title="是否要删除该标签？" onConfirm={() => {this.deleteTag(tagData[i].tag_id)}} onCancel={this.cancel} okText="Yes" cancelText="No">
                            <a>删除</a>
                        </Popconfirm> 丨
                        <a onClick={this.showDetail.bind(this,table[i],"modify")} style={{color: "#ff530c"}}>修改</a></div>
                )
            }
            this.setState({
                checkAll: false,
                count: count,
                data: tagData
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        },()=>{
            this.listTags();
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

    modify = (value,tagsData) => {
        layer.closeAll();
        if(value === "merge"){
            let data = this.state.data;
            let mergeData = [];
            for(let i=0;i<data.length;i++){
                if(data[i].isChecked){
                    mergeData.push({
                        id: data[i].tag_id,
                        name: data[i].tag_name,
                        tagtyp_id: data[i].tagtyp_id
                    })
                }
            }
            if(mergeData.length > 1){
                for(let i=1;i<mergeData.length;i++){
                    if(mergeData[i].tagtyp_id !== mergeData[0].tagtyp_id){
                        layer.open({
                            content: "标签适用范围必须相同才能合并",
                            skin: 'msg',
                            style: 'bottom:0;',
                            time: 3
                        });
                        return false;
                    }else{
                        continue;
                    }
                }
                this.setState({
                    shadowStatus: true,
                    windowStatus: value,
                    mergeData: mergeData
                })
            }else{
                layer.open({
                    content: "请选择至少两个标签",
                    skin: 'msg',
                    style: 'bottom:0;',
                    time: 3
                });
                return false;
            }
        }else{
            this.setState({
                shadowStatus: true,
                windowStatus: value,
                tagsData: tagsData ? tagsData : {}
            })
        }
    }

    close = (value) => {
        this.setState({
            shadowStatus: false
        });
        if(value === "modify"){
            this.listTags();
        }
    }

    checkAll = (value) => {
        this.setState({
            checkAll: !this.state.checkAll
        },()=>{
            let data = this.state.data;
            if(this.state.checkAll){
                for(let i=0;i<data.length;i++){
                    data[i].isChecked = true;
                    data[i].check = <Check isChecked={data[i].isChecked} handle={()=>{this.check(i)}} />;
                }
            }else{
                for(let i=0;i<data.length;i++){
                    data[i].isChecked = false;
                    data[i].check = <Check isChecked={data[i].isChecked} handle={()=>{this.check(i)}} />;
                }
            }
            this.setState({
                data: data
            });
        })
    }

    check = (index) => {
        let data = this.state.data;
        data[index].isChecked = !data[index].isChecked;
        data[index].check = <Check isChecked={data[index].isChecked} handle={()=>{this.check(index)}} />;
        this.setState({
            data: data
        });
    }

    deleteTag = (id) => {
        TagsAction.deleteTag(id,(data)=>{
            this.listTags();
        })
    }

    render() {
        return(
            <div>
                <SlideBox isOpen={this.state.isOpen}>
                    {
                        this.state.isOpen ? (
                            <SlideInfo title="标签详情">
                                {
                                    (()=>{
                                        switch (this.state.slideType){
                                            case "watch":
                                                return <TagDetail data={this.state.infoData} />;
                                                break;
                                            case "modify":
                                                return <TagModify data={this.state.infoData} closeSlide={this.closeSlide} />;
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
                            {
                                (() => {
                                    switch (this.state.windowStatus){
                                        case "new":
                                            return (
                                                <AlertWindow style={{width: 460, height: 400}}
                                                             handle={this.close}
                                                >
                                                    <NewTagWindow handle={this.close} tagsData={this.state.tagsData}/>
                                                </AlertWindow>
                                            );
                                            break;
                                        case "merge":
                                            return (
                                                <AlertWindow style={{width: 460, height: 490}}
                                                             handle={this.close}
                                                >
                                                    <MergeTagWindow handle={this.close} mergeData={this.state.mergeData}/>
                                                </AlertWindow>
                                            );
                                            break;
                                    }
                                })()
                            }
                        </Shadow>
                    ) : ("")
                }
                <div className={Style.container}>
                    <Search name="searchkey" handle={this.handle} placeholder="标签名称" areaStyle={{width: "100%"}} />
                    <div className={Style.select}>
                        <SearchTypes title="适用范围：" name="type" handle={this.handle} getData="queryTagTypes"/>
                    </div>
                </div>
                <div className={Style.container} style={{marginTop: 10}}>
                    <div className="flex flex-row flex-center" style={{margin: "20px 0"}}>
                        <a className={"flex flex-row flex-start align-center " + Style.mergeTag} onClick={() => {this.modify("merge")}}>
                            <i></i>
                            <span>合并标签</span>
                        </a>
                        <a className={"flex flex-row flex-start align-center " + Style.addTag} onClick={() => {this.modify("new")}}>
                            <i></i>
                            <span>新建标签</span>
                        </a>
                    </div>
                    <Table dataSource={this.state.data}>
                        <Column title={<Check isChecked={this.state.checkAll} handle={this.checkAll} />} index="check" width="140" paddingLeft="46"/>
                        <Column title="标签名称" index="name" width="154"/>
                        <Column title="标签说明" index="tag_detail" width="170"/>
                        <Column title="适用范围" index="tagtyp_name" width="118"/>
                        <Column title="被标记数" index="tag_counter" width="110"/>
                        <Column title="创建人" index="platform_personname" width="122"/>
                        <Column title="操作" index="controller" width="216"/>
                    </Table>
                </div>
            </div>
        )
    }
}

export class NewTagWindow extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tagname: "",
            tagdetail: "",
            tagtype: this.props.type ? this.props.type[0] : "",
            typeData: []
        }
    }

    componentDidMount = () => {
        TagsAction.queryTagTypes((data)=>{
            this.setState({
                typeData: data
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeType = (value) => {
        this.setState({
            tagtype: value
        })
    }

    _submit = () => {
        TagsAction.newTag(this.state,(data)=>{
            this.props.handle("modify");
        })
    }

    render() {
        const Option = Select.Option;
        return(
            <div className={Style.window}>
                <div style={{paddingLeft: 54}}>
                    <WindowContent title="标签名称" titleStyle={{width: 116}} style={{marginTop: 45}}>
                        <Input name="tagname" value={this.state.tagname} handle={this.handle} style={{width: 236}}/>
                    </WindowContent>
                    <WindowContent title="适用范围" titleStyle={{width: 116}} style={{marginTop: 26}}>
                        {
                            this.props.type ? (
                                (()=>{
                                    switch (this.props.type[0]){
                                        case 1:
                                            return <p>项目</p>;
                                            break;
                                        case 3:
                                            return <p>投资人</p>;
                                            break;
                                        case 4:
                                            return <p>投资机构</p>;
                                            break;
                                    }
                                })()
                            ) : (
                                <Select style={{ width: 236 }} onChange={this.changeType}>
                                    {
                                        this.state.typeData.map((tag,i)=>{
                                            return(
                                                <Option key={i} value={tag.id}>{tag.name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            )
                        }
                    </WindowContent>
                    <WindowContent title="标签说明" titleStyle={{width: 116}} style={{marginTop: 26}}>
                        <TextArea name="tagdetail" value={this.state.tagdetail} handle={this.handle} style={{width: 236, height: 158}}/>
                    </WindowContent>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                    <a onClick={this._submit} className={Style.save}>保存</a>
                </div>
            </div>
        )
    }
}

class MergeTagWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tagids: [],
            tagname: "",
            tagdetail: "",
            tagtype: ""
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    _submit = () => {
        let data = this.props.mergeData;
        let tagids = [];
        let tagtype = data[0].tagtyp_id;
        for(let i=0;i<data.length;i++){
            tagids.push(data[i].id);
        }
        this.setState({
            tagids: tagids,
            tagtype: tagtype
        },()=>{
            TagsAction.merageTag(this.state,(data)=>{
                this.props.handle("modify")
            })
        })
    }

    render() {
        return(
            <div className={Style.window}>
                <h4>合并标签</h4>
                <div style={{marginTop: 10, paddingLeft: 54}}>
                    <WindowContent title="原标签" titleStyle={{width: 116}}>
                        <div className="flex flex-row flex-start">
                            {
                                this.props.mergeData.map((merge,i)=>{
                                    return(
                                        <p key={i} style={{marginRight: 10}}>{merge.name}</p>
                                    )
                                })
                            }
                        </div>
                    </WindowContent>
                </div>
                <div className="flex flex-row flex-start align-center" style={{marginTop: 26}}>
                    <div className={Style.line} style={{width: 44}}></div>
                    <p style={{margin: "0 10px", color: "#babcbf"}}>将被合并为</p>
                    <div className={"flex1 " + Style.line}></div>
                </div>
                <div style={{marginTop: 29, paddingLeft: 54}}>
                    <WindowContent title="新标签名称" titleStyle={{width: 116}}>
                        <Input name="tagname" value={this.state.tagname} handle={this.handle} style={{width: 236}}/>
                    </WindowContent>
                    <WindowContent title="标签说明" titleStyle={{width: 116}} style={{marginTop: 26}}>
                        <TextArea name="tagdetail" value={this.state.tagdetail} handle={this.handle} style={{width: 236, height: 158}}/>
                    </WindowContent>
                </div>
                <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                    <a onClick={this._submit} className={Style.save}>合并</a>
                </div>
            </div>
        )
    }
}