/**
 * Created by Galaxy065 on 2017/5/16.
 */
import React from "react";
import Style from "./css/alertWindow.css";
import { CloseButton, TransRight, TransLeft } from "./defaultButton";
import Icon from "./defaultIcon";
import Shadow from "./shadow";
import { FormRate } from "./formArea";
import {Input, TabSelect, RadioTip, Check, Need} from "./defaultInput";
import { AutoCompleteOrg,AutoCompleteStaff } from "./autoComplete";
import { NewTagWindow } from "../content/tagManagement";
import { Select,DatePicker } from "antd";
import moment from 'moment';
import FreeScrollBar from 'react-free-scrollbar';

import ProjectAction from "../../../store/projectAction";
import OrgAction from "../../../store/orgAction";
import CompanyAction from "../../../store/companyAction";
import InvestorAction from "../../../store/investorAction";
import PlatformAction from "../../../store/platformAction";
import AutoCompleteAction from "../../../store/autoCompleteAction";
import TagsAction from "../../../store/tagsAction";

export class AlertWindow extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={Style.alertWindow} style={this.props.style}>
                {
                    this.props.handle ? (
                        <CloseButton style={{position: "absolute", top: 10, right: 10}}
                                     handle={this.props.handle}
                        />
                    ) : ("")
                }
                {this.props.children}
            </div>
        )
    }
}

export class WindowContent extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.windowContent} style={this.props.style}>
                <p style={this.props.titleStyle}>{this.props.title}</p>
                {this.props.children}
            </div>
        )
    }
}

export class AlertButton extends React.Component {
    constructor(props){
        super(props)
    }

    handle = () => {
        this.props.handle();
    }

    render() {
        return(
            <p className={Style[this.props.className]} style={this.props.style} onTouchTap={this.handle}>{this.props.name}</p>
        )
    }
}

