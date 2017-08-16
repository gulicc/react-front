/**
 * Created by Galaxy065 on 2017/5/19.
 */
import React from "react";
import Style from "./css/searchTypes.css";

import TipAction from "../../../store/tipAction";

export default class SearchTypes extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            moreStatus: this.props.more ? false : true,
            checkAll: true,
            data: [],
        }
    }

    componentDidMount = () => {
        if(this.props.data){
            this.setState({
                data: this.props.data
            })
        }else{
            TipAction[this.props.getData]((data)=>{
                this.setState({
                    data: data
                })
            });
        }
    }

    reset = () => {
        let data = this.state.data;
        data.map((datas)=>{
            datas.checked = false
        });
        this.setState({
            data: data,
            checkAll: true
        });
    }

    toggle = () => {
        this.setState({
            moreStatus: !this.state.moreStatus
        })
    }

    handle = (sort) => {
        let data = this.state.data;
        let idData = [];
        if(sort === "main"){
            for(let i=0;i<data.length;i++){
                data[i].checked = false;
            }
            this.setState({
                checkAll: true,
                data: data
            });
            if(this.props.type === "radio"){
                this.props.handle(this.props.name,"");
            }else{
                this.props.handle(this.props.name,[]);
            }
        }else{
            if(this.props.type === "radio"){
                for(let i=0;i<data.length;i++){
                    data[i].checked = false;
                }
                data[sort].checked = true;
                this.setState({
                    checkAll: false,
                    data: data
                });
                this.props.handle(this.props.name,data[sort].id);
            }else {
                data[sort].checked = !data[sort].checked;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].checked) {
                        idData.push(data[i].id);
                    }
                }
                if (idData.length) {
                    this.setState({
                        checkAll: false,
                        data: data
                    });
                    this.props.handle(this.props.name, idData);
                } else {
                    this.setState({
                        checkAll: true,
                        data: data
                    });
                    this.props.handle(this.props.name, "");
                }
            }
        }
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.select} style={{marginTop: this.props.marginTop}}>
                <p className={Style.title} style={this.props.titleStyle}>{this.props.title}</p>
                <div className="flex1" style={{paddingRight: 70, height: this.state.moreStatus ? "auto" : 38, overflow: this.state.moreStatus ? "auto"  : "hidden"}}>
                    <label className={Style.label}>
                        <input name={this.props.name} type="checkbox" checked={this.state.checkAll} onChange={()=>{this.handle("main")}}/>
                        <div className={"flex flex-column flex-center " + Style.item}>
                            <a className={ this.state.checkAll ? Style.checked : ""}>不限</a>
                        </div>
                    </label>
                    {
                        this.state.data.map((datas,i) => {
                            return(
                                <label className={Style.label} key={i}>
                                    <input name={this.props.name} type="checkbox" value={datas.id} checked={datas.checked} onChange={()=>{this.handle(i)}}/>
                                    <div className={"flex flex-column flex-center " + Style.item}>
                                        <a className={ datas.checked ? Style.checked : ""}>{datas.name}</a>
                                    </div>
                                </label>
                            )
                        })
                    }
                </div>
                {
                    this.props.more ? (
                        <div className={"flex flex-row flex-start align-center " + Style.more} onClick={this.toggle}>
                            <p>更多</p>
                            <span></span>
                        </div>
                    ) : ("")
                }
            </div>
        )
    }
}