/**
 * Created by Galaxy065 on 2017/5/12.
 */
import React from "react";
import Style from "./css/defaultInput.css";
import Icon from "../common/defaultIcon";

import TipAction from "../../../store/tipAction";

export class Input extends React.Component {
    constructor(props){
        super(props)
    }

    handle = (e) => {
        if(this.props.filter) {
            if(!this.props.filter(e.target.value)){
                return false
            }
        }
        this.props.handle(this.props.name,e.target.value);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start align-center " + this.props.areaClassName} style={this.props.areaStyle}>
                <input type={this.props.type ? this.props.type : "text"} placeholder={this.props.placeholder} value={this.props.value ? this.props.value : ""} onChange={this.handle.bind(this)} onBlur={this.props.onBlur} className={Style.input + " " + this.props.className} style={this.props.style} disabled={this.props.disabled} />
                {
                    this.props.tip ? <p className={Style.tip}>{this.props.tip}</p> : ""
                }
                {
                    this.props.need ? <Need /> : ""
                }
                {this.props.children}
            </div>
        )
    }
}

export class TextArea extends React.Component {
    constructor(props){
        super(props)
    }

    handle = (e) => {
        this.props.handle(this.props.name,e.target.value)
    }

    render() {
        return(
            <div className="flex flex-row flex-start" style={this.props.areaStyle}>
                <textarea value={this.props.value} onChange={this.handle.bind(this)} className={Style.textarea} style={this.props.style}></textarea>
                {
                    this.props.need ? <Need /> : ""
                }
            </div>
        )
    }
}

export class RadioTip extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        if(this.props.data){
            this.setState({
                data: this.props.data
            })
        }else if(this.props.getData){
            TipAction[this.props.getData]((data)=> {
                if(this.props.init){
                    for(let i=0;i<data.length;i++){
                        if(this.props.init == data[i].id){
                            data[i].checked = true;
                        }
                    }
                }
                this.setState({
                    data: data
                })
            })
        }
    }

    handle = (sort) => {
        let data = this.state.data;
        if(data[sort].checked){
            data[sort].checked = false;
            this.props.handle(this.props.name,"");
        }else{
            for(let i=0;i<data.length;i++){
                data[i].checked = false;
            }
            data[sort].checked = true;
            this.props.handle(this.props.name,data[sort].id);
        }
        this.setState({
            data: data
        });
    }

    reset = () => {
        let data = this.state.data;
        for(let i=0;i<data.length;i++){
            data[i].checked = false
        }
        this.setState({
            data: data
        });
    }

    render() {
        return(
            <div className="flex1" style={this.props.style}>
                {
                    this.state.data.map((datas,i) => {
                        return(
                            <div className={"flex flex-column flex-center " + Style.item} key={i}>
                                <a onTouchTap={()=>{this.handle(i)}} className={ datas.checked ? Style.checked : ""}>{datas.name}</a>
                            </div>
                        )
                    })
                }
                {
                    this.props.need ? <p className={Style.need}>*</p> : ""
                }
            </div>
        )
    }
}