export class AddAgencyWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            type: "",
            address: "",
            web: "",
            fund_size: "",
            staff_size: "",
            pref_fields: "",
            pref_phases: "",
            intro: "",
            tags: "",
            team: "",
            is_online: "N",
            source_type: "",
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    _submit = () => {
        OrgAction.createInvestOrg(this.state,(data)=>{
            this.props.save({
                id: data.id,
                name: this.state.name
            });
        })
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{width: 460, height: 344}}
                             handle={this.props.closeHandle}
                >
                    <div>
                        <h4>快速添加投资机构</h4>
                        <div style={{paddingLeft: 54}}>
                            <WindowContent title="机构名称" titleStyle={{width: 116}}>
                                <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                            </WindowContent>
                            <WindowContent title="机构简称" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="name_abbr" value={this.state.name_abbr} handle={this.handle} style={{width: 236}} need={true}/>
                            </WindowContent>
                            <WindowContent title="机构类型" titleStyle={{width: 101}} style={{marginTop: 26}}>
                                <RadioTip name="type" getData="queryInvestOrgTypes" handle={this.handle} style={{paddingRight: 30}} need={true}/>
                            </WindowContent>
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                            <AlertButton name="添加" className="save" handle={this._submit}/>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class AddEnterpriseWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            abbrname: ""
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    _submit = () => {
        CompanyAction.createCompany(this.state,(data)=>{
            this.props.save({
                id: data.id,
                name: this.state.name
            });
        })
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{width: 460, height: 248}}
                             handle={this.props.closeHandle}
                >
                    <div>
                        <h4>快速添加企业</h4>
                        <div style={{paddingLeft: 54}}>
                            <WindowContent title="企业名称" titleStyle={{width: 116}}>
                                <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                            </WindowContent>
                            <WindowContent title="企业简称" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="abbrname" value={this.state.abbrname} handle={this.handle} style={{width: 236}}/>
                            </WindowContent>
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                            <AlertButton name="添加" className="save" handle={this._submit}/>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class AddInvestorWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            name: "",
            sex: "M",
            is_org: "Y",
            org_id: "",
            org_name: "",
            mobile: ""
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeOrg = (obj) => {
        this.handle("org_id",obj.id);
        this.handle("org_name",obj.name);
    }

    _submit = () => {
        InvestorAction.createInvestor(this.state,(data)=>{
            let obj = {
                id: data.id,
                extId: data.ext_id,
                name: this.state.name,
                org: this.state.org_name,
                phone: this.state.mobile
            }
            this.props.save(obj);
        })
    }

    render() {
        const isOrgData = [
            {
                name: "个人",
                params: "N"
            },
            {
                name: "机构",
                isChecked: true,
                params: "Y"
            }
        ];
        return(
            <Shadow>
                <AlertWindow style={{width: 460, height: 430}}
                             handle={this.props.closeHandle}>
                    <div>
                        <h4>快速添加投资人</h4>
                        <div style={{paddingLeft: 54}}>
                            <WindowContent title="投资人姓名" titleStyle={{width: 116}}>
                                <Input name="name" value={this.state.name} handle={this.handle} style={{width: 236}} need={true}/>
                            </WindowContent>
                            <WindowContent title="性别" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Check isChecked={this.state.sex === "M"} handle={() => {this.handle("sex","M")}}>
                                    <p style={{marginLeft: 12}}>男</p>
                                </Check>
                                <Check isChecked={this.state.sex === "F"} handle={() => {this.handle("sex","F")}} style={{marginLeft: 40}}>
                                    <p style={{marginLeft: 12}}>女</p>
                                </Check>
                            </WindowContent>
                            <WindowContent title="投资人类型" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <TabSelect name="is_org" data={isOrgData} need={true} handle={this.handle}/>
                            </WindowContent>
                            {
                                this.state.is_org === "Y" ? (
                                    <WindowContent title="投资机构" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                        <AutoCompleteOrg handle={this.changeOrg} />
                                    </WindowContent>
                                ) : ("")
                            }
                            <WindowContent title="手机" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="mobile" value={this.state.mobile} handle={this.handle} style={{width: 236}} need={true}/>
                            </WindowContent>
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                            <AlertButton name="添加" className="save" handle={this._submit}/>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class AddTag extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            tagData: [],
            isOpen: false,
        }
    }

    componentDidMount = () => {
        TagsAction.listTags({type: this.props.type, page_cap: 0},(count,data)=>{
            let tagData = data;
            for(let i=0;i<this.props.checkData.length;i++){
                for(let j=0;j<tagData.length;j++){
                    if(parseInt(this.props.checkData[i].tag_id) === parseInt(tagData[j].tag_id)){
                        tagData.splice(j--,1);
                        break;
                    }
                }
            }
            this.setState({
                tagData: tagData
            })
        })
    }

    check = (index) => {
        let tagData = this.state.tagData;
        tagData[index].isChecked = !tagData[index].isChecked;
        this.setState({
            tagData: tagData
        })
    }

    _submit = () => {
        let tagData = this.state.tagData;
        let checkData = [];
        tagData.map((item)=>{
            if(item.isChecked){
                checkData.push(item)
            }
        })
        this.props.submitHandle(checkData);
    }

    addTags = () => {
        this.setState({
            isOpen: true
        });
    }

    complete = () => {
        TagsAction.listTags({type: this.props.type, page_cap: 0},(count,data)=>{
            let tagData = data;
            for(let i=0;i<this.props.checkData.length;i++){
                for(let j=0;j<tagData.length;j++){
                    if(parseInt(this.props.checkData[i].tag_id) === parseInt(tagData[j].tag_id)){
                        tagData.splice(j--,1);
                        break;
                    }
                }
            }
            this.setState({
                tagData: tagData
            })
        })
        this.close();
    }

    close = () => {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{padding: "26px 40px 26px", width: 420, maxHeight: "90%"}}
                             handle={this.closeHandle}>
                    {
                        this.state.isOpen ? (
                            <Shadow>
                                <AlertWindow style={{width: 460, height: 400}}
                                             handle={this.close}
                                >
                                    <NewTagWindow handle={this.complete} type={this.props.type} />
                                </AlertWindow>
                            </Shadow>
                        ) : ""
                    }
                    <div className={Style.tag}>
                        {
                            this.state.tagData && this.state.tagData.length ? (
                                this.state.tagData.map((tag,i)=>{
                                    return(
                                        <div className={Style.item}>
                                            <a key={i} onTouchTap={()=>{this.check(i)}} className={tag.isChecked ? Style.checked : ""}>{tag.tag_name}</a>
                                        </div>
                                    )
                                })
                            ) : (
                                <p style={{color: "#babcbf"}}>暂无可选标签</p>
                            )
                        }
                    </div>
                    <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                        <AlertButton name="确认" className="save" handle={this._submit} style={{marginRight: 20}} />
                        <AlertButton name="添加" className="cancel" handle={this.addTags} />
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class AppointInvestor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            number: 0,
            leftData: [],
            rightData: this.props.data
        }
    }

    search = () => {
        AutoCompleteAction.searchInvestorNames(this.refs.searchKey.value,(data)=>{
            for(let i=0;i<data.length;i++){
                for(let j=0;j<this.state.rightData.length;j++){
                    if(data[i].extId === this.state.rightData[j].extId){
                        data.splice(i--,1);
                        break;
                    }
                }
            }
            this.setState({
                leftData: data
            })
        })
    }

    check = (i) => {
        let leftData = this.state.leftData;
        leftData[i].isChecked = !leftData[i].isChecked;
        this.setState({
            leftData: leftData
        })
    }

    checkRight = (i) => {
        let rightData = this.state.rightData;
        rightData[i].isChecked = !rightData[i].isChecked;
        this.setState({
            rightData: rightData
        })
    }

    goRight = () => {
        let rightData = this.state.rightData;
        let leftData = this.state.leftData;
        for(let i=0;i<this.state.leftData.length;i++){
            if(this.state.leftData[i].isChecked){
                this.state.leftData[i].isChecked = false;
                rightData.push(this.state.leftData[i]);
                leftData.splice(i--,1);
            }
        }
        this.setState({
            rightData: rightData,
            leftData: leftData
        })
    }

    goLeft = () => {
        let rightData = this.state.rightData;
        let leftData = this.state.leftData;
        for(let i=0;i<this.state.rightData.length;i++){
            if(this.state.rightData[i].isChecked){
                this.state.rightData[i].isChecked = false;
                leftData.push(this.state.rightData[i]);
                rightData.splice(i--,1);
            }
        }
        this.setState({
            rightData: rightData,
            leftData: leftData
        })
    }

    _submit = () => {
        if(this.state.rightData.length){
            this.props.handle("sharesData",this.state.rightData);
        }else{
            layer.open({
                content: "请选择指定的投资人",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            return false;
        }
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{padding: "10px 50px 30px", width: 690, height: 484}}
                             handle={this.props.closeHandle}>
                    <div className="flex flex-row flex-between">
                        <div>
                            <h5 className={Style.transTitle}>可选投资人</h5>
                            <div className={"flex flex-row flex-start " + Style.search}>
                                <input type="text" ref="searchKey"/>
                                <button className="flex1" onClick={this.search}>搜索</button>
                            </div>
                            <div className={Style.list}>
                                <div className={Style.listTitle}>
                                    <p>姓名</p>
                                    <p>公司</p>
                                </div>
                                <div style={{height: 260}}>
                                    <FreeScrollBar>
                                        {
                                            this.state.leftData.map((left,i)=>{
                                                return(
                                                    <div className={left.isChecked ? Style.listItemChecked : Style.listItem} onClick={()=>{this.check(i)}} key={i}>
                                                        <p>{left.name}</p>
                                                        <p>{left.org}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </FreeScrollBar>
                                </div>
                            </div>
                        </div>
                        <div className={"flex flex-column flex-center " + Style.transButton}>
                            <TransRight handle={this.goRight}/>
                            <TransLeft handle={this.goLeft} style={{marginTop: 10}}/>
                        </div>
                        <div>
                            <h5 className={Style.transTitle}>已选投资人</h5>
                            <p className={Style.transNumber}><span>{this.state.rightData.length}</span>人</p>
                            <div className={Style.list}>
                                <div className={Style.listTitle}>
                                    <p>姓名</p>
                                    <p>公司</p>
                                </div>
                                <div style={{height: 260}}>
                                    <FreeScrollBar>
                                        {
                                            this.state.rightData.map((right,i)=>{
                                                return(
                                                    <div className={right.isChecked ? Style.listItemChecked : Style.listItem} onClick={()=>{this.checkRight(i)}} key={i}>
                                                        <p>{right.name}</p>
                                                        <p>{right.org}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </FreeScrollBar>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                        <AlertButton name="确定" className="save" handle={this._submit} style={{marginRight: 20}}/>
                        <AlertButton name="取消" className="cancel" handle={this.props.closeHandle} />
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class AppointInvestorShow extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <AlertWindow style={{padding: "10px 0 40px", width: 330, boxShadow: "-4px 4px 14px #333333", mozBoxShadow: "-4px 4px 14px #333333", webkitBoxShadow: "-4px 4px 14px #333333"}}>
                <div>
                    <h5 className={Style.transTitle}>可见投资人</h5>
                    <div className={Style.investorList}>
                        <div className={"flex flex-row flex-start " + Style.investorListTitle}>
                            <p style={{width: 78}}>姓名</p>
                            <p className="flex1">公司</p>
                        </div>
                        <div style={{height: 260}}>
                            <FreeScrollBar>
                                {
                                    this.props.data && this.props.data.length ? (
                                        this.props.data.map((datas,i)=>{
                                            return(
                                                <div className={"flex flex-row flex-start " + Style.investorListItem} key={i}>
                                                    <p style={{width: 78, borderRight: "1px solid #f5f6f8"}}>{datas.invest_personname}</p>
                                                    <p className="flex1" style={{padding: "0 5px"}}>{datas.invest_orgname}</p>
                                                </div>
                                            )
                                        })
                                    ) : ("")
                                }
                            </FreeScrollBar>
                        </div>
                    </div>
                </div>
            </AlertWindow>
        )
    }
}

export class Questionnaire extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            questionData: [
                {
                    title: "1、项目是否是机构普遍认可的热门投资领域？",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "2、项目市场地位领先性",
                    child: [
                        {
                            title: "A、第一",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、第二或者第三",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、第三以后但具有成长为第一的潜力",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "3、是否满足百亿市值空间？",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "4、技术和产品领先性是否已经过市场验证",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "5、主要的产品和服务是否有快速复制的能力",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "6、项目的主要客户是否有较强支付能力",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "7、项目过去2年主要运营数据的增长趋势",
                    child: [
                        {
                            title: "A、100%以上增长",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、30%-100%增长",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、30%以下增长",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "8、该项目是否已经找到关键运营快速增长的拐点？",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "9、创始人能力和知识结构完整性",
                    child: [
                        {
                            title: "A、优秀",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、差",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "10、项目核心管理团队整体能力",
                    child: [
                        {
                            title: "A、优秀",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、差",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "11、创始人是否有深厚的产业、资源背景",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "12、现金可以够公司存续几个月？",
                    child: [
                        {
                            title: "A、18个月以上",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、6-18个月",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、6个月以下",
                            score: 1,
                            isChecked: false
                        },
                    ]
                },
                {
                    title: "13、公司是否连续2年有稳定利润？",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "14、公司是否有会计师事业所出具的审计报告？",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "15、项目在公开市场是否有竞争对手",
                    child: [
                        {
                            title: "A、有",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、没有",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "16、项目是否已经与巨头有充分的差异化策略",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "17、创始团队对估值的预期是否灵活",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "18、创始团队对投资方背景的预期是否灵活",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "19、创始团队是否接受对赌",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                },
                {
                    title: "20、项目上一轮投资人是否是专业投资人",
                    child: [
                        {
                            title: "A、是",
                            score: 5,
                            isChecked: false
                        },
                        {
                            title: "B、一般",
                            score: 3,
                            isChecked: false
                        },
                        {
                            title: "C、否",
                            score: 1,
                            isChecked: false
                        }
                    ]
                }
            ]
        }
    }

    check = (i,j) => {
        let data = this.state.questionData;
        for(let m=0;m<data[i].child.length;m++){
            data[i].child[m].isChecked = false;
        }
        data[i].child[j].isChecked = true;
        this.setState({
            questionData: data
        });
    }

    _submit = () => {
        let data = this.state.questionData;
        let score = 0;
        for(let i=0;i<data.length;i++){
            for(let j=0;j<data[i].child.length;j++){
                if(data[i].child[j].isChecked){
                    score = score + data[i].child[j].score;
                }
            }
        }
        this.props.handle(score);
        this.props.closeHandle();
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{padding: "0px 0px 30px 34px", width: 460, height: 580}}
                             handle={this.props.closeHandle}>
                    <div>
                        <h4>评测问卷</h4>
                        <div className={Style.question}>
                            {
                                this.state.questionData.map((question,i)=>{
                                    return(
                                        <div>
                                            <p className={Style.questionTitle} style={{marginTop: i > 0 ? 32 : 0}}>{question.title}</p>
                                            <div className={Style.questionList} style={{paddingLeft: 20}}>
                                                {
                                                    question.child.map((childs,j)=>{
                                                        return(
                                                            <Check isChecked={childs.isChecked} handle={()=>{this.check(i,j)}} style={{marginTop: 12}}>
                                                                <p style={{marginLeft: 20, lineHeight: "20px", fontSize: "13px"}}>{childs.title}</p>
                                                            </Check>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                            <AlertButton name="提交" className="save" handle={this._submit}/>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class UpdateStatus extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            timeStatus: false,
            time: this.props.data.prjschedule_at
        }
    }

    _submit = (name) => {
        this.setState({
            name: name,
            timeStatus: true
        })
    }

    close = () => {
        this.setState({
            timeStatus: false
        })
    }

    render() {
        const color = ["#ff9426","#ee531d","#de187a","#690e98","#0660c6","#0aacc5","#4b9c25","#fad713","#1f2b39"];
        return(
            <Shadow>
                <AlertWindow style={{padding: "37px 0 0 72px", width: 300, height: 420}}
                             handle={this.props.closeHandle}>
                    {
                        this.state.timeStatus ? <UpdateStatusTime projectid={this.props.data.project_id} id={parseInt(this.props.data.fstatus_id) + 1} time={this.props.data.prjschedule_at} name={this.state.name} closeHandle={this.close} complete={this.props.complete} /> : ""
                    }
                    <div>
                        {
                            this.props.status.map((item,i)=>{
                                return(
                                    <div key={i}>
                                        {
                                            i !== 0 ? (
                                                parseInt(item.fstatus_id) > parseInt(this.props.data.fstatus_id) ? (
                                                    parseInt(item.fstatus_id) == parseInt(this.props.data.fstatus_id) + 1 ? (
                                                        <div className={Style.updateLine} style={{backgroundColor: color[i]}}></div>
                                                    ):(
                                                        <div className={Style.updateLine} style={{backgroundColor: "#d0d1d2"}}></div>
                                                    )
                                                ) : (
                                                    <div className={Style.updateLine} style={{backgroundColor: color[i]}}></div>
                                                )
                                            ) : ("")
                                        }
                                        {
                                            parseInt(item.fstatus_id) > parseInt(this.props.data.fstatus_id) ? (
                                                parseInt(item.fstatus_id) == parseInt(this.props.data.fstatus_id) + 1 ? (
                                                    <div className={"flex flex-row flex-start align-center " + Style.updateItem}>
                                                        <span className={Style.updateCircle} style={{backgroundColor: color[i]}}></span>
                                                        <p onClick={()=>{this._submit(item.fstatus_name)}} className={"flex flex-row flex-between align-center " + Style.updateItemNext} style={{color: "#ff530c"}}>
                                                            <div>
                                                                <span style={{color: "#ff530c"}}>{item.fstatus_id}</span>
                                                                <span style={{margin: 0, color: "#ff530c"}}>{item.fstatus_name}</span>
                                                            </div>
                                                            <Icon name="updateNext" style={{marginRight: 2}} />
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className={"flex flex-row flex-start align-center " + Style.updateItem}>
                                                        <span className={Style.updateCircle} style={{backgroundColor: "#d0d1d2"}}></span>
                                                        <p style={{color: "#b0b1b2"}}><span style={{color: "#b0b1b2"}}>{item.fstatus_id}</span>{item.fstatus_name}</p>
                                                    </div>
                                                )
                                            ) : (
                                                <div className={"flex flex-row flex-start align-center " + Style.updateItem}>
                                                    <span className={Style.updateCircle} style={{backgroundColor: color[i]}}></span>
                                                    <p><span>{item.fstatus_id}</span>{item.fstatus_name}</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class UpdateStatusTime extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            projectid: this.props.projectid,
            newstatus: this.props.id,
            scheduleat: ""
        }
    }

    disabledDate = (current) => {
        return current && current.valueOf() < moment(this.props.time,'YYYY-MM-DD');
    }

    getTime = (date,dateString) => {
        this.setState({
            scheduleat: dateString
        })
    }

    _submit = () => {
        ProjectAction.updateFinStatus(this.state.projectid,this.state.newstatus,this.state.scheduleat,(data)=>{
            if(this.state.newstatus === 8){
                ProjectAction.updateFinStatus(this.state.projectid,this.state.newstatus + 1,this.state.scheduleat,(data)=>{
                    this.props.complete(this.state.projectid,()=>{
                        this.props.closeHandle();
                    });
                })
            }else{
                this.props.complete(this.state.projectid,()=>{
                    this.props.closeHandle();
                });
            }
        })
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{paddingTop: 42, width: 400, height: 240}}
                             handle={this.props.closeHandle}>
                    <div className={Style.updateItemTime}>
                        <p>项目进度更新至【<span>{this.props.name}</span>】</p>
                        <p>请输入此阶段实际完成时间</p>
                    </div>
                    <div className="flex flex-row flex-center" style={{marginTop: 22}}>
                        <DatePicker
                            format="YYYY-MM-DD"
                            disabledDate={this.disabledDate}
                            allowClear={false}
                            onChange={this.getTime}
                            style={{width: 200}}
                            getCalendarContainer={() => document.getElementById('shadow')}
                        />
                    </div>
                    <div className="flex flex-row flex-center" style={{marginTop: 28}}>
                        <AlertButton name="确定" className="save" handle={this._submit} style={{marginRight: 20}}/>
                        <AlertButton name="取消" className="cancel" handle={this.props.closeHandle}/>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class SpeedRate extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            level: "-",
            treatid: 1
        }
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    rate = (value,callback) => {
        this.setState({
            level: value
        },() => {
            callback
        })
    }

    _submit = () => {
        ProjectAction.quickProjectTreating(this.props.data.project_id,this.state,(data)=>{
            layer.open({
                content: "对项目" + this.props.data.project_name + "快速评定成功！",
                skin: 'msg',
                style: 'bottom:0;',
                time: 3
            });
            setTimeout(() => {
                this.props.complete();
            },3000);
        })
    }

    render() {
        return (
            <Shadow>
                <AlertWindow style={{width: 460, height: 456}}
                             handle={this.props.closeHandle}>
                    <div>
                        <h4>快速评定</h4>
                        <div style={{paddingLeft: 34}}>
                            <WindowContent title="项目名称" titleStyle={{width: 128}}>
                                <p>{this.props.data.project_name}</p>
                            </WindowContent>
                            <WindowContent title="问卷得分" titleStyle={{width: 128}} style={{marginTop: 16}}>
                                <p>{this.props.data.project_score}</p>
                            </WindowContent>
                            <WindowContent title="评级(初评)" titleStyle={{width: 128}} style={{marginTop: 16}}>
                                <p>{this.props.data.project_evallevel}级</p>
                            </WindowContent>
                            <WindowContent title="录入人建议" titleStyle={{width: 128}} style={{marginTop: 16}}>
                                <p>{this.props.data.evaltreatname}</p>
                            </WindowContent>
                        </div>
                        <div className={Style.speedLine}></div>
                        <div style={{paddingLeft: 34}}>
                            <WindowContent title="评级(正式)" titleStyle={{width: 128}}>
                                <FormRate isEdit={true} rate={this.state.level} handle={this.rate} />
                            </WindowContent>
                            <WindowContent title="工作状态" titleStyle={{width: 113}} style={{marginTop: 16}}>
                                <RadioTip name="treatid" getData="queryTreats" init={1} handle={this.handle} />
                            </WindowContent>
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                            <AlertButton name="保存" className="save" handle={this._submit} style={{marginRight: 20}}/>
                            <AlertButton name="取消" className="cancel" handle={this.props.closeHandle}/>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class AddStaffWindow extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            platformid: "",
            mbname: "",
            mbsex: "M",
            mborg: "",
            mbdep: "",
            mbdepid: "",
            mbsn: "",
            mbjobtitle: "",
            mbrole: "",
            mbphone: "",
            mbemail: "",
            orgData: [],
            orgActorData: []
        }
    }

    componentDidMount = () => {
        PlatformAction.getOrgActorList((data)=>{
            this.setState({
                orgActorData: data
            })
        })
        PlatformAction.getOrgList((data)=>{
            this.setState({
                mborg: data[0].platorg_id,
                orgData: data
            })
        })
    }

    handle = (name,data) => {
        this.setState({
            [name]: data
        })
    }

    changeRole = (value) => {
        this.handle("mbrole",value);
    }

    changeOrg = (value) => {
        this.handle("mborg",value);
    }

    _submit = () => {
        PlatformAction.newMemberInfo(this.state,()=>{
            this.props.handle("add");
        })
    }

    render() {
        const Option = Select.Option;
        return(
            <Shadow>
                <AlertWindow style={{width: 460, height: 626}}
                             handle={this.props.handle}
                >
                    <div className={Style.window}>
                        <h4>新员工</h4>
                        <div className={Style.roleInfoWindow} style={{paddingLeft: 54}}>
                            <WindowContent title="姓名" titleStyle={{width: 116}}>
                                <Input name="mbname" value={this.state.mbname}  handle={this.handle} style={{width: 236}} need={true}/>
                            </WindowContent>
                            <WindowContent title="性别" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <div className="flex flex-row flex-start">
                                    <Check isChecked={this.state.mbsex === "M"} handle={() => {this.handle("mbsex","M")}}>
                                        <p style={{marginLeft: 12}}>男</p>
                                    </Check>
                                    <Check isChecked={this.state.mbsex === "F"} handle={() => {this.handle("mbsex","F")}} style={{marginLeft: 40}}>
                                        <p style={{marginLeft: 12}}>女</p>
                                    </Check>
                                </div>
                            </WindowContent>
                            <WindowContent title="所属公司" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Select value={this.state.orgData.length ? this.state.orgData[0].platorg_name : ""} style={{ width: 236 }} onChange={this.changeOrg}>
                                    {
                                        this.state.orgData.map((org,i)=>{
                                            return(
                                                <Option key={i} value={org.platorg_id}>{org.platorg_name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                            </WindowContent>
                            <WindowContent title="所属部门" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="mbdep" value={this.state.mbdep}  handle={this.handle} style={{width: 236}}/>
                            </WindowContent>
                            <WindowContent title="员工号" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="mbsn" value={this.state.mbsn}  handle={this.handle} style={{width: 236}}/>
                            </WindowContent>
                            <WindowContent title="岗位" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="mbjobtitle" value={this.state.mbjobtitle}  handle={this.handle} style={{width: 236}}/>
                            </WindowContent>
                            <WindowContent title="角色" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Select style={{ width: 236 }} onChange={this.changeRole}>
                                    {
                                        this.state.orgActorData.map((orgActor,i)=>{
                                            return(
                                                <Option key={i} value={orgActor.platact_id}>{orgActor.platact_name}</Option>
                                            )
                                        })
                                    }
                                </Select>
                                <Need />
                            </WindowContent>
                            <WindowContent title="手机号" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="mbphone" value={this.state.mbphone}  handle={this.handle} style={{width: 236}} need={true}/>
                            </WindowContent>
                            <WindowContent title="邮箱" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="mbemail" value={this.state.mbemail}  handle={this.handle} style={{width: 236}}/>
                            </WindowContent>
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                            <a onClick={this._submit} className={Style.save}>保存</a>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class ConfirmWindow extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{paddingTop: 28, width: 400, height: 200}}
                             handle={this.props.cancelHandle}
                >
                    <div>
                        <div className={Style.confirm}>
                            <p>{this.props.content}</p>
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 42}}>
                            <AlertButton name="确定" className="save" style={{marginRight: 20}} handle={this.props.saveHandle}/>
                            <AlertButton name="取消" className="cancel" handle={this.props.cancelHandle}/>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}

export class AddProjectMember extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            platformid: "",
            role: ""
        }
    }

    changeStaff = (obj) => {
        this.setState({
            platformid: obj.id
        })
    }

    changeRole = (name,value) => {
        this.setState({
            role: value
        })
    }

    _submit = () => {
        ProjectAction.addProjectMember(this.state.platformid,this.state.role,this.props.id,(data)=>{
            this.props.complete();
        })
    }

    render() {
        return(
            <Shadow>
                <AlertWindow style={{width: 460, height: 240}}
                             handle={this.props.handle}
                >
                    <div className={Style.window}>
                        <h4>新增参与成员</h4>
                        <div className={Style.roleInfoWindow} style={{paddingLeft: 54}}>
                            <WindowContent title="姓名" titleStyle={{width: 116}}>
                                <AutoCompleteStaff handle={this.changeStaff} />
                                <Need />
                            </WindowContent>
                            <WindowContent title="职责" titleStyle={{width: 116}} style={{marginTop: 26}}>
                                <Input name="role" value={this.state.role}  handle={this.changeRole} style={{width: 236}} need={true}/>
                            </WindowContent>
                        </div>
                        <div className="flex flex-row flex-center" style={{marginTop: 30}}>
                            <a onClick={this._submit} className={Style.save}>保存</a>
                        </div>
                    </div>
                </AlertWindow>
            </Shadow>
        )
    }
}
