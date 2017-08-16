/**
 * Created by Galaxy065 on 2017/5/2.
 */
import React from "react";
import Style from "../css/manage.css";

export default class Input extends React.Component {
    constructor(props){
        super(props)
    }

    handle = (e) => {
        this.props.handle(this.props.name,e.target.value)
    }

    render() {
        return(
            <input type={this.props.type} placeholder={this.props.placeholder} value={this.props.value} maxLength={this.props.maxLength} onChange={this.handle.bind(this)} className={Style.input} style={{width: this.props.width, marginBottom: this.props.marginBottom}}/>
        )
    }
}
