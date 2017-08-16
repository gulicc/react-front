/**
 * Created by Galaxy065 on 2017/5/19.
 */
import React from "react";
import Style from "./css/defaultInput.css";
import { Input } from "../common/defaultInput";
import Icon from "../common/defaultIcon";
import { AddAgencyWindow, AddEnterpriseWindow, AddInvestorWindow } from "../common/alertWindow";
import FreeScrollBar from 'react-free-scrollbar';

import AutoCompleteAction from "../../../store/autoCompleteAction";

class AutoComplete extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchStatus: false,
            searchData: [],
            value: this.props.value
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.value !== this.props.value){
            this.setState({
                value: nextProps.value
            })
        }
    }

    closeSearch = () => {
        this.setState({
            searchStatus: false
        });
    }

    _blur = () => {
        setTimeout(() => {
            this.setState({
                searchStatus: false
            });
        },200);
    }

    handle = (name,value) => {
        this.setState({
            [name]: value
        },()=>{
            this.props.getData(value,(data)=>{
                this.setState({
                    searchStatus: true,
                    searchData: data
                });
            })
        });
    }

    complete = (obj,e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        this.setState({
            value: obj.name
        },()=>{
            this.props.handle(obj);
            this.closeSearch();
        });
    }

    render() {
        return(
            <div className="flex flex-row flex-start align-center" style={{position: "relative", height: 28}}>
                <Input name="value" value={this.state.value} handle={this.handle} style={{width: this.props.width, outline: "none"}} onBlur={this._blur} disabled={this.props.disabled} />
                {
                    this.state.searchStatus ? (
                        <div className={Style.autoComplete} style={{height: this.props.add ? (this.state.searchData.length > 3 ? 130 : (this.state.searchData.length + 1) * 24 + 10) : (this.state.searchData.length > 3 ? 106 : (this.state.searchData.length) * 24 + 10)}}>
                            <FreeScrollBar>
                                <div>
                                    {
                                        this.state.searchData.map((datas,i)=>{
                                            return(
                                                <a onTouchTap={this.complete.bind(this,datas)} className={Style.autoItem} key={i}>{datas.name}</a>
                                            )
                                        })
                                    }
                                    {
                                        this.props.add ? (
                                            <a onTouchTap={this.props.addNew} className={"flex flex-row flex-start align-center " + Style.autoAddNew}>
                                                <Icon name="iconAddSmall" style={{marginRight: 10}}/>
                                                <span>{this.props.title}</span>
                                            </a>
                                        ) : ("")
                                    }
                                </div>
                            </FreeScrollBar>
                        </div>
                    ) : ("")
                }
                {this.props.children}
            </div>
        )
    }
}

export class AutoCompleteOrg extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shadowStatus: false,
            value: this.props.value
        }
    }

    addNew = () => {
        this.setState({
            shadowStatus: true
        })
    }

    close = () => {
        this.setState({
            shadowStatus: false
        })
    }

    save = (obj) => {
        this.setState({
            value: obj.name,
        },()=>{
            this.props.handle(obj);
            this.close();
            this.refs.autoComplete.closeSearch();
        })
    }

    render() {
        return(
            <AutoComplete title="添加新投资机构"
                          value={this.state.value}
                          width="236"
                          getData={AutoCompleteAction.searchInvestOrgNames}
                          name={this.props.name}
                          valueName={this.props.orgName}
                          handle={this.props.handle}
                          addNew={this.addNew}
                          ref="autoComplete"
                          add={true}
                          disabled={this.props.disabled}>
                {
                    this.state.shadowStatus ? (
                        <AddAgencyWindow closeHandle={this.close} save={this.save}/>
                    ) : ("")
                }
            </AutoComplete>
        )
    }
}

export class AutoCompleteInvestor extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shadowStatus: false,
            value: this.props.value
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.value !== nextProps.value){
            this.setState({
                value: nextProps.value
            })
        }
    }

    addNew = () => {
        this.setState({
            shadowStatus: true
        })
    }

    close = () => {
        this.setState({
            shadowStatus: false
        })
    }

    save = (obj) => {
        this.setState({
            value: obj.name,
        },()=>{
            this.props.handle(obj);
            this.close();
            this.refs.autoComplete.closeSearch();
        })
    }

    render() {
        return(
            <AutoComplete title="添加新投资人"
                          value={this.state.value}
                          width={this.props.width}
                          getData={AutoCompleteAction.searchInvestorNames}
                          handle={this.props.handle}
                          addNew={this.addNew}
                          ref="autoComplete"
                          add={true}>
                {
                    this.state.shadowStatus ? (
                        <AddInvestorWindow closeHandle={this.close} save={this.save} />
                    ) : ("")
                }
            </AutoComplete>
        )
    }
}

export class AutoCompleteEnterprise extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shadowStatus: false,
            value: this.props.value
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.value !== nextProps.value){
            this.setState({
                value: nextProps.value
            })
        }
    }

    addNew = () => {
        this.setState({
            shadowStatus: true
        })
    }

    close = () => {
        this.setState({
            shadowStatus: false
        })
    }

    save = (obj) => {
        this.setState({
            value: obj.name,
        },()=>{
            console.log(obj);
            this.props.handle(obj);
            this.close();
            this.refs.autoComplete.closeSearch();
        })
    }

    render() {
        return(
            <AutoComplete title="添加新企业"
                          value={this.state.value}
                          width="236"
                          getData={AutoCompleteAction.searchCompanyNames}
                          handle={this.props.handle}
                          addNew={this.addNew}
                          ref="autoComplete"
                          add={true}>
                {
                    this.state.shadowStatus ? (
                        <AddEnterpriseWindow closeHandle={this.close} save={this.save} />
                    ) : ("")
                }
            </AutoComplete>
        )
    }
}

export class AutoCompleteStaff extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            shadowStatus: false,
            value: this.props.value
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.value !== nextProps.value){
            this.setState({
                value: nextProps.value
            });
        }
    }

    close = () => {
        this.setState({
            shadowStatus: false
        })
    }

    render() {
        return(
            <AutoComplete value={this.state.value}
                          width={this.props.width ? this.props.width : "236"}
                          getData={AutoCompleteAction.searchStaffNames}
                          handle={this.props.handle}
                          ref="autoComplete"
                          add={false}
            />
        )
    }
}

export class AutoCompleteProject extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            value: this.props.value
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(this.props.value !== nextProps.value){
            this.setState({
                value: nextProps.value
            });
        }
    }

    render() {
        return(
            <AutoComplete value={this.state.value}
                          width={this.props.width ? this.props.width : "236"}
                          getData={AutoCompleteAction.quickSearchProject}
                          handle={this.props.handle}
                          ref="autoComplete"
                          add={false}
            />
        )
    }
}