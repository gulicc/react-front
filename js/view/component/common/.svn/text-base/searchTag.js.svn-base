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
        this.reset();
    }

    reset = () => {
        TipAction.listTags(this.props.type,(data)=>{
            this.setState({
                data: data
            })
        });
    }

    handle = (sort) => {
        let data = this.state.data;
        let idData = [];
        data[sort].checked = !data[sort].checked;
        for (let i = 0; i < data.length; i++) {
            if (data[i].checked) {
                idData.push(data[i].id);
            }
        }
        this.setState({
            data: data
        });
        this.props.handle(this.props.name, idData);
    }

    render() {
        return(
            <div className={"flex flex-row flex-start " + Style.select} style={{marginTop: this.props.marginTop}}>
                <p className={Style.title} style={this.props.titleStyle}>{this.props.title}</p>
                <div className="flex1" style={{paddingRight: 70, height: this.state.moreStatus ? "auto" : 38, overflow: this.state.moreStatus ? "auto"  : "hidden"}}>
                    {
                        this.state.data && this.state.data.length ? (
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
                        ) : (
                            <p className={Style.title} style={{color: "#babcbf"}}>暂无标签</p>
                        )
                    }
                </div>
            </div>
        )
    }
}