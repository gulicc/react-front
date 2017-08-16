/**
 * Created by Galaxy065 on 2017/5/3.
 */
import React from "react";
import { Link } from "react-router-dom";
import Style from "./css/userComponent.css";

export default class UserContent extends React.Component {
    constructor(props){
        super(props)
    }

    render() {
        return(
            <div className={"flex flex-row flex-start align-center " + Style.content} style={this.props.style}>
                <p style={{width: 134}}>{this.props.title}</p>
                {
                    this.props.value ? <p>{this.props.value}</p> : <div>{this.props.children}</div>
                }
            </div>
        )
    }
}