export class CheckTip extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        if(this.props.data){
            this.setState({
                data: this.props.data
            })
        }else if(this.props.getData){
            TipAction[this.props.getData]((data)=> {
                if(this.props.init){
                    let initData = this.props.init;
                    for(let i=0;i<initData.length;i++){
                        for(let j=0;j<data.length;j++){
                            if(initData[i] == data[j].id){
                                data[j].checked = true;
                            }
                        }
                    }
                }
                this.setState({
                    data: data
                })
            })
        }
    }

    handle = (sort) => {
        let data = this.state.data;
        let idData = [];
        data[sort].checked = !data[sort].checked;
        for(let i=0;i<data.length;i++){
            if(data[i].checked){
                idData.push(data[i].id);
            }
        }
        this.setState({
            data: data
        });
        this.props.handle(this.props.name,idData);
    }

    render() {
        return(
            <div className="flex1" style={{paddingRight: 70}}>
                {
                    this.state.data.map((datas,i) => {
                        return(
                            <div className={"flex flex-column flex-center " + Style.item} key={i}>
                                <a onTouchTap={()=>{this.handle(i)}} className={ datas.checked ? Style.checked : ""}>{datas.name}</a>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

export class TabSelect extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            data: this.props.data
        }
    }

    changeTab = (sort,params) => {
        let data = this.state.data;
        for(let i=0;i<data.length;i++){
            data[i].isChecked = false;
        }
        data[sort].isChecked = true;
        this.setState({
            data: data
        })
        this.props.handle(this.props.name,params);
    }

    render() {
        return(
            <div className="flex flex-row flex-start align-center">
                <div className={"flex flex-row flex-start " + Style.tabSelect}>
                    {
                        this.state.data.map((datas,i)=>{
                            return(
                                <p onClick={()=>{this.changeTab(i,datas.params)}} className={ datas.isChecked ? Style.active : ""}>{datas.name}</p>
                            )
                        })
                    }
                </div>
                {
                    this.props.need ? <Need /> : ""
                }
            </div>
        )
    }
}

export class Check extends React.Component{
    constructor(props){
        super(props)
    }

    setChecked = () => {
        if(this.props.disabled){
            return false;
        }
        this.props.handle();
    }

    render() {
        return (
            <div className={this.props.className} style={this.props.style}>
                <label className="flex flex-row flex-start align-center" onTouchTap={this.setChecked}>
                    <div className={this.props.disabled ? Style.chooseDisabled : Style.choose} style={this.props.checkStyle}>
                        {
                            this.props.isChecked ? <div className={Style.check}></div> : ""
                        }
                    </div>
                    {this.props.children}
                </label>
            </div>
        )
    }
}

export class AutoComplete extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            searchStatus: false,
            searchData: [],
            value: ""
        }
    }

    componentWillReceiveProps = (nextProps) => {
        if(nextProps.value !== this.props.value){
            this.setState({
                value: nextProps.value
            })
        }
    }

    componentDidMount = () => {
        document.onclick = () => {
            this.closeSearch();
        }
    }

    handle = (e) => {
        this.setState({
            value: e.target.value
        });
        this.props.handle(e.target.value,(data)=>{
            this.setState({
                searchData: data
            });
        })
    }

    openSearch = (e) => {
        e.nativeEvent.stopImmediatePropagation();
        this.props.handle(e.target.value,(data)=>{
            this.setState({
                searchStatus: true,
                searchData: data
            });
        })
    }

    closeSearch = () => {
        this.setState({
            searchStatus: false
        });
    }

    complete = (obj) => {
        console.log(obj);
        this.setState({
            value: obj.name
        },()=>{
            this.props.getData(this.props.name,obj);
            this.closeSearch();
        })
    }

    addNew = () => {
        this.props.addNew();
    }

    render() {
        return(
            <div className="flex flex-row flex-start align-center" style={{position: "relative"}} onClick={this.openSearch.bind(this)}>
                <input type="text" value={this.state.value} placeholder={this.props.placeholder} onChange={this.handle.bind(this)} onFocus={this.openSearch} className={Style.input + " " + this.props.className} style={this.props.style}/>
                {
                    this.props.tip ? <p className={Style.tip}>{this.props.tip}</p> : ""
                }
                {
                    this.state.searchStatus ? (
                        <div className={Style.autoComplete}>
                            {
                                this.state.searchData.map((datas,i)=>{
                                    return(
                                        <a onTouchTap={()=>{this.complete(datas)}} className={Style.autoItem} key={i}>{datas.name}</a>
                                    )
                                })
                            }
                            <a onClick={this.addNew} className={"flex flex-row flex-start align-center " + Style.autoAddNew}>
                                <Icon name="iconAddSmall" style={{marginRight: 10}}/>
                                <span>{this.props.addNewName}</span>
                            </a>
                        </div>
                    ) : ("")
                }
            </div>
        )
    }
}

export class Need extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return(
            <p className={Style.need}>*</p>
        )
    }
}