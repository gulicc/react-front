/**
 * Created by Galaxy065 on 2017/5/8.
 */
import React from "react";
import { Link } from "react-router-dom";
import Style from "./css/indexHeader.css";

export default class IndexHeader extends React.Component{
    render() {
        return(
            <div className="flex flex-row flex-between">
                <div className={"flex flex-row flex-start align-center " + Style.title}>
                    <h2>{this.props.title}</h2>
                    {
                        this.props.link ? <Link to={this.props.link.url}>{this.props.link.name}</Link> : ""
                    }
                </div>
                {
                    this.props.button ? <a onClick={this.props.button.handle} className={"flex flex-row flex-center align-center " + Style.add}><span></span>{this.props.button.name}</a> : ""
                }
            </div>
        )
    }
}